export interface Contact {
  id: string;
  name: string;
  phone: string;
}

const CONTACTS_KEY = "sos_contacts";
const THEME_KEY = "sos_theme";
const SESSION_KEY = "sos_last_session";

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
