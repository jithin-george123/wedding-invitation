export const DEFAULT_WEDDING_DATA = {
  malayalamGroom: "ജെറോം",
  malayalamBride: "ജോമോൾ",
  malayalamConnector: "♡",
  groomName: "Jerome",
  brideName: "Jomol",
  heroEyebrow: "THE WEDDING CELEBRATION OF",
  heroSubtitle: "TOGETHER WITH THEIR FAMILIES",
  topCornerQuote: `TWO SOULS
A BRIGHTER
TOMORROW`,
  date: "30 · 12 · 2026",
  dateDay: "Wednesday",
  dateIso: "2026-12-30T10:30:00",
  muhurthamTime: "10:30 AM",
  venueName: "DAFFODILS Convention centre",
  venueLocation: "Kozhikode, Kerala",
  venueFont: "serif",
  venueDescription: "The DAFFODILS Convention Centre combines grand modern architecture with Kozhikode's serene tropical landscape, providing an airy, spacious oasis perfect for major celebrations.",
  venueMapUrl: "https://www.google.com/maps/search/?api=1&query=11.55937,75.79857",
  venueDirectionsUrl: "https://www.google.com/maps/dir/?api=1&destination=11.55937,75.79857",
  storyTitle: "Our Story",
  storySubtitle: `DIFFERENT PATHS,
A SHARED HORIZON`,
  storyParagraph1: "What began as conversations, slowly turned into a beautiful journey. Through laughter, dreams and quiet moments, we found home in each other.",
  storyParagraph2: "And now, we begin forever.",
  storyQuote: "“Same skies, new beginnings.”",
  eventsMalayalam: "FESTIVE CELEBRATIONS",
  eventsTitle: "Events & Festivities",
  eventsSubtitle: "JOIN US IN EVERY CELEBRATION",
  events: [
    {
      id: "event_1",
      title: "Holy Matrimony",
      subtitle: "Solemnization of Marriage",
      date: "30 · 12 · 2026",
      time: "10:30 AM - 11:30 AM",
      venue: "Grand Hall, DAFFODILS Convention centre",
      location: "Kozhikode, Kerala",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=11.55937,75.79857",
      description: "Solemn wedding service and nuptial blessing, uniting Jerome & Jomol in Holy Matrimony under God's grace.",
      isoDate: "2026-12-30T10:30:00"
    },
    {
      id: "event_2",
      title: "Wedding Reception & Feast",
      subtitle: "Celebration with Family & Friends",
      date: "30 · 12 · 2026",
      time: "12:00 PM Onwards",
      venue: "Banquet Lawn, DAFFODILS Convention centre",
      location: "Kozhikode, Kerala",
      mapUrl: "https://www.google.com/maps/search/?api=1&query=11.55937,75.79857",
      description: "Join us for the wedding reception and grand feast, followed by cake cutting, music, and joyful celebrations.",
      isoDate: "2026-12-30T12:00:00"
    }
  ],
  galleryTitle: "Moments in Time",
  gallerySubtitle: "MEMORIES WOVEN IN LIGHT AND LOVE",
  galleryTagline: "A THOUSAND LITTLE FOREVERS",
  videoMalayalam: "സിനിമാറ്റിക് ഓർമ്മകൾ",
  videoTitle: "Save The Date & Highlights",
  videoSubtitle: "RELIVE OUR SPECIAL MOMENTS IN MOTION",
  videoDescription: "A cinematic glimpse into our celebration and cherished journey.",
  videos: [
    {
      id: "video_1",
      title: "Save The Date & Highlights",
      subtitle: "RELIVE OUR SPECIAL MOMENTS IN MOTION",
      description: "A cinematic glimpse into our celebration and cherished journey.",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
      youtubeId: "ScMzIvxBSi4"
    }
  ],
  rsvpTitle: "Kindly RSVP",
  rsvpSubtitle: "WE WOULD BE DELIGHTED BY YOUR PRESENCE",
  rsvpSideQuote: `Good people
make good days
greater`,
  guestbookMalayalam: "ആശംസകൾ",
  guestbookTitle: "Guest Book",
  guestbookSubtitle: "WORDS OF LOVE, WISHES & BLESSINGS",
  wishesMalayalam: "ആശംസകൾ",
  wishesTitle: "Guest Book",
  wishesSubtitle: "WORDS OF LOVE, WISHES & BLESSINGS",
  footerQuote: "BOUND BY DESTINY ♡ BLESSED BY LOVE",
  useMalayalamInHero: false,
  musicUrl: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
  musicType: "youtube",
  youtubeMusicId: "ScMzIvxBSi4",
  musicVolume: 75,
  musicStartSec: 0,
  musicLoop: true,
  galleryRatio: "portrait", // "portrait" (3:4), "tall" (2:3), "soft" (4:5), "contain"
  galleryFocus: "faces", // "faces" (top 18%), "center", "top"
  images: {
    coupleStory: "/wedding/photos/photo1.jpg",
    gallery1: "/wedding/photos/photo2.jpg",
    gallery2: "/wedding/photos/photo3.jpg",
    gallery3: "/wedding/photos/photo4.jpg",
    gallery4: "/wedding/photos/photo5.jpg",
    gallery5: "/wedding/photos/photo6.jpg"
  },
  sections: {
    story: true,
    events: true,
    venue: true,
    gallery: true,
    videos: true,
    rsvp: true,
    guestbook: false,
    wishes: false
  }
};

export const GALLERY_ITEMS_CONFIG = [
  { key: "gallery1", label: "Our Journey", subtitle: "Where it all began", gridClass: "col-span-12 md:col-span-6" },
  { key: "gallery2", label: "Laughter & Warmth", subtitle: "Cherished memories", gridClass: "col-span-12 md:col-span-6" },
  { key: "gallery3", label: "Quiet Moments", subtitle: "Finding home in each other", gridClass: "col-span-12 sm:col-span-4" },
  { key: "gallery4", label: "Celebration of Love", subtitle: "Surrounded by loved ones", gridClass: "col-span-12 sm:col-span-4" },
  { key: "gallery5", label: "Forever Together", subtitle: "A shared horizon", gridClass: "col-span-12 sm:col-span-4" }
];

export const MUSIC_PRESETS = [
  { id: "darshana-flute", name: "Serene Backwaters (Wedding Flute)", artist: "Kerala Temple Classical", type: "youtube", youtubeId: "ScMzIvxBSi4", tag: "Atmospheric" },
  { id: "traditional-nadaswaram", name: "Traditional Nadaswaram & Kasavu", artist: "Auspicious Chants", type: "youtube", youtubeId: "3PZ1N-vVb9U", tag: "Celebration" },
  { id: "acoustic-romance", name: "Romantic Acoustic & Sitar", artist: "Soulful Strings", type: "youtube", youtubeId: "eCGEwzHVELA", tag: "Romantic" },
  { id: "hridayam-ambient", name: "Hridayam Theme Melody", artist: "Ambient Wedding", type: "youtube", youtubeId: "ScMzIvxBSi4", tag: "Peaceful" }
];

export const INITIAL_WISHES = [];
