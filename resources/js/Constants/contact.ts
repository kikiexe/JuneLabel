/**
 * Contact Information Configuration
 * Centralized contact details for June Label
 */

export interface ContactInfo {
  email: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  workingHours: string;
}

export const CONTACT_INFO: ContactInfo = {
  email: 'junelabelco@gmail.com',
  phone: '+62 822-8257-7216',
  phoneRaw: '6282282577216',
  whatsapp: '6282282577216',
  workingHours: 'Monday - Sunday : 8.30 AM - 9.00 PM',
};

export interface SocialMedia {
  facebook: string;
  instagram: string;
  tiktok: string;
}

export const SOCIAL_MEDIA: SocialMedia = {
  facebook: 'https://www.facebook.com/junelabel.co/',
  instagram: 'https://www.instagram.com/junelabel.co/',
  tiktok: 'https://www.tiktok.com/@junelabel.co',
};

export const DEFAULT_WHATSAPP_MESSAGE =
  'Halo June Label, saya ingin bertanya mengenai produk anda.';
