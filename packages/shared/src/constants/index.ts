/**
 * @dte/shared — constants module.
 *
 * SINGLE SOURCE OF TRUTH for every channel fact in the repo
 * (ADR-0005). Apps import from here; do not duplicate these values
 * in app code. Update stats when the channel crosses milestones.
 */

/** Channel identity. */
export const CHANNEL = {
  name: "Demon Time Exotics",
  show: "THE MESSY SHOW",
  handle: "@DTEMONEY448",
  tagline: "💪🏾😈🔥 No scripts. No filters. Just facts, jokes, and real talk.",
  contact: "Bigmoney@demontimeexotics.com",
  country: "United States",
  joined: "Sep 28, 2022"
} as const;

/** Channel stats snapshot (update at milestones). */
export const CHANNEL_STATS = {
  subscribers: 21_200,
  videos: 406,
  totalViews: 3_025_509
} as const;

/** YouTube channel IDs. */
export const YOUTUBE_IDS = {
  main: "UC4mSdocvseflT-Tubw9xOnw",
  backup: "dteclips"
} as const;

/** Canonical links — every app opens from this list. */
export const LINKS = {
  youtube: "https://www.youtube.com/@DTEMONEY448",
  youtubeSubscribe: "https://www.youtube.com/@DTEMONEY448?sub_confirmation=1",
  youtubeBackup: "https://www.youtube.com/@dteclips",
  membership: "https://www.youtube.com/channel/UC4mSdocvseflT-Tubw9xOnw/join",
  instagram: "https://www.instagram.com/dtemoney448",
  twitch: "https://www.twitch.tv/dtemoney448",
  merch: "https://shopdemontimeexotics.com",
  kofi: "https://ko-fi.com/YOUR_USERNAME",
  email: "mailto:Bigmoney@demontimeexotics.com",
  github: "https://github.com/DTEMONEY448/demon-time-exotics",
  pages: "https://dtemoney448.github.io/demon-time-exotics/"
} as const;

/** Platform hub entries rendered by landing/desktop/mobile. */
export interface Platform {
  name: string;
  handle: string;
  url: string;
  icon: string;
  note: string;
}

export const PLATFORMS: Platform[] = [
  {
    name: "YouTube",
    handle: "@DTEMONEY448",
    url: LINKS.youtube,
    icon: "▶",
    note: "The main show — daily reactions, breakdowns & exposés"
  },
  {
    name: "DTECLIPS",
    handle: "@dteclips",
    url: LINKS.youtubeBackup,
    icon: "✂",
    note: "Backup/clip channel — cross-promotion & cuts"
  },
  {
    name: "Instagram",
    handle: "@dtemoney448",
    url: LINKS.instagram,
    icon: "📸",
    note: "Behind-the-scenes & community posts"
  },
  {
    name: "Twitch",
    handle: "twitch.tv/dtemoney448",
    url: LINKS.twitch,
    icon: "🎮",
    note: "Live streams — long-form breaking drama coverage"
  },
  {
    name: "Merch",
    handle: "shopdemontimeexotics.com",
    url: LINKS.merch,
    icon: "👕",
    note: "The DTE clothing line"
  },
  {
    name: "Membership",
    handle: "Join on YouTube",
    url: LINKS.membership,
    icon: "💜",
    note: "Members-only streams, videos & perks"
  }
];

/** Top-performing videos (channel study snapshot). */
export interface TopVideo {
  title: string;
  views: string;
  age: string;
  category: string;
}

export const TOP_VIDEOS: TopVideo[] = [
  {
    title: 'Why Adrien "AB" Broner REALLY Cut Off Bang and Deen!',
    views: "217K",
    age: "13 days",
    category: "AB × Deen"
  },
  {
    title: "Deen Chased Out Of Bowling Alley!?? Blueface Ray J BEEF Breakdown!",
    views: "214K",
    age: "12 days",
    category: "Deen × Blueface × Ray J"
  },
  {
    title: "The AB And Deen Call That ENDED IT ALL!",
    views: "203K",
    age: "10 days",
    category: "AB × Deen"
  },
  {
    title: "Deen The Great Caught! The Video They Don't Want You To See",
    views: "86K",
    age: "2 weeks",
    category: "Deen"
  },
  {
    title: "Rampage Gets Revenge On Bang! Deen And AB Help!?",
    views: "71K",
    age: "11 days",
    category: "Rampage × Bang"
  },
  {
    title: "Adrien Broner Breaks Silence On Deen The Great Feud!",
    views: "69K",
    age: "7 days",
    category: "AB × Deen"
  }
];

/** Key figures covered (the roster). */
export interface RosterFigure {
  name: string;
  tag: string;
  icon: string;
}

