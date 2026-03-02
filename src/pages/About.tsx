import { motion } from "framer-motion";
import { Shield, MapPin, Users, Smartphone, Code, AlertTriangle } from "lucide-react";

const team = [
  { name: "VINOTH.M", role: "Lead Developer" },
  { name: "VIKRAM.V", role: "UI/UX Designer" },
];

const features = [
  { icon: AlertTriangle, title: "One-Tap SOS", desc: "Send emergency alerts with a single tap" },
  { icon: MapPin, title: "Live Location", desc: "Shares real-time GPS coordinates via Google Maps" },
  { icon: Users, title: "Emergency Contacts", desc: "Store up to 3 trusted contacts locally" },
  { icon: Smartphone, title: "Multi-Channel", desc: "Send via SMS, WhatsApp, or clipboard" },
];

const About = () => {
  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto space-y-8"
      >
        {/* Hero */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            SOS Emergency <span className="text-primary">Alert System</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
            A modern emergency location sharing application designed to help you alert your trusted contacts instantly during emergencies.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-4 space-y-2"
            >
              <f.icon className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground text-sm">{f.title}</h3>
              <p className="text-muted-foreground text-xs leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* How it works */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <h2 className="font-bold text-foreground">How It Works</h2>
          <ol className="space-y-2 text-sm text-muted-foreground">
            {[
              "Add emergency contacts (up to 3)",
              "Press the SOS button when you need help",
              "Confirm the alert to fetch your GPS location",
              "Choose to send via SMS, WhatsApp, or copy the link",
              "Your contacts receive your exact Google Maps location",
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* Tech */}
        <div className="glass-card rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Code className="w-4 h-4 text-primary" />
            <h2 className="font-bold text-foreground">Technologies</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Geolocation API", "LocalStorage", "HTML5 Audio"].map((t) => (
              <span key={t} className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="glass-card rounded-2xl p-5 space-y-4">
          <h2 className="font-bold text-foreground">Development Team</h2>
          <div className="grid grid-cols-2 gap-3">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.15 }}
                className="text-center p-4 rounded-xl bg-accent/50"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <span className="text-primary font-bold text-lg">{member.name.charAt(0)}</span>
                </div>
                <p className="font-semibold text-foreground text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center space-y-2 py-4 border-t border-border">
          <p className="text-xs text-muted-foreground">
            ⚠️ This app is for educational purposes. In a real emergency, always call your local emergency number.
          </p>
          <p className="text-xs text-muted-foreground/60">Version 1.0.0</p>
        </div>
      </motion.div>
    </div>
  );
};

export default About;
