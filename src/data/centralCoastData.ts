import {
  exerciseLibrary,
  exerciseMetadata,
  workoutStructureDescriptions,
  musicalBeatdownDescriptions,
  cotIntentions,
} from '../data';
import savedNotesRaw from '../savedExerciseNotes.json';

export interface WorkoutSession {
  id: string;
  day: string;
  dayIndex: number; // 0 = Sun, 1 = Mon, 2 = Tue, 3 = Wed, 4 = Thu, 5 = Fri, 6 = Sat
  startHour: number;
  startMinute: number;
  timeLabel: string;
  durationMins: number;
  aoName: string;
  city: string;
  style: string;
  shortTag: string;
  address: string;
  meetupDetails: string;
  parkingNote: string;
  fngFriendlyNote: string;
  lat: number;
  lng: number;
  googleMapsUrl: string;
}

export interface CoastalSpot {
  id: string;
  name: string;
  city: string;
  type: 'primary' | 'station';
  lat: number;
  lng: number;
  scheduleSummary?: string;
  address: string;
  terrainNote: string;
  googleMapsUrl: string;
}

export interface LexiconEntry {
  term: string;
  pronunciation?: string;
  category: 'Core' | 'Workout' | 'Culture';
  definition: string;
}

export interface F3Pillar {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface LeadershipRole {
  id: string;
  title: string;
  badge: string;
  category: 'Core' | 'SLT' | 'AO';
  summary: string;
  bullets: string[];
}

export const CENTRAL_COAST_LINKS = {
  websiteDomain: 'f3centralcoast.com',
  websiteUrl: 'https://f3centralcoast.com',
  contactEmail: 'F3CentralCoast@gmail.com',
  contactMailto:
    'mailto:F3CentralCoast@gmail.com?subject=Central%20Coast%20F3%20%E2%80%94%20New%20FNG%20%2F%20Contact',
  slackWorkspace: 'https://f3santabarbara.slack.com',
  fngSlackInvite:
    'https://join.slack.com/t/f3santabarbara/shared_invite/zt-43uzplwrp-GVtyDAhwi_jHoJyXmyJn9w',
  userManual:
    'https://docs.google.com/document/d/1e7tmuY3irKDt9oy1URQVcxPwxyet1ZY_bVZhGvhESEw/edit?tab=t.5w03u3eurxbf',
  howToSignUpQ: 'https://www.youtube.com/watch?v=4A1UroeVA0s',
  howToBackblast: 'https://youtu.be/tRAVOFbtHgY',
  f3NationMap: 'https://map.f3nation.com/?lat=34.402&lng=-119.61&zoom=11',
  f3NationHome: 'https://f3nation.com/',
  f3Gear: 'https://f3gear.com/',
};

export const WEEKLY_SCHEDULE: WorkoutSession[] = [
  {
    id: 'tue-sbcc',
    day: 'Tuesday',
    dayIndex: 2,
    startHour: 5,
    startMinute: 30,
    timeLabel: '5:30 AM – 6:15 AM',
    durationMins: 45,
    aoName: 'SBCC Parking Lot',
    city: 'Santa Barbara, CA',
    style: 'Bootcamp',
    shortTag: '45 MIN BOOTCAMP',
    address: '721 Cliff Dr (La Playa / Shoreline Lot), Santa Barbara, CA 93109',
    meetupDetails:
      'Meet in the SBCC parking lot above Leadbetter Beach before 5:30 AM sharp. Look for the circle of headlamps and guys warming up in the gloom.',
    parkingNote: 'Ample early-morning parking at SBCC Lot / Loma Alta & Shoreline Dr.',
    fngFriendlyNote: 'Fast-paced 45-minute weekday grinder—easy to get in, get stronger, and make work.',
    lat: 34.4039,
    lng: -119.6968,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4039,-119.6968',
  },
  {
    id: 'thu-carp',
    day: 'Thursday',
    dayIndex: 4,
    startHour: 5,
    startMinute: 30,
    timeLabel: '5:30 AM – 6:15 AM',
    durationMins: 45,
    aoName: 'End of Linden Ave',
    city: 'Carpinteria, CA',
    style: 'Bootcamp',
    shortTag: '45 MIN COASTAL BOOTCAMP',
    address: 'End of Linden Ave at Carpinteria City Beach, Carpinteria, CA 93013',
    meetupDetails:
      'Gather right at the ocean end of Linden Ave beside Carpinteria City Beach. Salt air, surf sound, and hard miles before sunrise.',
    parkingNote: 'Free early-morning street & beach lot parking at the foot of Linden Ave.',
    fngFriendlyNote: 'Flat coastal terrain with beachside grit—great midpoint option for South County & Ventura-side PAX.',
    lat: 34.3982,
    lng: -119.5190,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.3982,-119.5190',
  },
  {
    id: 'sat-sbcc',
    day: 'Saturday',
    dayIndex: 6,
    startHour: 6,
    startMinute: 0,
    timeLabel: '6:00 AM – 7:00 AM',
    durationMins: 60,
    aoName: 'SBCC Parking Lot',
    city: 'Santa Barbara, CA',
    style: 'Bootcamp + Coffeeteria',
    shortTag: '60 MIN FLAGSHIP • FNG FAVORITE',
    address: '721 Cliff Dr (La Playa / Shoreline Lot), Santa Barbara, CA 93109',
    meetupDetails:
      'Our flagship Saturday morning beatdown. Expect creative routes across SBCC Stadium, Grassy Hill, Leadbetter Beach, or Thousand Steps—followed by post-workout coffee.',
    parkingNote: 'Meet at SBCC Parking Lot off Shoreline Dr / Loma Alta Dr by 5:55 AM.',
    fngFriendlyNote: 'Best first post for FNGs: slightly later start, biggest crew, and Coffeeteria right after COT.',
    lat: 34.4039,
    lng: -119.6968,
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4039,-119.6968',
  },
];

export const COASTAL_SPOTS: CoastalSpot[] = [
  {
    id: 'ao-sbcc-lot',
    name: 'SBCC Parking Lot (Primary AO)',
    city: 'Santa Barbara',
    type: 'primary',
    lat: 34.4039,
    lng: -119.6968,
    scheduleSummary: 'Tuesdays 5:30 AM • Saturdays 6:00 AM',
    address: '721 Cliff Dr / Loma Alta & Shoreline Dr, Santa Barbara, CA',
    terrainNote:
      'Primary Santa Barbara launch point. From here the Q launches the PAX across campus hills, stadium stairs, coastal bluffs, and beach stretches.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4039,-119.6968',
  },
  {
    id: 'ao-linden-carp',
    name: 'End of Linden Ave (Primary AO)',
    city: 'Carpinteria',
    type: 'primary',
    lat: 34.3982,
    lng: -119.5190,
    scheduleSummary: 'Thursdays 5:30 AM',
    address: 'Foot of Linden Ave at Carpinteria City Beach, Carpinteria, CA',
    terrainNote:
      'Primary Carpinteria launch point. Dawn workouts right beside the Pacific—blending boardwalk sprints, beach sand work, and bodyweight circuits.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.3982,-119.5190',
  },
  {
    id: 'station-sbcc-stadium',
    name: 'SBCC La Playa Stadium',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4043,
    lng: -119.6956,
    address: 'La Playa Stadium, Shoreline Dr, Santa Barbara, CA',
    terrainNote: 'Ocean-view track and stadium steps used for Jacob’s Ladder, bleacher climbs, and interval sprints.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4043,-119.6956',
  },
  {
    id: 'station-leadbetter',
    name: 'Leadbetter Beach',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4011,
    lng: -119.6993,
    address: '801 Shoreline Dr, Santa Barbara, CA',
    terrainNote: 'Coastal sand, grass park, and shoreline path for Pearls on a String, D.O.R.A. 1-2-3, and Mary in the sea breeze.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4011,-119.6993',
  },
  {
    id: 'station-grassy-hill',
    name: 'SBCC Grassy Hill',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4055,
    lng: -119.7009,
    address: 'SBCC Campus Slope, Cliff Dr, Santa Barbara, CA',
    terrainNote: 'Steep turf incline built for 11s, hill repeats, bear crawls up the grade, and brutal quad burners.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4055,-119.7009',
  },
  {
    id: 'station-thousand-steps',
    name: 'Thousand Steps',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.3982,
    lng: -119.7154,
    address: 'Foot of Santa Cruz Blvd & Shoreline Dr, Santa Barbara, CA',
    terrainNote: 'Iconic Santa Barbara coastal bluff staircase—guaranteed to test lungs, legs, and mental grit.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.3982,-119.7154',
  },
  {
    id: 'station-waterbreak',
    name: 'Waterbreak (SB Breakwater)',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4048,
    lng: -119.6884,
    address: 'Santa Barbara Harbor Breakwater, Harbor Way, Santa Barbara, CA',
    terrainNote: 'Harbor seawall and jetty mosey route with sunrise views over the boats and Santa Ynez Mountains.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4048,-119.6884',
  },
  {
    id: 'station-surfers-point',
    name: 'Surfers Point / Leadbetter Point',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4004,
    lng: -119.7029,
    address: 'Shoreline Park Overlook / Leadbetter Point, Santa Barbara, CA',
    terrainNote: 'Bluff-top overlook and point break stretch used for scenic moseys, wall sits, and partner circuits.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4004,-119.7029',
  },
  {
    id: 'station-east-campus',
    name: 'SBCC East Campus',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4071,
    lng: -119.6964,
    address: 'SBCC East Campus, Cliff Dr, Santa Barbara, CA',
    terrainNote: 'Concrete courtyards, ledges, benches, and stairs perfect for dips, step-ups, and Four Corners.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4071,-119.6964',
  },
  {
    id: 'station-west-campus',
    name: 'SBCC West Campus',
    city: 'Santa Barbara',
    type: 'station',
    lat: 34.4047,
    lng: -119.7026,
    address: 'SBCC West Campus, Cliff Dr, Santa Barbara, CA',
    terrainNote: 'Open campus lawns, walkways, and hills connected across the iconic pedestrian bridge.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=34.4047,-119.7026',
  },
];

export const FIVE_PILLARS: F3Pillar[] = [
  {
    number: '01',
    title: 'Always Free of Charge',
    subtitle: '$0 DUES • NO SUBSCRIPTIONS',
    description:
      'You will never pay a membership fee, drop-in fee, or sign a contract. F3 is free to every man, every morning, forever.',
  },
  {
    number: '02',
    title: 'Open to All Men',
    subtitle: 'ANY AGE • ANY FITNESS LEVEL',
    description:
      'Whether you haven’t worked out in ten years or you run ultras, you belong here. Every move is scalable and we always pick up the six.',
  },
  {
    number: '03',
    title: 'Always Held Outdoors',
    subtitle: 'RAIN OR SHINE • IN THE GLOOM',
    description:
      'No air-conditioned gyms, mirrors, or treadmills. We train in the early morning dark—fog, wind, coastal mist, or pouring rain.',
  },
  {
    number: '04',
    title: 'Peer-Led in Rotation',
    subtitle: 'NO PAID INSTRUCTORS',
    description:
      'Regular men take turns leading the workout (taking the "Q"). Stepping up to lead a beatdown builds leadership that carries home.',
  },
  {
    number: '05',
    title: 'Ends in a Circle of Trust',
    subtitle: 'BROTHERHOOD & PURPOSE',
    description:
      'Every beatdown finishes shoulder-to-shoulder: count off, give names, announce community events, and lift up real intentions.',
  },
];

export const F3_LEXICON: LexiconEntry[] = [
  {
    term: 'PAX',
    category: 'Core',
    definition: 'Latin for "peace"—used in F3 to refer to the men participating in a workout (singular or plural).',
  },
  {
    term: 'FNG',
    category: 'Core',
    definition: 'Friendly New Guy. A man showing up to his very first F3 beatdown. At the end of your first post, the PAX give you your official F3 nickname.',
  },
  {
    term: 'AO',
    category: 'Core',
    definition: 'Area of Operation. The specific park, beach, or parking lot where an F3 workout launches (like SBCC Parking Lot or End of Linden Ave).',
  },
  {
    term: 'The Q',
    category: 'Core',
    definition: 'The guy who volunteered to lead today’s workout. Not a paid trainer—just one of the PAX stepping up to plan and call the cadence.',
  },
  {
    term: 'The Gloom',
    category: 'Culture',
    definition: 'The pre-dawn darkness when most of the world is still asleep and the PAX are already out getting better.',
  },
  {
    term: 'Beatdown',
    category: 'Workout',
    definition: 'An F3 workout session. Hard enough to push your limits, adaptable enough that every man finishes together.',
  },
  {
    term: 'Mosey',
    category: 'Workout',
    definition: 'A group jog from one workout station to the next. Faster guys loop back so the whole group stays tight.',
  },
  {
    term: 'Merkin',
    category: 'Workout',
    definition: 'F3’s word for a push-up—with dozens of variations (Wide, Diamond, Ranger, Hand-Release, Carolina Dry Dock).',
  },
  {
    term: 'Mary',
    category: 'Workout',
    definition: 'The final 5–7 minutes of core and ab exercises right before Circle of Trust (LBCs, Flutter Kicks, American Hammers).',
  },
  {
    term: 'Coupon',
    category: 'Workout',
    definition: 'A heavy object brought to a workout—commonly a cinder block, kettlebell, sandbag, or backpack—to add weighted grit.',
  },
  {
    term: 'COT',
    category: 'Core',
    definition: 'Circle of Trust. The closing huddle: Count-O-Rama, Name-O-Rama, Announcements, and Ball of Man (intentions/thoughts).',
  },
  {
    term: 'Coffeeteria',
    category: 'Culture',
    definition: 'Optional coffee and conversation after the beatdown (especially Saturdays!). Where 2nd F fellowship really locks in.',
  },
  {
    term: 'The Six',
    category: 'Culture',
    definition: 'The man at the back of the pack during a run or drill. We "pick up the six"—no man ever finishes alone.',
  },
  {
    term: 'HC',
    category: 'Culture',
    definition: 'Hard Commit. Telling the crew on Slack you’ll be there in the morning—because accountability beats the snooze button.',
  },
  {
    term: 'EH',
    category: 'Culture',
    definition: 'Emotional Headlock. Inviting a friend, neighbor, or coworker to join you in the gloom for their first beatdown.',
  },
  {
    term: 'Backblast',
    category: 'Culture',
    definition: 'The post-workout recap posted to Slack listing the PAX who showed up, what the Q put them through, and announcements.',
  },
  {
    term: 'Flapjack',
    category: 'Workout',
    definition: 'To switch roles with your partner (e.g., runner swaps with exerciser) or flip over from front to back during core work.',
  },
  {
    term: 'Sad Clown',
    category: 'Culture',
    definition: 'A man drifting through life isolated, unchallenged, and lacking real brotherhood. F3 exists to rescue Sad Clowns—starting with ourselves.',
  },
];

export const FEATURED_WORKOUT_FORMATS = [
  {
    name: 'Pearls on a String',
    tag: 'Classic Coastal Route',
    description: workoutStructureDescriptions['Pearls on a String'],
  },
  {
    name: 'D.O.R.A. (1-2-3)',
    tag: 'Partner Grinder',
    description: workoutStructureDescriptions['D.O.R.A. (1-2-3)'],
  },
  {
    name: '11s (Elevens) / 7s',
    tag: 'Hill & Bluff Staple',
    description: workoutStructureDescriptions['11s (Elevens) / 7s'],
  },
  {
    name: 'Ring of Fire (Circle of Pain)',
    tag: 'Brotherhood Pressure',
    description: workoutStructureDescriptions['Ring of Fire (Circle of Pain)'],
  },
  {
    name: "Jacob's Ladder",
    tag: 'Stadium & Stairs',
    description: workoutStructureDescriptions["Jacob's Ladder"],
  },
  {
    name: 'Deck of Death',
    tag: 'Random Chaos',
    description: workoutStructureDescriptions['Deck of Death'],
  },
  {
    name: 'Indian Run',
    tag: 'Pack Running',
    description: workoutStructureDescriptions['Indian Run'],
  },
  {
    name: 'Musical Beatdown — "Thunderstruck"',
    tag: 'Speaker Classic',
    description: musicalBeatdownDescriptions['"Thunderstruck" by AC/DC'],
  },
  {
    name: 'Musical Beatdown — "Flower"',
    tag: 'Isometric Burner',
    description: musicalBeatdownDescriptions['"Flower" by Moby'],
  },
];

export interface CuratedExerciseItem {
  name: string;
  phase: 'Warm-O-Rama' | 'The Thang' | 'Mary';
  difficulty: string;
  muscleGroups: string[];
  equipment: string[];
  description: string;
}

const savedNotes = savedNotesRaw as Record<string, { exerciseName?: string; note?: string; category?: string }>;

function lookupNote(name: string): string {
  const cleanId = name.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '_');
  if (savedNotes[cleanId]?.note) {
    return savedNotes[cleanId].note!;
  }
  return `Classic F3 movement performed in cadence or OYO (On Your Own). Modify pace and range of motion as needed.`;
}

