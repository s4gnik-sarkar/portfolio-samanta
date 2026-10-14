export interface NavItem {
  label: string
  href: string
}

export interface HeroData {
  kicker: string
  headlineMain: string
  headlineAccent: string
  subtitle: string
  metadata: {
    discipline: string
    locations: string
    archiveRange: string
    availability: string
  }
  heroImage: {
    src: string
    alt: string
    plateNumber: string
    title: string
    exif: string
    location: string
  }
}

export interface PhotographerInfo {
  name: string
  title: string
  tagline: string
  currentYear: number
}

export interface GalleryProject {
  id: string
  plateNumber: string
  title: string
  seriesNumber: string
  category: string
  year: string
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'wide'
  aspectClass: string
  colSpanDesktop: string
  offsetClass?: string
  image: {
    src: string
    alt: string
  }
  caption: string
  camera: string
  location: string
}

export interface PortfolioFolderPhoto {
  id: string
  title: string
  image: {
    src: string
    alt: string
  }
  location: string
}

export interface PortfolioFolder {
  id: string
  label: string
  description: string
  photos: PortfolioFolderPhoto[]
}

export interface PhotographyProcessStep {
  number: string
  title: string
  description: string
  backgroundColor: string
  image?: string
}

export interface AboutData {
  kicker: string
  headlineMain: string
  headlineAccent: string
  philosophyQuote: string
  philosophyAttribution: string
  biographyParagraphs: string[]
  portrait: {
    src: string
    alt: string
    caption: string
    year: string
    exif: string
  }
  specialties: {
    category: string
    items: string[]
  }[]
  exhibitions: {
    year: string
    title: string
    venue: string
    city: string
  }[]
  locations: {
    city: string
    role: string
  }[]
}

export interface SocialLink {
  name: string
  label: string
  url: string
}

export interface ContactData {
  kicker: string
  headlineMain: string
  headlineAccent: string
  description: string
  email: string
  emailSubject: string
  responseNotice: string
  availabilityBadge: string
  socialLinks: SocialLink[]
  directNotes: {
    label: string
    value: string
  }[]
}

export const PHOTOGRAPHER_INFO: PhotographerInfo = {
  name: 'SAMANTA',
  title: 'Cinematic Photography & Visual Direction',
  tagline: 'Capturing the poetic silence of light, shadows, and human presence.',
  currentYear: 2026,
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Work', href: '#work' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export const HERO_DATA: HeroData = {
  kicker: 'Visual Archive // Series 01',
  headlineMain: 'Stories told through',
  headlineAccent: 'light.',
  subtitle:
    'Documenting the transient stillness between cinematic realism and poetic shadow. Specializing in analog 35mm, chiaroscuro portraits, and architectural quietude.',
  metadata: {
    discipline: 'Editorial & Cinematic Still Life',
    locations: 'Tokyo — Berlin — New York',
    archiveRange: '2022 — 2026 Archive',
    availability: 'Accepting select worldwide commissions',
  },
  heroImage: {
    // Replaceable high-resolution cinematic editorial photography
    src: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1400&q=85',
    alt: 'Cinematic chiaroscuro editorial portrait with dramatic atmospheric light and shadow',
    plateNumber: 'PLATE NO. 01',
    title: 'THE SHADOW ARCHITECTURE',
    exif: 'Leica M11 // Summilux 50mm f/1.4 // ISO 200',
    location: 'Shinjuku, 02:44 AM',
  },
}