export const ROSTER: RosterFigure[] = [
  { name: 'Adrien "AB" Broner', tag: "Champion boxer", icon: "🥊" },
  { name: "Deen The Great", tag: "Viral star", icon: "⭐" },
  { name: "Ray J", tag: "Singer / personality", icon: "🎤" },
  { name: "Sauce Walka", tag: "Houston rapper", icon: "🔥" },
  { name: "Blueface", tag: "West Coast rapper", icon: "🌊" },
  { name: "Wack 100", tag: "Manager / media figure", icon: "🕶" },
  { name: "Luce Cannon", tag: "Compton rapper", icon: "🎤" },
  { name: "Munchie B", tag: "Street figure", icon: "😈" },
  { name: "Adam22 / No Jumper", tag: "Podcast host", icon: "🎙" },
  { name: "Bricc Baby", tag: "Rapper / personality", icon: "💸" },
  { name: "Smacc", tag: "Viral personality", icon: "💥" }
];

/** Content pillars (landing + docs). */
export interface Pillar {
  title: string;
  icon: string;
  description: string;
}

export const PILLARS: Pillar[] = [
  {
    title: "Hip Hop News & Drama",
    icon: "📰",
    description:
      "Breaking down viral beefs, feuds, and controversies as they happen — first, raw, and unfiltered."
  },
  {
    title: "No Jumper Chaos",
    icon: "🎙",
    description:
      "Coverage of No Jumper-adjacent drama: Adam22, Wack 100, and the podcast-industry chaos around them."
  },
  {
    title: "Podcast Beef",
    icon: "🔥",
    description:
      "Analysis of conflicts between podcasters, personalities, and media figures across the culture."
  },
  {
    title: "Street Politics",
    icon: "🌆",
    description:
      "Compton, South Central, and West Coast hip hop dynamics — street politics explained without sugar."
  },
  {
    title: "Industry Exposés",
    icon: "🔍",
    description:
      "Alleged backdoor deals, snitching allegations, and industry scandals put under the microscope."
  },
  {
    title: "Live Coverage",
    icon: "📡",
    description:
      "Long-form live streams when breaking drama needs the full messy treatment — community debates included."
  }
];

/** Affiliate tech products (channel storefront, see PRICING.md). */
export interface Affiliate {
  name: string;
  retailer: string;
  price: string;
  was?: string;
  retailerUrl: string;
}

export const AFFILIATES: Affiliate[] = [
  {
    name: "DJI Osmo Mobile 7 Phone Gimbal — White",
    retailer: "REI",
    price: "$75.00",
    retailerUrl: "https://www.rei.com/"
  },
  {
    name: "DJI Osmo 360 Adventure Combo — Black",
    retailer: "REI",
    price: "$699.00",
    retailerUrl: "https://www.rei.com/"
  },
  {
    name: "DJI Osmo Action 5 Pro 4K Camera — Standard Combo",
    retailer: "Sweetwater",
    price: "$319.00",
    retailerUrl: "https://www.sweetwater.com/"
  },
  {
    name: "DJI Osmo Nano — 64GB",
    retailer: "Sweetwater",
    price: "$389.00",
    retailerUrl: "https://www.sweetwater.com/"
  },
  {
    name: "Apple MacBook Pro 14-inch — M5 chip 10-core CPU/10-core GPU — 16GB / 1TB SSD — Space Black",
    retailer: "Best Buy",
    price: "$1,999.00",
    retailerUrl: "https://www.bestbuy.com/"
  },
  {
    name: "RODE Wireless ME Compact Microphone System",
    retailer: "Guitar Center",
    price: "$149.00",
    retailerUrl: "https://www.guitarcenter.com/"
  },
  {
    name: "RODE Lavalier II Omnidirectional Lavalier Microphone — Black",
    retailer: "Guitar Center",
    price: "$109.00",
    retailerUrl: "https://www.guitarcenter.com/"
  },
  {
    name: "Rode NT1 Signature Series Condenser Microphone with SM6 Shockmount and Pop Filter — Black",
    retailer: "Sweetwater",
    price: "$146.00",
    was: "$159.00",
    retailerUrl: "https://www.sweetwater.com/"
  },
  {
    name: "Rode Wireless Pro Wireless Microphone System",
    retailer: "Sweetwater",
    price: "$260.00",
    was: "$299.00",
    retailerUrl: "https://www.sweetwater.com/"
  },
  {
    name: "Rode VideoMic GO II Camera-mounted Shotgun Microphone",
    retailer: "Sweetwater",
    price: "$94.99",
    was: "$109.00",
    retailerUrl: "https://www.sweetwater.com/"
  },
  {
    name: "Shure MV7i Smart Microphone and Audio Interface",
    retailer: "Guitar Center",
    price: "$389.00",
    retailerUrl: "https://www.guitarcenter.com/"
  },
  {
    name: "Shure SM7B Cardioid Dynamic Microphone",
    retailer: "Guitar Center",
    price: "$439.00",
    retailerUrl: "https://www.guitarcenter.com/"
  }
];
