import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Plus, AlertTriangle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { Contact, getContacts, saveContacts } from "@/utils/storage";

const MAX_CONTACTS = 3;

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);

  useEffect(() => setContacts(getContacts()), []);

  const persist = (updated: Contact[]) => {
    setContacts(updated);
    saveContacts(updated);
  };

  const handleAdd = (data: Omit<Contact, "id">) => {
    const newContact: Contact = { ...data, id: crypto.randomUUID() };
    persist([...contacts, newContact]);
    setShowForm(false);
  };

  const handleEdit = (data: Omit<Contact, "id">) => {
    if (!editing) return;
    persist(contacts.map((c) => (c.id === editing.id ? { ...c, ...data } : c)));
    setEditing(null);
  };

  const handleDelete = (id: string) => persist(contacts.filter((c) => c.id !== id));

  const canAdd = contacts.length < MAX_CONTACTS;

  return (
    <div className="min-h-screen pt-24 pb-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md mx-auto space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Emergency Contacts</h1>
              <p className="text-xs text-muted-foreground">{contacts.length}/{MAX_CONTACTS} contacts</p>
            </div>
          </div>

          {canAdd && !showForm && !editing && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>
          )}
        </div>

        {!canAdd && !editing && (
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-warning/10 text-warning border border-warning/20 text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Maximum {MAX_CONTACTS} contacts reached
          </div>
        )}

        {/* Form */}
        {(showForm || editing) && (
          <ContactForm
            onSave={editing ? handleEdit : handleAdd}
            onCancel={() => { setShowForm(false); setEditing(null); }}
            initialData={editing || undefined}
          />
        )}

        {/* List */}
        <ContactList
          contacts={contacts}
          onEdit={(c) => { setEditing(c); setShowForm(false); }}
          onDelete={handleDelete}
        />
      </motion.div>
    </div>
  );
};

export default Contacts;