export const GALLERY_PROJECTS: GalleryProject[] = [
  {
    id: 'silent-monolith',
    plateNumber: 'PLATE 01',
    title: 'Silent Monolith',
    seriesNumber: 'SERIES I',
    category: 'Brutalist Geometry',
    year: '2025',
    aspectRatio: 'wide',
    aspectClass: 'aspect-[16/10]',
    colSpanDesktop: 'lg:col-span-7',
    image: {
      src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      alt: 'Minimalist interior room with stark light beam cutting through architectural shadow',
    },
    caption: 'A quiet study of natural illumination dissecting raw concrete planes.',
    camera: 'Leica SL2 // APO-Summicron 35mm f/2',
    location: 'Kyoto, Japan',
  },
  {
    id: 'nocturne-shinjuku',
    plateNumber: 'PLATE 02',
    title: 'The Weight of Rain',
    seriesNumber: 'SERIES II',
    category: 'Nocturne Atmosphere',
    year: '2026',
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[4/5]',
    colSpanDesktop: 'lg:col-span-5',
    offsetClass: 'lg:mt-24',
    image: {
      src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
      alt: 'Rain-slicked city pavement reflecting warm sodium light and neon glow in midnight solitude',
    },
    caption: 'Pavement reflections acting as liquid mirrors during a midnight downpour.',
    camera: 'Leica M11 // Noctilux 50mm f/0.95',
    location: 'Shinjuku, Tokyo',
  },
  {
    id: 'sepia-silver-portrait',
    plateNumber: 'PLATE 03',
    title: 'Solitude at Dawn',
    seriesNumber: 'SERIES III',
    category: 'Analog Monochrome',
    year: '2024',
    aspectRatio: 'square',
    aspectClass: 'aspect-square',
    colSpanDesktop: 'lg:col-span-5',
    image: {
      src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
      alt: 'Dramatic high-contrast portrait with soft studio rim lighting and intense cinematic gaze',
    },
    caption: 'Silver-gelatin tonal gradation exploring quiet emotional presence.',
    camera: 'Hasselblad 500C/M // Planar 80mm f/2.8',
    location: 'Paris Studio 11',
  },
  {
    id: 'nordic-solitary-coast',
    plateNumber: 'PLATE 04',
    title: 'The Cold Horizon',
    seriesNumber: 'SERIES IV',
    category: 'Minimalist Wilderness',
    year: '2025',
    aspectRatio: 'landscape',
    aspectClass: 'aspect-[16/9]',
    colSpanDesktop: 'lg:col-span-7',
    offsetClass: 'lg:mt-16',
    image: {
      src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
      alt: 'Vast foggy coastline meeting dark volcanic sand under overcast arctic skies',
    },
    caption: 'Where black basalt sand dissolves into the mist of the North Atlantic.',
    camera: 'Mamiya 7 II // 43mm f/4.5 // Kodak Tri-X 400',
    location: 'Vik, Iceland',
  },
  {
    id: 'ephemeral-form',
    plateNumber: 'PLATE 05',
    title: 'Draped in Chiaroscuro',
    seriesNumber: 'SERIES V',
    category: 'Editorial Couture',
    year: '2026',
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[3/4]',
    colSpanDesktop: 'lg:col-span-6',
    image: {
      src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
      alt: 'Fashion silhouette interacting with fluid textiles under sculptural directional light',
    },
    caption: 'Sculptural textile in tension with deep environmental darkness.',
    camera: 'Contax 645 // Zeiss Planar 80mm f/2',
    location: 'Milan, Italy',
  },
  {
    id: 'geometry-stairwell',
    plateNumber: 'PLATE 06',
    title: 'Ascent Through Concrete',
    seriesNumber: 'SERIES VI',
    category: 'Modernist Shadows',
    year: '2025',
    aspectRatio: 'portrait',
    aspectClass: 'aspect-[4/5]',
    colSpanDesktop: 'lg:col-span-6',
    offsetClass: 'lg:mt-20',
    image: {
      src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85',
      alt: 'Striking geometric perspective of architectural lines and sharp shadow angles',
    },
    caption: 'Repetitive structural rhythms fractured by late afternoon sun.',
    camera: 'Leica Q3 // Summilux 28mm f/1.7',
    location: 'Berlin, Germany',
  },
]

