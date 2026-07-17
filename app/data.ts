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
  summary: string;
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
    summary:
      "Write the decision, the reason it matters, and the next action before building a single slide. Those three sentences become a filter for every chart, story, and supporting detail that follows.",
    readTime: "6 min read",
    accent: "amber",
  },
  {
    id: "pause-is-signal",
    category: "Voice Training",
    title: "A Pause Is Not a Mistake. It Is a Signal.",
    excerpt: "Place silence around your key point and the audience will find it more easily.",
    summary:
      "A purposeful pause gives listeners time to process an idea and tells them what deserves attention. Mark one beat before the key sentence and another after it, then let the silence do part of the work.",
    readTime: "5 min read",
    accent: "blue",
  },
  {
    id: "answer-hostile-question",
    category: "Scenario Breakdown",
    title: "What Should You Answer First in a Difficult Q&A?",
    excerpt: "Confirm the question, then choose the response boundary before you start defending the details.",
    summary:
      "Begin by naming the concern you heard, then answer the part you can resolve clearly. This keeps the exchange focused, prevents defensive overexplaining, and creates a credible path to the next question.",
    readTime: "8 min read",
    accent: "cream",
  },
  {
    id: "three-minute-opening",
    category: "Communication",
    title: "A Three-Minute Talk Needs Only One Job at the Start",
    excerpt: "Do not explain every detail. Show the audience why this matters to them now.",
    summary:
      "Use the opening to establish relevance, not to deliver the full background. A clear audience problem and one focused promise create enough momentum for the rest of a short talk.",
    readTime: "4 min read",
    accent: "blue",
  },
  {
    id: "steady-voice",
    category: "Voice Training",
    title: "When Nerves Shake Your Voice, Start With the Exhale",
    excerpt: "A longer exhale and steady sentence ending work better than simply getting louder.",
    summary:
      "Release the breath before your first sentence, slow the final five words, and finish the thought before inhaling again. The goal is not a bigger voice—it is a steadier one.",
    readTime: "7 min read",
    accent: "amber",
  },
  {
    id: "pitch-case",
    category: "Scenario Breakdown",
    title: "A Failed Pitch Is Rarely Just a Weak Idea",
    excerpt: "Even a strong proposal feels distant when its order ignores the client's decision process.",
    summary:
      "Reorder the pitch around the client's questions: what is changing, why now, what the solution unlocks, and what decision comes next. Strong ideas become persuasive when the sequence matches how people evaluate them.",
    readTime: "9 min read",
    accent: "cream",
  },
];

export const plans: Plan[] = [
  {
    name: "Essential Speaker",
    eyebrow: "Start with clarity",
    monthly: 19.99,
    annual: 191.9,
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
    monthly: 49.99,
    annual: 479.9,
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
    question: "Can I change or cancel my plan later?",
    answer:
      "Yes. Contact support@voxfield.top before your next billing date and our team will help you change or cancel your plan.",
  },
  {
    question: "How do I know which course to start with?",
    answer:
      "Filter the course library by your current scenario, or share your goal through the contact page and the Voxfield team will recommend a starting point.",
  },
];