const CURATED_MOVE_NAMES: { name: string; phase: 'Warm-O-Rama' | 'The Thang' | 'Mary' }[] = [
  { name: 'Side Straddle Hop', phase: 'Warm-O-Rama' },
  { name: 'Imperial Walker', phase: 'Warm-O-Rama' },
  { name: 'Windmill', phase: 'Warm-O-Rama' },
  { name: 'Good Morning', phase: 'Warm-O-Rama' },
  { name: 'Motivators', phase: 'Warm-O-Rama' },
  { name: 'Merkin', phase: 'The Thang' },
  { name: 'Burpee', phase: 'The Thang' },
  { name: 'Carolina Dry Dock', phase: 'The Thang' },
  { name: 'Bobby Hurley', phase: 'The Thang' },
  { name: 'Bear Crawl', phase: 'The Thang' },
  { name: 'Al Gore', phase: 'The Thang' },
  { name: "People's Chair", phase: 'The Thang' },
  { name: 'Lt. Dan', phase: 'The Thang' },
  { name: 'Mountain Climber', phase: 'The Thang' },
  { name: 'Hand Release Merkin', phase: 'The Thang' },
  { name: 'American Hammer', phase: 'Mary' },
  { name: 'LBC (Little Baby Crunch)', phase: 'Mary' },
  { name: 'Low Slow Flutter', phase: 'Mary' },
  { name: 'Hello Dolly', phase: 'Mary' },
  { name: 'Boat Canoe', phase: 'Mary' },
  { name: 'Homer to Marge', phase: 'Mary' },
];