// Replace these sample image URLs and details with your own photographs.
export const PHOTOGRAPHY_FOLDERS: PortfolioFolder[] = [
  {
    id: 'events',
    label: 'Event Photography',
    description: 'Unscripted energy, gathered in a frame.',
    photos: [
      { id: 'event-01', title: 'In the Crowd', location: 'Live moments', image: { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85', alt: 'Crowd gathered beneath stage lights at a live event' } },
      { id: 'event-02', title: 'The Gathering', location: 'Shared moments', image: { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=85', alt: 'Guests gathered together at a celebratory event' } },
      { id: 'event-03', title: 'After Hours', location: 'Night stories', image: { src: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=85', alt: 'Audience enjoying an outdoor concert under colorful lights' } },
    ],
  },
  {
    id: 'weddings',
    label: 'Wedding Photography',
    description: 'The small gestures inside a very big day.',
    photos: [
      { id: 'wedding-01', title: 'The Vows', location: 'A day to remember', image: { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85', alt: 'Newly married couple sharing a quiet moment outdoors' } },
      { id: 'wedding-02', title: 'The Celebration', location: 'Together, always', image: { src: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1000&q=85', alt: 'Wedding couple celebrating together' } },
      { id: 'wedding-03', title: 'A Golden Hour', location: 'Wedding stories', image: { src: 'https://images.unsplash.com/photo-1520857014576-2c4f4c972b57?auto=format&fit=crop&w=1000&q=85', alt: 'Bride and groom sharing a moment during their wedding day' } },
    ],
  },
  {
    id: 'portraits',
    label: 'Portrait Photography',
    description: 'A little more than a likeness.',
    photos: [
      { id: 'portrait-01', title: 'Quiet Confidence', location: 'Portrait study', image: { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85', alt: 'Expressive studio portrait of a woman looking toward the camera' } },
      { id: 'portrait-02', title: 'In Soft Light', location: 'Portrait study', image: { src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1000&q=85', alt: 'Natural light portrait of a man against a simple background' } },
      { id: 'portrait-03', title: 'A Passing Thought', location: 'Portrait study', image: { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85', alt: 'Candid portrait with a soft, relaxed expression' } },
    ],
  },
]

export const PHOTOGRAPHY_PROCESS: PhotographyProcessStep[] = [
  {
    number: '01',
    title: 'Notice everything.',
    description: 'The gesture before the pose. A room before it fills. The detail that makes a moment belong to you.',
    backgroundColor: '#E6F35A',
  },
  {
    number: '02',
    title: 'Wait for the light.',
    description: 'Follow the changing hour, the weather, the feeling in the room. Let the photograph arrive at its own pace.',
    backgroundColor: '#181A16',
    image: PHOTOGRAPHY_FOLDERS[0].photos[0].image.src,
  },
  {
    number: '03',
    title: 'Keep it human.',
    description: 'Make space for real presence. Shape the frame with care, then leave the truth of the moment intact.',
    backgroundColor: '#E8E1D1',
  },
]

export const ABOUT_DATA: AboutData = {
  kicker: 'Biography & Creative Philosophy',
  headlineMain: 'Observation as an act of',
  headlineAccent: 'quiet rebellion.',
  philosophyQuote:
    'I do not search for decisive moments; I search for the stillness that exists when the world forgets it is being watched. In that suspended breath, light sculpts what words cannot articulate.',
  philosophyAttribution: 'Samanta // Visual Director & Photographer',
  biographyParagraphs: [
    'Based between Tokyo, Berlin, and New York, Samanta is an independent photographer and visual director whose work exists at the intersection of cinematic chiaroscuro, brutalist spatial geometry, and intimate human observation. Trained in both classical darkroom techniques and large-format digital workflows, each body of work is developed with surgical attention to raking light and atmospheric density.',
    'Over the past decade, Samanta has produced commissioned editorial projects, private monograph archives, and architectural studies for international cultural institutions, luxury ateliers, and independent cinema productions. Working predominantly with analog 35mm and medium-format negative stocks alongside modern high-dynamic-range digital sensors, the resulting images carry a deliberate weight—tactile, contemplative, and timeless.',
    'The studio operates on an invitation and select commission basis, maintaining an uncompromising dedication to visual intentionality, archival paper standards, and bespoke gallery installations.',
  ],
  portrait: {
    // Replaceable artist portrait
    src: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85',
    alt: 'Samanta, photographer portrait in deep cinematic chiaroscuro studio lighting',
    caption: 'Studio Study, Berlin // Hasselblad 500C/M',
    year: '2025',
    exif: 'Available for Worldwide Travel',
  },
  specialties: [
    {
      category: 'Core Disciplines',
      items: [
        'Cinematic Portraiture',
        'Architectural Chiaroscuro',
        '35mm & 120 Analog Film',
        'Editorial Haute Couture',
      ],
    },
    {
      category: 'Studio Services',
      items: [
        'Creative & Visual Direction',
        'Monograph & Book Curation',
        'Archival Silver Gelatin Prints',
        'Exhibition Scenography',
      ],
    },
  ],
  exhibitions: [
    {
      year: '2025',
      title: 'Shadow Architecture',
      venue: 'Gallery Naruse',
      city: 'Tokyo',
    },
    {
      year: '2024',
      title: 'The Nocturne Series',
      venue: 'Galerie Vivienne',
      city: 'Paris',
    },
    {
      year: '2023',
      title: 'Forms in Concrete',
      venue: 'Kulturforum Mitte',
      city: 'Berlin',
    },
    {
      year: '2022',
      title: 'Silver & Salt',
      venue: 'Aperture Foundation',
      city: 'New York',
    },
  ],
  locations: [
    { city: 'Tokyo', role: 'Primary Studio' },
    { city: 'Berlin', role: 'European Atelier' },
    { city: 'New York', role: 'Archival & Representation' },
  ],
}

export const CONTACT_DATA: ContactData = {
  kicker: 'Direct Inquiries & Commissions',
  headlineMain: 'Have a story in',
  headlineAccent: 'mind?',
  description:
    'Available for select worldwide editorial assignments, monograph publishing, architectural documentation, and private commissions. Every collaboration begins with an intentional conversation about light, atmosphere, and medium.',
  email: 'studio@samanta-visuals.com',
  emailSubject: 'Commission Inquiry — Photography & Visual Direction',
  responseNotice: 'Direct inquiries are reviewed personally and answered within 24–48 hours.',
  availabilityBadge: 'Currently accepting Q3/Q4 commissions',
  socialLinks: [
    { name: 'Instagram', label: '@samanta.visuals', url: 'https://instagram.com' },
    { name: 'LensCulture', label: 'LensCulture Portfolio', url: 'https://lensculture.com' },
    { name: 'Behance', label: 'Behance / Curated', url: 'https://behance.net' },
    { name: 'Foundation', label: 'Foundation / Editions', url: 'https://foundation.app' },
  ],
  directNotes: [
    {
      label: 'Studio Representation',
      value: 'Tokyo // Berlin // New York',
    },
    {
      label: 'Archival Print Inquiries',
      value: 'Limited darkroom silver gelatin editions on museum rag',
    },
    {
      label: 'Direct Channel',
      value: 'Encrypted communication available upon preliminary inquiry',
    },
  ],
}
