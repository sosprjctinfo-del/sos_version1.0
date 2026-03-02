import { Capacitor } from '@capacitor/core';
import { Geolocation as CapacitorGeolocation } from '@capacitor/geolocation';

export interface LocationResult {
  latitude: number;
  longitude: number;
  mapsLink: string;
}

export const getCurrentLocation = (): Promise<LocationResult> => {
  return new Promise(async (resolve, reject) => {
    try {
      let position;
      
      // Use Capacitor geolocation on mobile devices
      if (Capacitor.isNativePlatform()) {
        try {
          position = await CapacitorGeolocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 60000
          });
        } catch (capacitorError: any) {
          if (capacitorError.message?.includes('permission')) {
            reject(new Error("Location permission required. Please enable location permission in your device settings and restart the app."));
            return;
          }
          throw capacitorError;
        }
      } else {
        // Use browser geolocation on web
        if (!navigator.geolocation) {
          reject(new Error("Geolocation not supported on this device"));
          return;
        }

        // First check if permission is already granted
        const permissionResult = await navigator.permissions.query({ name: 'geolocation' });
        if (permissionResult.state === 'denied') {
          reject(new Error("Location permission denied. Please enable location permission in your device settings."));
          return;
        }

        position = await new Promise((posResolve, posReject) => {
          navigator.geolocation.getCurrentPosition(
            posResolve,
            (error) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  posReject(new Error("Location permission required. Please enable location permission in your device settings and restart the app."));
                  break;
                case error.POSITION_UNAVAILABLE:
                  posReject(new Error("Location information unavailable. Please check your GPS/location services."));
                  break;
                case error.TIMEOUT:
                  posReject(new Error("Location request timed out. Please try again."));
                  break;
                default:
                  posReject(new Error("Failed to get location. Please ensure location services are enabled."));
              }
            },
            { 
              enableHighAccuracy: true, 
              timeout: 15000, 
              maximumAge: 60000
            }
          );
        });
      }

      const { latitude, longitude } = position.coords;
      resolve({
        latitude,
        longitude,
        mapsLink: `https://www.google.com/maps?q=${latitude},${longitude}`,
      });
    } catch (error: any) {
      if (error.message?.includes('permission')) {
        reject(new Error("Location permission required. Please enable location permission in your device settings."));
      } else {
        reject(new Error("Failed to get location. Please ensure location services are enabled."));
      }
    }
  });
};