export const CURATED_EXERCISES: CuratedExerciseItem[] = CURATED_MOVE_NAMES.map(({ name, phase }) => {
  const meta = exerciseMetadata[name] || {
    muscleGroup: ['Full Body'],
    equipment: ['None'],
    difficulty: 'Intermediate',
  };
  return {
    name,
    phase,
    difficulty: meta.difficulty,
    muscleGroups: meta.muscleGroup,
    equipment: meta.equipment,
    description: lookupNote(name),
  };
});

export const TOTAL_EXICON_COUNT =
  new Set([
    ...exerciseLibrary.warmup,
    ...exerciseLibrary.thang,
    ...exerciseLibrary.mary,
  ]).size;

export const LEADERSHIP_ROLES: LeadershipRole[] = [
  {
    id: 'nantan',
    title: "The Nant'an",
    badge: 'Regional Lead',
    category: 'Core',
    summary: 'Cultural & spiritual leader of an F3 region within our decentralized "starfish" model.',
    bullets: [
      'Inspired by decentralized Apache leadership structures described in The Starfish and the Spider.',
      'Serves the PAX first while taking ownership of regional health and alignment with the 5 Core Principles.',
      'Leads through VAPE: Vision, Articulation, Persuasion, and Exhortation—never command-and-control.',
      'Earned through demonstrated leadership, candor, and example rather than permanent hierarchy.',
    ],
  },
  {
    id: 'weasel-shaker',
    title: 'The Weasel Shaker',
    badge: 'COO / Operations',
    category: 'Core',
    summary: 'Operational manager who keeps the Central Coast engine running day to day.',
    bullets: [
      'Handles regional logistics, accountability, and behind-the-scenes execution.',
      '"Shakes the weasels"—keeps men accountable to commitments like showing up, Q’ing, and posting backblasts.',
      'Keeps a pulse on the PAX so no brother falls through the cracks.',
      'Partners closely with the Nant’an to sustain rhythm, consistency, and expansion.',
    ],
  },
  {
    id: 'first-f-q',
    title: '1st F Q (Fitness / "Magnet Man")',
    badge: 'SLT • Fitness',
    category: 'SLT',
    summary: 'Oversees workout quality, Q Schools, Site Qs, and special fitness challenges.',
    bullets: [
      'Supports Site Qs across Santa Barbara & Carpinteria so every beatdown hits hard and stays safe.',
      'Organizes Q Schools to train new leaders and plans CSAUPs (Completely Stupid and Utterly Pointless events).',
      'Drives fitness culture and helps launch new AOs along the coast.',
    ],
  },
  {
    id: 'second-f-q',
    title: '2nd F Q (Fellowship / "Mr. Party Pants")',
    badge: 'SLT • Fellowship',
    category: 'SLT',
    summary: 'Builds genuine male friendship outside the 45-minute workout window.',
    bullets: [
      'Organizes Coffeeteria meetups, happy hours, family gatherings, and coastal socials.',
      'Turns workout acquaintances into lifelong brothers who show up for each other.',
    ],
  },
  {
    id: 'third-f-q',
    title: '3rd F Q (Faith & Impact)',
    badge: 'SLT • Faith',
    category: 'SLT',
    summary: 'Channels our collective strength into serving our families and local community.',
    bullets: [
      'Coordinates community service projects, charity drives, and volunteer efforts across the Central Coast.',
      'Creates space for purpose-driven discussion and selfless leadership—welcoming men of all faiths and backgrounds.',
    ],
  },
  {
    id: 'site-q',
    title: 'Site Q / AO Q',
    badge: 'Front-Line Lead',
    category: 'AO',
    summary: 'The ambassador of a specific Area of Operation (SBCC Parking Lot or End of Linden Ave).',
    bullets: [
      'Welcomes every FNG with energy, ensures the 5 Core Principles are upheld, and keeps the Q calendar filled.',
      'Sets the tone for safety, backblasts, and a strong first impression every single week.',
    ],
  },
  {
    id: 'comz-expansion',
    title: 'Comz Q, Tech Q & Expansion Q',
    badge: 'Growth & Support',
    category: 'AO',
    summary: 'Keeps the drum beating across Slack, maps, and new Central Coast communities.',
    bullets: [
      'Comz Q keeps communication flowing on Slack and announcements so every PAX stays plugged in.',
      'Tech Q maintains digital tools, calendars, maps, and website resources.',
      'Expansion Q plants new AOs to bring F3 to more neighborhoods across the Central Coast.',
    ],
  },
];

