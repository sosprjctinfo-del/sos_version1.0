import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, StopCircle } from "lucide-react";
import SOSButton from "@/components/SOSButton";
import ConfirmationModal from "@/components/ConfirmationModal";
import SendOptionsModal from "@/components/SendOptionsModal";
import StatusMessage from "@/components/StatusMessage";
import { getContacts } from "@/utils/storage";
import { getCurrentLocation, LocationResult } from "@/utils/location";
import { playAlertSound } from "@/utils/sms";

const Home = () => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const [status, setStatus] = useState<{ type: "info" | "success" | "error" | "loading"; message: string } | null>(null);
  const [location, setLocation] = useState<LocationResult | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const locationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Session timer
  useEffect(() => {
    if (sessionActive) {
      intervalRef.current = setInterval(() => setSessionTime((t) => t + 1), 1000);
      locationIntervalRef.current = setInterval(async () => {
        try {
          const loc = await getCurrentLocation();
          setLocation(loc);
        } catch {}
      }, 15000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (locationIntervalRef.current) clearInterval(locationIntervalRef.current);
    };
  }, [sessionActive]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  const handleSOSPress = () => setConfirmOpen(true);

  const handleConfirm = useCallback(async () => {
    setConfirmOpen(false);

    const contacts = getContacts();
    if (contacts.length === 0) {
      setStatus({ type: "error", message: "Please add at least one emergency contact" });
      return;
    }

    setStatus({ type: "loading", message: "Fetching your location…" });

    try {
      playAlertSound();
      const loc = await getCurrentLocation();
      setLocation(loc);
      setStatus({ type: "success", message: "Location acquired! Choose how to send." });
      setSendOpen(true);
      setSessionActive(true);
      setSessionTime(0);
    } catch (err: any) {
      setStatus({ type: "error", message: err.message });
    }
  }, []);

  const endSession = () => {
    setSessionActive(false);
    setSessionTime(0);
    setLocation(null);
    setStatus({ type: "info", message: "Emergency session ended" });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-sm"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
            Emergency <span className="text-primary">SOS</span>
          </h1>
          <p className="text-muted-foreground text-sm">
            Press the button to send your location
          </p>
        </div>

        {/* SOS Button */}
        <SOSButton onClick={handleSOSPress} disabled={sessionActive} />

        {/* Session info */}
        {sessionActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full glass-card rounded-2xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Emergency Session Active</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <Clock className="w-3.5 h-3.5" />
                {formatTime(sessionTime)}
              </div>
            </div>

            {location && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 rounded-lg px-3 py-2">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{location.latitude.toFixed(5)}, {location.longitude.toFixed(5)}</span>
              </div>
            )}

            <button
              onClick={endSession}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:bg-secondary/80 transition-all"
            >
              <StopCircle className="w-4 h-4" />
              End Session
            </button>
          </motion.div>
        )}

        {/* Status */}
        {status && <div className="w-full"><StatusMessage type={status.type} message={status.message} visible /></div>}
      </motion.div>

      {/* Modals */}
      <ConfirmationModal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Send SOS Alert?"
        message="Are you sure you want to send your emergency location to all contacts?"
      />

      {location && (
        <SendOptionsModal
          open={sendOpen}
          onClose={() => setSendOpen(false)}
          contacts={getContacts()}
          mapsLink={location.mapsLink}
        />
      )}
    </div>
  );
};

export default Home;
