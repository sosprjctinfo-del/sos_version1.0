import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus, X, Phone } from "lucide-react";
import { Contact } from "@/utils/storage";
import { pickPhoneContact, isContactsAPISupported, requestContactsPermission } from "@/utils/contacts";

interface ContactFormProps {
  onSave: (contact: Omit<Contact, "id">) => void;
  onCancel: () => void;
  initialData?: Contact;
}

const ContactForm = ({ onSave, onCancel, initialData }: ContactFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [phone, setPhone] = useState(initialData?.phone || "");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!name.trim()) return "Name is required";
    if (!phone.trim()) return "Phone number is required";
    if (!/^[+]?[0-9\s-]{7,15}$/.test(phone.replace(/\s/g, "")))
      return "Invalid phone number format";
    return "";
  };

  const handlePickContact = async () => {
    if (!isContactsAPISupported()) {
      setError("Contact picker not supported on this device");
      return;
    }

    setLoading(true);
    try {
      const hasPermission = await requestContactsPermission();
      if (!hasPermission) {
        setError("Contacts permission denied. Please enable in device settings.");
        return;
      }

      const contact = await pickPhoneContact();
      if (contact) {
        setName(contact.name);
        setPhone(contact.phone);
        setError("");
      }
    } catch (err) {
      setError("Failed to pick contact. Please try entering manually.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setError(err);
      return;
    }
    onSave({ name: name.trim(), phone: phone.trim() });
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-5 space-y-4"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserPlus className="w-4 h-4 text-primary" />
          <h3 className="font-semibold text-foreground text-sm">
            {initialData ? "Edit Contact" : "Add Contact"}
          </h3>
        </div>
        <button type="button" onClick={onCancel} className="p-1 rounded-lg hover:bg-accent transition-colors">
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      <div className="space-y-3">
        {isContactsAPISupported() && (
          <button
            type="button"
            onClick={handlePickContact}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-accent/50 border border-border text-muted-foreground text-sm hover:bg-accent hover:text-foreground transition-all disabled:opacity-50"
          >
            <Phone className="w-4 h-4" />
            {loading ? "Accessing Contacts..." : "Select from Phone Contacts"}
          </button>
        )}
        
        <input
          type="text"
          placeholder="Contact Name"
          value={name}
          onChange={(e) => { setName(e.target.value); setError(""); }}
          className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
        <input
          type="tel"
          placeholder="Phone Number (e.g. +1234567890)"
          value={phone}
          onChange={(e) => { setPhone(e.target.value); setError(""); }}
          className="w-full px-4 py-3 rounded-xl bg-accent/50 border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
        />
      </div>

      {error && (
        <p className="text-primary text-xs font-medium bg-primary/10 px-3 py-2 rounded-lg">{error}</p>
      )}

      <button
        type="submit"
        className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-all"
      >
        {initialData ? "Update Contact" : "Add Contact"}
      </button>
    </motion.form>
  );
};

export default ContactForm;
