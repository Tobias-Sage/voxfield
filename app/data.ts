export type CourseCategory = "Structure" | "Voice" | "Presence" | "Business";

export type Course = {
  id: string;
  category: CourseCategory;
  level: "Foundation" | "Advanced" | "Applied";
  title: string;
  description: string;
  duration: string;
  lessons: number;
  outcome: string;
};

export type Insight = {
  id: string;
  category: "Communication" | "Voice Training" | "Scenario Breakdown";
  title: string;
  excerpt: string;
  readTime: string;
  accent: "amber" | "blue" | "cream";
};

export type Plan = {
  name: string;
  eyebrow: string;
  monthly: number;
  annual: number;
  description: string;
  featured?: boolean;
  features: string[];
};

export const courses: Course[] = [
  {
    id: "clear-opening",
    category: "Structure",
    level: "Foundation",
    title: "Open Strong in 30 Seconds",
    description: "Replace long introductions with a clear tension, question, and point of view.",
    duration: "52 minutes",
    lessons: 6,
    outcome: "Build a reusable three-minute opening",
  },
  {
    id: "logic-map",
    category: "Structure",
    level: "Advanced",
    title: "The One-Page Message Map",
    description: "Compress complex information into a claim, evidence, and next step your audience can follow.",
    duration: "74 minutes",
    lessons: 8,
    outcome: "Create a complete briefing outline",
  },
  {
    id: "voice-rhythm",
    category: "Voice",
    level: "Foundation",
    title: "Pace, Pause, and Vocal Control",
    description: "Use breath, emphasis, and silence to move beyond a flat delivery or rushed pace.",
    duration: "61 minutes",
    lessons: 7,
    outcome: "Develop a natural rhythm with clear emphasis",
  },
  {
    id: "stage-presence",
    category: "Presence",
    level: "Advanced",
    title: "Own the Room Without Overacting",
    description: "Align eye contact, posture, and gestures so your body supports the message.",
    duration: "88 minutes",
    lessons: 9,
    outcome: "Build a calm, intentional stage-movement system",
  },
  {
    id: "qa-control",
    category: "Presence",
    level: "Applied",
    title: "Stay Clear Under Pressure",
    description: "Read the intent behind questions, set response boundaries, and remain credible in follow-ups.",
    duration: "46 minutes",
    lessons: 5,
    outcome: "Draft responses to five difficult question types",
  },
  {
    id: "business-pitch",
    category: "Business",
    level: "Applied",
    title: "Pitch Toward a Decision",
    description: "Organize the problem, proof, proposal, and next step around how clients decide.",
    duration: "96 minutes",
    lessons: 10,
    outcome: "Complete a ten-minute business pitch",
  },
  {
    id: "manager-briefing",
    category: "Business",
    level: "Advanced",
    title: "The Five-Minute Executive Update",
    description: "Lead with the decision and layer risk so limited meeting time produces action.",
    duration: "67 minutes",
    lessons: 7,
    outcome: "Turn a status update into a decision briefing",
  },
  {
    id: "story-data",
    category: "Structure",
    level: "Applied",
    title: "Turn Data Into Action",
    description: "Choose the right comparison and explain change so charts support judgment.",
    duration: "82 minutes",
    lessons: 8,
    outcome: "Rebuild a data presentation around one decision",
  },
];

export const insights: Insight[] = [
  {
    id: "structure-before-slides",
    category: "Communication",
    title: "Before You Open the Slides, Write These Three Sentences",
    excerpt: "A clear briefing is usually decided before the presentation software ever opens.",
    readTime: "6 min read",
    accent: "amber",
  },
  {
    id: "pause-is-signal",
    category: "Voice Training",
    title: "A Pause Is Not a Mistake. It Is a Signal.",
    excerpt: "Place silence around your key point and the audience will find it more easily.",
    readTime: "5 min read",
    accent: "blue",
  },
  {
    id: "answer-hostile-question",
    category: "Scenario Breakdown",
    title: "What Should You Answer First in a Difficult Q&A?",
    excerpt: "Confirm the question, then choose the response boundary before you start defending the details.",
    readTime: "8 min read",
    accent: "cream",
  },
  {
    id: "three-minute-opening",
    category: "Communication",
    title: "A Three-Minute Talk Needs Only One Job at the Start",
    excerpt: "Do not explain every detail. Show the audience why this matters to them now.",
    readTime: "4 min read",
    accent: "blue",
  },
  {
    id: "steady-voice",
    category: "Voice Training",
    title: "When Nerves Shake Your Voice, Start With the Exhale",
    excerpt: "A longer exhale and steady sentence ending work better than simply getting louder.",
    readTime: "7 min read",
    accent: "amber",
  },
  {
    id: "pitch-case",
    category: "Scenario Breakdown",
    title: "A Failed Pitch Is Rarely Just a Weak Idea",
    excerpt: "Even a strong proposal feels distant when its order ignores the client's decision process.",
    readTime: "9 min read",
    accent: "cream",
  },
];

export const plans: Plan[] = [
  {
    name: "Essential Speaker",
    eyebrow: "Start with clarity",
    monthly: 12,
    annual: 108,
    description: "For professionals who want stronger briefings, presentations, and everyday communication.",
    features: [
      "All foundation and advanced video lessons",
      "One guided speaking drill each week",
      "Message maps and presentation templates",
      "Progress and practice tracking",
    ],
  },
  {
    name: "Stage Influence",
    eyebrow: "Bring your skills into the room",
    monthly: 29,
    annual: 264,
    description: "For managers, sales teams, trainers, and frequent public speakers.",
    featured: true,
    features: [
      "Everything in Essential Speaker",
      "Pitching and high-pressure Q&A courses",
      "Two live case breakdowns each month",
      "Personal presentation review checklist",
      "Early access to new courses",
    ],
  },
];

export const testimonials = [
  {
    quote: "I used to include every detail. Now I first ask: what decision does the audience need to make next?",
    name: "Maya Chen",
    role: "Brand Strategy Lead",
  },
  {
    quote: "The voice work did not make me louder. It helped me finish a thought clearly, even when I felt nervous.",
    name: "Ethan Zhou",
    role: "Product Director",
  },
  {
    quote: "After restructuring the pitch, the client discussed next steps in the room instead of asking for more background.",
    name: "Grace Gao",
    role: "Independent Consultant",
  },
];

export const faqs = [
  {
    question: "Can I start with no public-speaking experience?",
    answer:
      "Absolutely. The foundation track begins with short messages, structure, and vocal steadiness. Every lesson includes a small exercise you can use at work right away.",
  },
  {
    question: "Is this for workplace communication or formal speeches?",
    answer:
      "Both. The training covers meeting contributions, work updates, business pitches, and public presentations.",
  },
  {
    question: "Will the membership buttons charge me?",
    answer:
      "No. This is a case-study website. Pricing, membership, and form submissions are local interface demos with no payment or account connection.",
  },
  {
    question: "How do I know which course to start with?",
    answer:
      "Filter the course library by your current scenario, or submit your goal through the contact page. The demo form will confirm your entry locally.",
  },
];