export const COT_INTENTIONS = cotIntentions;

export const FNG_FAQS = [
  {
    q: 'Do I need to be in shape before my first workout?',
    a: 'No. That is literally the #1 myth keeping guys in bed. Every single exercise can be modified—walk instead of run, drop to knees on Merkins, scale reps as needed. You push yourself at your level, and fast guys always circle back to pick up the six.',
  },
  {
    q: 'Do I have to sign up, pay, or RSVP first?',
    a: 'Never. There are zero fees, zero memberships, and zero contracts. You can literally just show up 5 minutes early at SBCC Parking Lot or End of Linden Ave, introduce yourself as an FNG, and jump right in. Have questions beforehand? Email us anytime at F3CentralCoast@gmail.com.',
  },
  {
    q: 'Wait—what happens with the "F3 Name"?',
    a: 'At the end of your first beatdown during Circle of Trust, we ask a few fun questions about your background, job, hobbies, or hometown—and the PAX bestow your official F3 nickname. It is a rite of passage into the brotherhood (and always in good fun).',
  },
  {
    q: 'What does "Faith" mean? Is F3 a church group?',
    a: 'F3 is NOT tied to any specific religion, church, or denomination. By "Faith," we simply mean a belief in something outside of and bigger than yourself—serving your family, your brothers, and your community instead of living purely for yourself. Men of all beliefs and backgrounds stand shoulder-to-shoulder here.',
  },
  {
    q: 'What if it is raining, foggy, or freezing?',
    a: 'We post rain or shine! Unless there is active lightning or an unsafe emergency closure, the PAX are out in the gloom. Honestly, rainy morning beatdowns are the ones guys talk about for years.',
  },
  {
    q: 'What should I bring to my first beatdown?',
    a: 'Just athletic shoes, clothes you don’t mind getting sweaty or sandy, a water bottle, and a pair of cheap work/mechanics gloves if you want hand protection on asphalt. In winter dark mornings, a small headlamp or reflective shirt is great—never required.',
  },
];

