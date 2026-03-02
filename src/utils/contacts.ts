export interface PhoneContact {
  id: string;
  name: string;
  phone: string;
  email?: string;
}

export const pickPhoneContact = async (): Promise<PhoneContact | null> => {
  return new Promise((resolve) => {
    // Check if the Contacts API is available
    if (!('contacts' in navigator)) {
      resolve(null);
      return;
    }

    const contactsAPI = (navigator as any).contacts;

    // Request permission and select contact
    contactsAPI.select(['name', 'tel', 'email'], { multiple: false })
      .then((contacts: any[]) => {
        if (contacts.length === 0) {
          resolve(null);
          return;
        }

        const contact = contacts[0];
        const phoneContact: PhoneContact = {
          id: contact.id || crypto.randomUUID(),
          name: `${contact.name?.[0]?.givenName || ''} ${contact.name?.[0]?.familyName || ''}`.trim() || 'Unknown',
          phone: contact.tel?.[0] || '',
          email: contact.email?.[0]
        };

        resolve(phoneContact);
      })
      .catch((error: any) => {
        console.error('Error selecting contact:', error);
        resolve(null);
      });
  });
};

export const requestContactsPermission = async (): Promise<boolean> => {
  try {
    if (!('contacts' in navigator)) {
      return false;
    }

    const contactsAPI = (navigator as any).contacts;
    
    // Check if we already have permission
    const permission = await contactsAPI.getState();
    if (permission === 'granted') {
      return true;
    }

    // Request permission
    await contactsAPI.requestPermission();
    return true;
  } catch (error) {
    console.error('Error requesting contacts permission:', error);
    return false;
  }
};

export const isContactsAPISupported = (): boolean => {
  return 'contacts' in navigator;
};
