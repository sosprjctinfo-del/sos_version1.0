import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Copy, X, Check } from "lucide-react";
import { useState } from "react";
import { Contact } from "@/utils/storage";
import { buildSMSLink, buildWhatsAppLink, buildEmergencyMessage } from "@/utils/sms";

interface SendOptionsModalProps {
  open: boolean;
  onClose: () => void;
  contacts: Contact[];
  mapsLink: string;
}

const SendOptionsModal = ({ open, onClose, contacts, mapsLink }: SendOptionsModalProps) => {
  const [copied, setCopied] = useState(false);
  const message = buildEmergencyMessage(mapsLink);

  const handleSMS = () => {
    contacts.forEach((c) => {
      window.open(buildSMSLink(c.phone, message), "_blank");
    });
  };

  const handleWhatsApp = () => {
    contacts.forEach((c) => {
      window.open(buildWhatsAppLink(c.phone, message), "_blank");
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`${message}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const options = [
    { icon: Phone, label: "Send via SMS", desc: "Open messaging app", onClick: handleSMS, color: "bg-success" },
    { icon: MessageSquare, label: "Send via WhatsApp", desc: "Open WhatsApp", onClick: handleWhatsApp, color: "bg-success" },
    { icon: copied ? Check : Copy, label: copied ? "Copied!" : "Copy Link", desc: "Copy to clipboard", onClick: handleCopy, color: "bg-warning" },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card w-full max-w-sm rounded-2xl p-6 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-foreground text-lg">Send Emergency Alert</h3>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-accent transition-colors">
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <p className="text-muted-foreground text-xs">
              Sending to {contacts.length} contact{contacts.length > 1 ? "s" : ""}
            </p>

            <div className="space-y-2">
              {options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={opt.onClick}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-accent/50 hover:bg-accent transition-all group"
                >
                  <div className={`p-2 rounded-lg ${opt.color} text-primary-foreground`}>
                    <opt.icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-foreground text-sm">{opt.label}</div>
                    <div className="text-xs text-muted-foreground">{opt.desc}</div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SendOptionsModal;
