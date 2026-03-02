import { motion, AnimatePresence } from "framer-motion";
import { User, Pencil, Trash2, Phone } from "lucide-react";
import { Contact } from "@/utils/storage";

interface ContactListProps {
  contacts: Contact[];
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactList = ({ contacts, onEdit, onDelete }: ContactListProps) => {
  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
        <p className="text-muted-foreground text-sm">No emergency contacts yet</p>
        <p className="text-muted-foreground/60 text-xs mt-1">Add up to 3 contacts</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence>
        {contacts.map((contact, i) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card rounded-xl p-4 flex items-center justify-between group"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{contact.name}</p>
                <div className="flex items-center gap-1 text-muted-foreground text-xs">
                  <Phone className="w-3 h-3" />
                  {contact.phone}
                </div>
              </div>
            </div>

            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(contact)}
                className="p-2 rounded-lg hover:bg-accent transition-colors"
              >
                <Pencil className="w-4 h-4 text-muted-foreground" />
              </button>
              <button
                onClick={() => onDelete(contact.id)}
                className="p-2 rounded-lg hover:bg-primary/10 transition-colors"
              >
                <Trash2 className="w-4 h-4 text-primary" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ContactList;
