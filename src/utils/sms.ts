export const buildSMSLink = (phone: string, message: string): string => {
  return `sms:${phone}?body=${encodeURIComponent(message)}`;
};

export const buildWhatsAppLink = (phone: string, message: string): string => {
  const cleanPhone = phone.replace(/[^0-9+]/g, "");
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
};

export const buildEmergencyMessage = (mapsLink: string): string => {
  return `🚨 EMERGENCY! I need help urgently!\n\nMy current location:\n${mapsLink}\n\nPlease respond immediately!`;
};

export const playAlertSound = () => {
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
  const playBeep = (freq: number, startTime: number, duration: number) => {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillator.frequency.value = freq;
    oscillator.type = "sine";
    gainNode.gain.setValueAtTime(0.3, startTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  };

  const now = audioContext.currentTime;
  playBeep(880, now, 0.15);
  playBeep(880, now + 0.2, 0.15);
  playBeep(1100, now + 0.4, 0.3);
};
