import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HeartPulse, Save } from "lucide-react";
import { getMedicalProfile, MedicalProfile, saveMedicalProfile } from "@/utils/storage";

const Profile = () => {
  const [profile, setProfile] = useState<MedicalProfile>(() => getMedicalProfile());
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setProfile(getMedicalProfile());
  }, []);

  const update = (patch: Partial<MedicalProfile>) => {
    setProfile((p) => ({ ...p, ...patch }));
    setSaved(false);
  };

  const onSave = () => {
    saveMedicalProfile(profile);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-primary/10">
            <HeartPulse className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">Medical Profile (ICE)</h1>
            <p className="text-xs text-muted-foreground">This info will be included in your SOS message</p>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Full Name</label>
            <input
              type="text"
              value={profile.fullName}
              onChange={(e) => update({ fullName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Your name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Blood Group</label>
            <input
              type="text"
              value={profile.bloodGroup}
              onChange={(e) => update({ bloodGroup: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="e.g. O+"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Allergies</label>
            <textarea
              value={profile.allergies}
              onChange={(e) => update({ allergies: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="e.g. Penicillin, Nuts"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Medications</label>
            <textarea
              value={profile.medications}
              onChange={(e) => update({ medications: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Current medications (if any)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-medium text-muted-foreground">Emergency Notes</label>
            <textarea
              value={profile.emergencyNotes}
              onChange={(e) => update({ emergencyNotes: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              placeholder="Anything responders should know"
            />
          </div>

          <button
            onClick={onSave}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
          >
            <Save className="w-4 h-4" />
            {saved ? "Saved" : "Save Profile"}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