/**
 * Returns the next upcoming Central Coast F3 workout session relative to now.
 */
export function getNextWorkoutSession(now: Date = new Date()): {
  session: WorkoutSession;
  label: string;
  daysAway: number;
} {
  // Use Pacific time components when available
  let currentDay = now.getDay();
  let currentMinutes = now.getHours() * 60 + now.getMinutes();

  try {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Los_Angeles',
      weekday: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).formatToParts(now);

    const dayMap: Record<string, number> = {
      Sun: 0,
      Mon: 1,
      Tue: 2,
      Wed: 3,
      Thu: 4,
      Fri: 5,
      Sat: 6,
    };
    const wd = parts.find((p) => p.type === 'weekday')?.value;
    const hr = parseInt(parts.find((p) => p.type === 'hour')?.value || '0', 10);
    const mn = parseInt(parts.find((p) => p.type === 'minute')?.value || '0', 10);
    if (wd && wd in dayMap) {
      currentDay = dayMap[wd];
      currentMinutes = (hr === 24 ? 0 : hr) * 60 + mn;
    }
  } catch {
    // Fallback to local clock
  }

  let bestSession = WEEKLY_SCHEDULE[0];
  let bestDeltaMinutes = Number.POSITIVE_INFINITY;
  let bestDaysAway = 0;

  for (const session of WEEKLY_SCHEDULE) {
    const sessionMins = session.startHour * 60 + session.startMinute;
    let dayDiff = (session.dayIndex - currentDay + 7) % 7;
    if (dayDiff === 0 && sessionMins <= currentMinutes) {
      dayDiff = 7;
    }
    const totalDelta = dayDiff * 24 * 60 + (sessionMins - currentMinutes);
    if (totalDelta < bestDeltaMinutes) {
      bestDeltaMinutes = totalDelta;
      bestSession = session;
      bestDaysAway = dayDiff;
    }
  }

  let label = `${bestSession.day.toUpperCase()} ${bestSession.timeLabel.split('–')[0].trim()}`;
  if (bestDaysAway === 0) {
    label = `TODAY • ${bestSession.timeLabel.split('–')[0].trim()}`;
  } else if (bestDaysAway === 1) {
    label = `TOMORROW • ${bestSession.timeLabel.split('–')[0].trim()}`;
  }

  return { session: bestSession, label, daysAway: bestDaysAway };
}

