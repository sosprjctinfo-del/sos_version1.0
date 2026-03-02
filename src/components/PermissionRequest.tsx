import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Shield, X } from "lucide-react";
import { Capacitor } from "@capacitor/core";
import { Geolocation as CapacitorGeolocation } from "@capacitor/geolocation";

interface PermissionRequestProps {
  onPermissionsGranted: () => void;
}

const PermissionRequest = ({ onPermissionsGranted }: PermissionRequestProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [locationStatus, setLocationStatus] = useState<"pending" | "granted" | "denied">("pending");

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    if (!Capacitor.isNativePlatform()) {
      // On web, check browser permissions
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        if (result.state === 'granted') {
          setLocationStatus('granted');
          onPermissionsGranted();
        }
      } catch (err) {
        console.log('Permissions API not available');
      }
      return;
    }

    // On mobile, check Capacitor permissions
    try {
      await CapacitorGeolocation.getCurrentPosition({
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 300000 // 5 minutes
      });
      setLocationStatus('granted');
      onPermissionsGranted();
    } catch (err: any) {
      if (err.message?.includes('permission')) {
        setLocationStatus('denied');
      } else {
        // Other errors, might be temporary
        setLocationStatus('pending');
      }
    }
  };

  const requestPermissions = async () => {
    setLoading(true);
    setError("");

    try {
      if (Capacitor.isNativePlatform()) {
        // Request location permission on mobile
        await CapacitorGeolocation.getCurrentPosition({
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 60000
        });
        setLocationStatus('granted');
        onPermissionsGranted();
      } else {
        // Request location permission on web
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            resolve,
            reject,
            { enableHighAccuracy: true, timeout: 15000 }
          );
        });
        
        if (position) {
          setLocationStatus('granted');
          onPermissionsGranted();
        }
      }
    } catch (err: any) {
      if (err.message?.includes('permission') || err.code === 1) {
        setError("Location permission denied. Please enable location permission in your device settings and restart the app.");
        setLocationStatus('denied');
      } else {
        setError("Failed to get location. Please ensure location services are enabled.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (locationStatus === 'granted') {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-2xl p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Permissions Required
          </h2>
          <p className="text-sm text-muted-foreground">
            SOS Alert needs access to your location and contacts to work properly
          </p>
        </div>

        {/* Permissions List */}
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50">
            <MapPin className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Location Access</p>
              <p className="text-muted-foreground">Required to send your location during emergencies</p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-accent/50">
            <Phone className="w-5 h-5 text-primary mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-medium text-foreground">Contact Access</p>
              <p className="text-muted-foreground">Optional: Select emergency contacts from your phone</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 rounded-xl bg-destructive/10 text-destructive text-sm">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={requestPermissions}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Requesting Permissions..." : "Grant Permissions"}
          </button>

          {locationStatus === 'denied' && (
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-all"
            >
              Restart App
            </button>
          )}
        </div>

        {/* Skip Option (Web Only) */}
        {!Capacitor.isNativePlatform() && (
          <button
            onClick={onPermissionsGranted}
            className="w-full py-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Continue without permissions (Limited functionality)
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PermissionRequest;
