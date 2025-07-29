
export const CULTURAL_BACKGROUNDS = [
  'Punjabi', 'Hindi', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati',
  'Kannada', 'Malayalam', 'Odia', 'Assamese', 'Urdu', 'Other'
] as const;

export const FESTIVALS = [
  'Diwali', 'Holi', 'Eid', 'Christmas', 'Dussehra', 'Karva Chauth',
  'Baisakhi', 'Ganesh Chaturthi', 'Navratri', 'Raksha Bandhan',
  'Janmashtami', 'Durga Puja', 'Onam', 'Pongal', 'Lohri'
] as const;

export type CulturalBackground = typeof CULTURAL_BACKGROUNDS[number];
export type Festival = typeof FESTIVALS[number];