/**
 * Generates an .ics calendar file download for the chosen upcoming workout session.
 */
export function downloadWorkoutIcs(session: WorkoutSession) {
  const now = new Date();
  const nextDate = new Date(now);
  const currentDay = now.getDay();
  let dayDiff = (session.dayIndex - currentDay + 7) % 7;
  if (
    dayDiff === 0 &&
    now.getHours() * 60 + now.getMinutes() >= session.startHour * 60 + session.startMinute
  ) {
    dayDiff = 7;
  }
  nextDate.setDate(now.getDate() + dayDiff);
  nextDate.setHours(session.startHour, session.startMinute, 0, 0);

  const endDate = new Date(nextDate.getTime() + session.durationMins * 60 * 1000);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatLocal = (d: Date) =>
    `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Central Coast F3//Beatdown Schedule//EN',
    'BEGIN:VEVENT',
    `UID:${session.id}-${formatLocal(nextDate)}@f3centralcoast.com`,
    `DTSTAMP:${formatLocal(now)}`,
    `DTSTART:${formatLocal(nextDate)}`,
    `DTEND:${formatLocal(endDate)}`,
    `SUMMARY:Central Coast F3 Beatdown — ${session.aoName}`,
    `LOCATION:${session.address}`,
    `URL:${CENTRAL_COAST_LINKS.websiteUrl}`,
    `DESCRIPTION:${session.meetupDetails}\\n\\nFree, peer-led outdoor men's workout. Bring water, gloves (optional), and zero ego. Aye!\\nWebsite: ${CENTRAL_COAST_LINKS.websiteUrl}\\nContact: ${CENTRAL_COAST_LINKS.contactEmail}`,
    'BEGIN:VALARM',
    'TRIGGER:-PT30M',
    'ACTION:DISPLAY',
    'DESCRIPTION:Time to post in the gloom! Central Coast F3 starts in 30 minutes.',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `central-coast-f3-${session.day.toLowerCase()}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
