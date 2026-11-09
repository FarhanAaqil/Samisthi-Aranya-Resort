import { RESORT } from '@/data/resort';

export const telHref = `tel:${RESORT.contact.phoneE164}`;

/** WhatsApp link with an optional pre-filled message. */
export function whatsappHref(message: string = RESORT.contact.welcomeMessage): string {
  return `https://wa.me/${RESORT.contact.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
