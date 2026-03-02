export interface Contact {
  id: string;
  name: string;
  phone: string;
}

export interface MedicalProfile {
  fullName: string;
  bloodGroup: string;
  allergies: string;
  medications: string;
  emergencyNotes: string;
}

const CONTACTS_KEY = "sos_contacts";
const THEME_KEY = "sos_theme";
const SESSION_KEY = "sos_last_session";
const MEDICAL_PROFILE_KEY = "sos_medical_profile";

export const getContacts = (): Contact[] => {
  const data = localStorage.getItem(CONTACTS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveContacts = (contacts: Contact[]) => {
  localStorage.setItem(CONTACTS_KEY, JSON.stringify(contacts));
};

export const getTheme = (): "light" | "dark" => {
  return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
};

export const saveTheme = (theme: "light" | "dark") => {
  localStorage.setItem(THEME_KEY, theme);
};

export const getLastSession = () => {
  const data = localStorage.getItem(SESSION_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveLastSession = (session: { active: boolean; startTime: number | null }) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

export const getMedicalProfile = (): MedicalProfile => {
  const data = localStorage.getItem(MEDICAL_PROFILE_KEY);
  const parsed = data ? (JSON.parse(data) as Partial<MedicalProfile>) : {};
  return {
    fullName: parsed.fullName || "",
    bloodGroup: parsed.bloodGroup || "",
    allergies: parsed.allergies || "",
    medications: parsed.medications || "",
    emergencyNotes: parsed.emergencyNotes || "",
  };
};

export const saveMedicalProfile = (profile: MedicalProfile) => {
  localStorage.setItem(MEDICAL_PROFILE_KEY, JSON.stringify(profile));
};
