export const CONTACT_EMAIL = 'adangara13@gmail.com';
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
  'Project inquiry for Tobi Ade'
)}`;

export interface ServiceOffering {
  number: string;
  title: string;
  summary: string;
  turnaround: string;
  scopeNote: string;
  deliverables: string[];
}

export interface ProcessStep {
  number: string;
  title: string;
  detail: string;
}

export interface ConceptProject {
  id: 'bakery-preorder' | 'workshop-registration';
  number: string;
  category: 'preorder' | 'registration';
  categoryLabel: string;
  offerType: string;
  clientName: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  imageAlt: string;
  challenge: string;
  approach: string;
  highlights: string[];
  mobileMetrics: {
    label: string;
    value: string;
  }[];
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    number: '01.',
    title: 'New one-page sites',
    summary:
      'A focused single-page website built from scratch for a neighborhood business, weekend drop, local service, or upcoming event. Designed on a phone screen first so customers can read, decide, and act without pinching or hunting.',
    turnaround: '1–2 weeks',
    scopeNote: 'Fixed scope',
    deliverables: [
      'Message structure and scannable section flow',
      'Phone-first responsive layout that scales cleanly to desktop',
      'Clean static HTML and CSS files ready for Netlify',
      'Direct email, booking, or preorder call-to-action setup',
    ],
  },
  {
    number: '02.',
    title: 'Landing page refreshes',
    summary:
      'For small businesses that already have a page but feel it looks dated, loads slowly on phones, or buries the main call to action. I tighten the layout, sharpen the typography, and make the next step unmistakable.',
    turnaround: '5–7 days',
    scopeNote: 'Keep your domain',
    deliverables: [
      'Mobile usability audit and hierarchy cleanup',
      'Refreshed visual styling with readable contrast and spacing',
      'Clearer service offer and prominent contact or booking flow',
      'Fast, lightweight code ready to publish over your current page',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01.',
    title: 'Short email brief',
    detail:
      'Send a note with what your business sells, who visits your page, and the one action you want them to take.',
  },
  {
    number: '02.',
    title: 'Phone-first layout review',
    detail:
      'Within a few days, you review a working link on your own phone so we can tighten copy and flow before launch.',
  },
  {
    number: '03.',
    title: 'Ready-to-upload files',
    detail:
      'You receive a tidy project folder tested on phones and desktop, ready to publish directly to Netlify.',
  },
];

export const STUDIO_FACTS = [
  {label: 'New one-page site', value: '1–2 wks'},
  {label: 'Landing page refresh', value: '5–7 days'},
  {label: 'Starting viewport', value: '375 px'},
  {label: 'Hosting ready', value: 'Netlify'},
];

export const CONCEPT_PROJECTS: ConceptProject[] = [
  {
    id: 'bakery-preorder',
    number: '01.',
    category: 'preorder',
    categoryLabel: 'Bakery preorder page',
    offerType: 'New one-page site',
    clientName: 'Hearth & Crumb Bakery',
    title: 'Weekend bake preorder page',
    subtitle:
      'A single-screen phone preorder flow replacing scattered social media DMs for a neighborhood sourdough micro-bakery.',
    imageSrc: '/src/assets/images/concept_bakery_preorder_1795110688924.jpg',
    imageAlt:
      'Crusty artisan sourdough loaves, cardamom buns, and seeded country bread resting on a limestone bakery counter with natural linen.',
    challenge:
      'Regulars loved the Saturday bake drops, but taking orders through Instagram replies meant missed messages, unclear pickup hours, and repeat questions about sold-out loaves.',
    approach:
      'Designed around a thumb-friendly phone checklist: weekly bake cutoff at the top, a concise three-item menu with prices, a two-slot Saturday pickup picker, and a clear order total before submitting.',
    highlights: [
      'Weekly order cutoff and pickup address visible above the fold on mobile',
      'Large 44px quantity steppers that work comfortably with one hand',
      'Fixed pickup windows to prevent Saturday morning counter bottlenecks',
    ],
    mobileMetrics: [
      {label: 'Primary goal', value: 'Preorder in under 60s'},
      {label: 'Page structure', value: 'Single scrollable page'},
      {label: 'Project status', value: 'Concept study'},
    ],
  },
  {
    id: 'workshop-registration',
    number: '02.',
    category: 'registration',
    categoryLabel: 'Workshop registration page',
    offerType: 'Landing page refresh',
    clientName: 'Kiln & Clay Studio',
    title: 'Saturday ceramics workshop registration',
    subtitle:
      'A calm, scannable registration page for an intimate weekend hand-building class with live seat selection.',
    imageSrc: '/src/assets/images/concept_workshop_ceramics_1795110688837.jpg',
    imageAlt:
      'Speckled stoneware mugs and bowls arranged on wooden studio boards beside pottery shaping tools and linen towels in bright window light.',
    challenge:
      'The studio’s original class listing buried dates, pricing, and what beginners needed to bring inside long paragraphs, causing mobile visitors to abandon before registering.',
    approach:
      'Restructured the page into crisp, skimmable blocks: session date and remaining seats right below the intro, a plain-language list of included clay and firing, and a two-step seat reservation form.',
    highlights: [
      'Date, duration, skill level, and price paired cleanly at the top of the phone view',
      'Clear “what is included” breakdown that answers beginner questions immediately',
      'Two-field seat reservation with instant confirmation summary',
    ],
    mobileMetrics: [
      {label: 'Primary goal', value: 'Fill 8 seats per session'},
      {label: 'Page structure', value: 'Refresh + seat picker'},
      {label: 'Project status', value: 'Concept study'},
    ],
  },
];
