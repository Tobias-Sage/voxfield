export type CourseCategory = "表达结构" | "声音呈现" | "现场影响" | "商业场景";

export type Course = {
  id: string;
  category: CourseCategory;
  level: "入门" | "进阶" | "实战";
  title: string;
  description: string;
  duration: string;
  lessons: number;
  outcome: string;
};

export type Insight = {
  id: string;
  category: "表达方法" | "声音训练" | "场景拆解";
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
    category: "表达结构",
    level: "入门",
    title: "开口 30 秒，先让人愿意听",
    description: "拆掉冗长铺垫，用问题、冲突和结论建立清晰开场。",
    duration: "52 分钟",
    lessons: 6,
    outcome: "完成一段可复用的三分钟开场",
  },
  {
    id: "logic-map",
    category: "表达结构",
    level: "进阶",
    title: "一页纸表达地图",
    description: "把复杂信息压缩成主张、证据与行动，让听众跟得上。",
    duration: "74 分钟",
    lessons: 8,
    outcome: "独立完成汇报结构草图",
  },
  {
    id: "voice-rhythm",
    category: "声音呈现",
    level: "入门",
    title: "声音节奏与停顿",
    description: "通过气息、重音与留白，告别平铺直叙和越讲越快。",
    duration: "61 分钟",
    lessons: 7,
    outcome: "形成自然、有重点的表达节奏",
  },
  {
    id: "stage-presence",
    category: "现场影响",
    level: "进阶",
    title: "站上台，就有存在感",
    description: "练习视线、站姿与手势，让身体和内容指向同一个重点。",
    duration: "88 分钟",
    lessons: 9,
    outcome: "掌握稳定、克制的舞台动作系统",
  },
  {
    id: "qa-control",
    category: "现场影响",
    level: "实战",
    title: "高压问答不失控",
    description: "识别问题意图、搭建回应边界，在追问中保持清晰与可信。",
    duration: "46 分钟",
    lessons: 5,
    outcome: "完成五类尖锐问题回应脚本",
  },
  {
    id: "business-pitch",
    category: "商业场景",
    level: "实战",
    title: "让提案更像一个决定",
    description: "从客户问题出发组织方案、证据与下一步，减少无效堆料。",
    duration: "96 分钟",
    lessons: 10,
    outcome: "完成一套十分钟商业提案",
  },
  {
    id: "manager-briefing",
    category: "商业场景",
    level: "进阶",
    title: "管理者的五分钟汇报",
    description: "用结论先行与风险分层，在有限时间里推动协作。",
    duration: "67 分钟",
    lessons: 7,
    outcome: "把周报升级为决策型汇报",
  },
  {
    id: "story-data",
    category: "表达结构",
    level: "实战",
    title: "把数据讲成行动",
    description: "选择关键对比、解释变化原因，让图表服务于判断。",
    duration: "82 分钟",
    lessons: 8,
    outcome: "重构一段数据分析演示",
  },
];

export const insights: Insight[] = [
  {
    id: "structure-before-slides",
    category: "表达方法",
    title: "别急着做 PPT：先写下这三个句子",
    excerpt: "一场清晰汇报，往往在打开幻灯片软件之前就已经决定了。",
    readTime: "6 分钟",
    accent: "amber",
  },
  {
    id: "pause-is-signal",
    category: "声音训练",
    title: "停顿不是忘词，而是给重点让路",
    excerpt: "把停顿设计在观点前后，听众会更容易捕捉你的判断。",
    readTime: "5 分钟",
    accent: "blue",
  },
  {
    id: "answer-hostile-question",
    category: "场景拆解",
    title: "面对尖锐追问，先回答哪一层？",
    excerpt: "先确认问题，再选择回应边界，比立即辩解更能建立可信度。",
    readTime: "8 分钟",
    accent: "cream",
  },
  {
    id: "three-minute-opening",
    category: "表达方法",
    title: "三分钟发言，开场只做一件事",
    excerpt: "不是介绍所有背景，而是让听众知道这件事为什么与他有关。",
    readTime: "4 分钟",
    accent: "blue",
  },
  {
    id: "steady-voice",
    category: "声音训练",
    title: "紧张时声音发飘，先别练音量",
    excerpt: "从呼气长度和句尾稳定开始，比一味提高音量更有效。",
    readTime: "7 分钟",
    accent: "amber",
  },
  {
    id: "pitch-case",
    category: "场景拆解",
    title: "一次失败提案，通常不是输在方案",
    excerpt: "当信息顺序忽略客户决策过程，再完整的方案也会显得遥远。",
    readTime: "9 分钟",
    accent: "cream",
  },
];

export const plans: Plan[] = [
  {
    name: "基础表达会员",
    eyebrow: "从清晰开始",
    monthly: 69,
    annual: 588,
    description: "适合希望系统改善汇报、发言与日常沟通的学习者。",
    features: [
      "全部基础与进阶录播课程",
      "每周一份表达练习任务",
      "演讲结构模板资料库",
      "学习进度与练习记录",
    ],
  },
  {
    name: "现场影响会员",
    eyebrow: "把能力带到台上",
    monthly: 159,
    annual: 1428,
    description: "适合管理者、销售、讲师和高频公开表达者。",
    featured: true,
    features: [
      "包含基础表达会员全部内容",
      "商业路演与高压问答课程",
      "每月两次线上案例拆解",
      "个人演讲复盘清单",
      "新课程优先体验",
    ],
  },
];

export const testimonials = [
  {
    quote: "以前我总想把信息讲全，现在会先判断：听众此刻最需要做什么决定。",
    name: "林澈",
    role: "消费品牌策略经理",
  },
  {
    quote: "声音训练不是让我变得夸张，而是让我在紧张时也能把一句话说完整。",
    name: "周默",
    role: "科技公司产品负责人",
  },
  {
    quote: "提案结构重排之后，客户第一次在现场主动讨论了下一步，而不是继续问背景。",
    name: "高屿",
    role: "独立咨询顾问",
  },
];

export const faqs = [
  {
    question: "完全没有演讲经验，可以开始吗？",
    answer:
      "可以。基础路径从短表达、结构和声音稳定开始，不要求舞台经验。每节课都配有可在工作中直接完成的小练习。",
  },
  {
    question: "课程更适合职场还是正式演讲？",
    answer:
      "两者都会覆盖。训练方法围绕会议发言、工作汇报、提案路演和公开分享四类常见场景展开。",
  },
  {
    question: "会员按钮会产生真实扣费吗？",
    answer:
      "不会。本网站为案例学习项目，价格、会员与提交反馈均为前端交互演示，不连接支付或账户系统。",
  },
  {
    question: "如何知道自己应该从哪门课开始？",
    answer:
      "可以先在课程页按场景筛选，也可以通过联系页提交你的目标，演示表单会给出本地成功反馈。",
  },
];
