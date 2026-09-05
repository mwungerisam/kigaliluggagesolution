export const BUSINESS_CONFIG = {
  name: 'Kigali Luggage Solution',
  shortName: 'KLS',
  tagline: 'QUALITY LUGGAGE FOR EVERY JOURNEY',
  sellingProposition: 'QUALITY LUGGAGES',
  deliveryPromise: 'FREE DELIVERY IN KIGALI',
  deliveryDescription: 'Order online and receive your luggage conveniently at your location anywhere across Kigali at no extra cost.',
  location: 'Kigali, Rwanda — Downtown',
  phoneDisplay: '+250 781 157 188',
  phoneRaw: '+250781157188',
  whatsappNumber: '250781157188',
  instagramHandle: '@kigali_luggage_solution',
  instagramUrl: 'https://www.instagram.com/kigali_luggage_solution/?hl=en',
  openingHours: 'Monday – Saturday: 8:00 AM – 7:30 PM | Sunday: 10:00 AM – 5:00 PM',
  currency: 'RWF',
};

// Districts in Kigali for delivery selector
export const KIGALI_DISTRICTS: Record<string, string[]> = {
  Gasabo: [
    'Kimironko',
    'Kacyiru',
    'Remera',
    'Gisozi',
    'Nyarutarama',
    'Gishushu',
    'Kibagabaga',
    'Bumbogo',
    'Gatsata',
    'Jali',
    'Ndera',
    'Nduba',
    'Rusororo',
    'Rutunga',
  ],
  Kicukiro: [
    'Niboye',
    'Kagarama',
    'Gikondo',
    'Kanombe',
    'Kabeza',
    'Gahanga',
    'Gatenga',
    'Masaka',
    'Nyarugunga',
  ],
  Nyarugenge: [
    'Downtown / City Center',
    'Nyamirambo',
    'Muhima',
    'Kiyovu',
    'Gitega',
    'Kimisagara',
    'Kanyinya',
    'Kigali Sector',
    'Mageragere',
    'Nyakabanda',
    'Rwezamenyo',
  ],
  'Outside Kigali (Arrange via WhatsApp)': [
    'Bugesera / Nyamata',
    'Rwamagana',
    'Musanze',
    'Rubavu',
    'Huye',
    'Other Province Destination',
  ],
};

// Currency formatter
export function formatRWF(amount: number): string {
  return new Intl.NumberFormat('en-RW', {
    style: 'currency',
    currency: 'RWF',
    maximumFractionDigits: 0,
  }).format(amount).replace('RWF', 'RWF ');
}

// Generate single product WhatsApp order URL
export function getProductWhatsAppUrl(params: {
  productName: string;
  price: number;
  quantity: number;
  color?: string;
  size?: string;
}): string {
  const colorText = params.color ? `\nColor: ${params.color}` : '';
  const sizeText = params.size ? `\nSize: ${params.size}` : '';

  const message = `Hello Kigali Luggage Solution, I would like to order:

Product: ${params.productName}${colorText}${sizeText}
Price: ${formatRWF(params.price)}
Quantity: ${params.quantity}

Please confirm availability and arrange free delivery in Kigali.`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

// Generate cart / checkout WhatsApp message URL
export function getCartWhatsAppUrl(params: {
  items: Array<{ name: string; quantity: number; price: number; color?: string; size?: string }>;
  total: number;
  customerName?: string;
  phone?: string;
  district?: string;
  sector?: string;
  address?: string;
  orderNotes?: string;
}): string {
  const itemsList = params.items
    .map(
      (item, index) =>
        `${index + 1}. ${item.quantity}x ${item.name}${item.color ? ` (${item.color})` : ''}${
          item.size ? ` [${item.size}]` : ''
        } - ${formatRWF(item.price * item.quantity)}`
    )
    .join('\n');

  let message = `Hello Kigali Luggage Solution, I would like to place an order from your website:

ITEMS:
${itemsList}

Total: ${formatRWF(params.total)}
Delivery: FREE DELIVERY IN KIGALI`;

  if (params.customerName) {
    message += `\n\nCUSTOMER DETAILS:
Name: ${params.customerName}
Phone: ${params.phone || ''}
Location: ${params.district || 'Kigali'}${params.sector ? `, ${params.sector}` : ''}
Address: ${params.address || 'To be specified'}
${params.orderNotes ? `Notes: ${params.orderNotes}` : ''}`;
  }

  message += `\n\nPlease confirm availability and delivery time. Thank you!`;

  return `https://wa.me/${BUSINESS_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
