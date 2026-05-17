export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  thumbnail: string;
  category: "Residential" | "Commercial" | "Retail" | "Bespoke";
  tags: string[];
  year: string;
}

export interface Game {
  id: string;
  title: string;
  description: string;
  iframeUrl: string;
  appImageUrl: string;
  thumbnail: string;
  category: string;
  cover: string;
}

export const PROJECTS: Project[] = [
  {
    id: "koompi-academy",
    title: "KOOMPI Academy",
    description:
      "A premium, cinematic digital learning ecosystem engineered for the next generation of developers.",
    details:
      "Architected a hybrid SPA with an AI-generated curriculum, automated progress tracking via Supabase, and digital certificate minting through KOOMPI ID. Focused on creating a high-fidelity learning experience with smooth motion and robust backend orchestration.",
    thumbnail: "/koompi-academy.png",
    category: "Commercial",
    tags: ["React", "Supabase", "AI", "Node.js"],
    year: "2026",
  },
  {
    id: "digital-vault",
    title: "Digital Vault",
    description:
      "An interactive archive of browser-based games and creative coding experiments.",
    details:
      "Developed a centralized vault for experimental web games using TypeScript and Framer Motion. Implemented a flexible component-based architecture to support multiple game engines and input methods while maintaining a consistent cinematic aesthetic.",
    thumbnail: "/vault.png",
    category: "Retail",
    tags: ["TypeScript", "Framer Motion", "Game Dev"],
    year: "2025",
  },
  {
    id: "portfolio-v1",
    title: "Personal Portfolio",
    description:
      "A minimalist, high-performance developer portfolio built with a focus on typography and digital optics.",
    details:
      "Crafted a bespoke portfolio using Vite and Tailwind CSS. Integrated smooth scrolling (Lenis) and staggered animations to create a tactile, immersive user experience that showcases technical work through a cinematic lens.",
    thumbnail: "/portfolio.png",
    category: "Bespoke",
    tags: ["Vite", "Tailwind CSS", "UI/UX"],
    year: "2026",
  },
];

export const GAMES: Game[] = [
  {
    id: "TypingCode",
    title: "Typing Code",
    description:
      "The classic typing code game. Type the code word of programing language you would like to learn! Type the code correctly to keep the game going!",
    iframeUrl: "https://typing-code-game.vercel.app",
    appImageUrl:
      "https://drive.google.com/file/d/1l1rA29APscP38-PhAwd84miuwOQCI2-K/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-typing-code.png",
    thumbnail: "/game-cover/typing-code.png",
    category: "typing",
  },
  {
    id: "TypingMath",
    title: "Typing Math",
    description:
      "The classic typing math game. Thinking fast and typing the number correctly to keep the game going!",
    iframeUrl: "https://typing-math-game.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1crkVv9NvpqEmCwA10r-k2Bwr6ouEcj_-/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-typing-math.png",
    thumbnail: "/game-cover/typing-math.png",
    category: "typing",
  },
  {
    id: "dragon-drop",
    title: "Dragon Drop",
    description:
      "A fun and addictive game where you control a dragon to catch falling objects. Test your reflexes and see how long you can survive!",
    iframeUrl: "https://dragon-drop-iota.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1DHNe44e70h0XjSHZemLClLWw0A2l88uh/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-dragon-drop.png",
    thumbnail: "/game-cover/dragon-drop.png",
    category: "mouse",
  },
  {
    id: "RobotObstacle",
    title: "Robot Obstacle",
    description:
      "An action-packed puzzle game where you guide a brilliant robot through challenging brain-teasing challenges. Solve puzzles, navigate obstacles, and push your strategy skills to the limit!",
    iframeUrl: "https://robot-brainiac.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1fnc-RCf242B9dC5a516VlFERCZ_HVJzi/view?usp=sharing",
    cover: "/game-cover/inside-game/inside-robot-obstacle.png",
    thumbnail: "/game-cover/robot-obstacle.png",
    category: "Action",
  },
  {
    id: "MasterMouse",
    title: "Master Mouse",
    description:
      "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://master-mouse-v1-1-0.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/1lwv8tyf_UsuwLATV6OxoJW1Tewy9GLEg/view?usp=drive_link",
    cover: "/game-cover/inside-game/inside-master-mouse.png",
    thumbnail: "/game-cover/master-mouse.png",
    category: "mouse",
  },
  {
    id: "LinkNumber",
    title: "Link Number",
    description: "A thrilling mouse-controlled game where you navigate a clever mouse through intricate mazes and challenges. Test your reflexes and problem-solving skills!",
    iframeUrl: "https://link-number.vercel.app/",
    appImageUrl:
      "https://drive.google.com/file/d/162FfIfjRK249uDLKwHkaBS-JfbwFXwZI/view?usp=sharing",
    thumbnail: "/game-cover/link-number.png",
    cover: "/game-cover/inside-game/inside-link-number.png",
    category: "puzzle",
  },
];

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  iconName: string;
  logo: string;
  gradient: string;
  textgradient: string;
  level: string;
  lessons: Lesson[];
}

export const TOPICS: Topic[] = [
  {
    id: "computer-foundation",
    title: "Foundation",
    description: "Master the essential digital skills: from Linux terminal navigation to professional file management and typing proficiency.",
    iconName: "Monitor",
    logo: "/program-logo/linux.png", // Assuming this exists or using a fallback
    gradient: "from-slate-500/20 to-slate-200/5",
    textgradient: "bg-gradient-to-br from-slate-400 to-slate-700 bg-clip-text text-transparent inline-block",
    level: "Recomend ",
    lessons: [
      { id: "computer-foundation-readme", title: "Introduction", description: "Track 00 overview and certification requirements.", duration: "10 mins" },
      { id: "computer-foundation-module03linuxterminal", title: "Linux Terminal", description: "Learn to navigate and control your system using the command line.", duration: "45 mins" },
      { id: "computer-foundation-module04filemanagement", title: "File Management", description: "Organize your projects and files like a professional developer.", duration: "45 mins" },
    ],
  },
  {
    id: "html",
    title: "HTML",
    description: "The standard markup language for creating web pages. Learn how to structure content, build forms, add media, and create the skeleton of every website.",
    iconName: "LayoutTemplate",
    logo: "/program-logo/html.png",
    gradient: "from-orange-500/20 to-orange-200/5",
    textgradient: "bg-gradient-to-br from-orange-500 to-red-500 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "html-readme", title: "Introduction", description: "Course overview, learning objectives, and resources.", duration: "10 mins" },
      { id: "html-module01gettingstarted", title: "Getting Started", description: "Set up your environment and write your first HTML document.", duration: "30 mins" },
      { id: "html-module02documentstructure", title: "Document Structure", description: "Understand DOCTYPE, head, body, and semantic layout elements.", duration: "40 mins" },
      { id: "html-module03textandlists", title: "Text and Lists", description: "Work with headings, paragraphs, ordered and unordered lists.", duration: "35 mins" },
      { id: "html-module04linksnavigation", title: "Links & Navigation", description: "Create hyperlinks, anchor navigation, and multi-page sites.", duration: "40 mins" },
      { id: "html-module05imagesmedia", title: "Images & Media", description: "Embed images, video, audio, and responsive media elements.", duration: "45 mins" },
      { id: "html-module06tablesforms", title: "Tables & Forms", description: "Build data tables and interactive input forms with validation.", duration: "1 hr" },
      { id: "html-module07projectbiopage", title: "Project — Bio Page", description: "Build a complete personal bio page using all HTML skills.", duration: "1.5 hrs" },
    ],
  },
  {
    id: "css",
    title: "CSS",
    description: "Style sheet language for describing the presentation of HTML documents. Master selectors, the box model, Flexbox, and responsive design principles.",
    iconName: "Paintbrush",
    logo: "/program-logo/css.png",
    gradient: "from-blue-500/20 to-blue-200/5",
    textgradient: "bg-gradient-to-br from-blue-400 to-blue-700 bg-clip-text text-transparent inline-block",
    level: "Beginner",
    lessons: [
      { id: "css-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "css-module01introductioncss", title: "Introduction to CSS", description: "Selectors, properties, values, and how to link stylesheets.", duration: "35 mins" },
      { id: "css-module02selectorsspecificity", title: "Selectors & Specificity", description: "Class, ID, pseudo-class selectors and the cascade.", duration: "45 mins" },
      { id: "css-module03colorstypography", title: "Colors & Typography", description: "Color systems, Google Fonts, line-height, and font stacks.", duration: "40 mins" },
      { id: "css-module04boxmodel", title: "The Box Model", description: "Margin, padding, border, and how browsers compute layout.", duration: "40 mins" },
      { id: "css-module05layoutpositioning", title: "Layout & Positioning", description: "Static, relative, absolute, fixed, and sticky positioning.", duration: "50 mins" },
      { id: "css-module06flexboxresponsive", title: "Flexbox & Responsive", description: "Flex containers, media queries, and mobile-first design.", duration: "1 hr" },
      { id: "css-module07projectportfolio", title: "Project — Portfolio", description: "Style a complete portfolio page using real-world CSS.", duration: "1.5 hrs" },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript",
    description: "The language of the web. Learn variables, functions, arrays, loops, and DOM manipulation to make websites interactive and dynamic.",
    iconName: "Code2",
    logo: "/program-logo/javascript.png",
    gradient: "from-yellow-400/20 to-yellow-100/5",
    textgradient: "bg-gradient-to-br from-yellow-300 to-amber-300 bg-clip-text text-transparent inline-block",

    level: "Intermediate",
    lessons: [
      { id: "javascript-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "javascript-module01introduction", title: "Introduction to JS", description: "What JavaScript is, how browsers run it, and your first script.", duration: "30 mins" },
      { id: "javascript-module02variablesdatatypes", title: "Variables & Data Types", description: "let, const, strings, numbers, booleans, arrays, and objects.", duration: "50 mins" },
      { id: "javascript-module03operatorsconditions", title: "Operators & Conditions", description: "Arithmetic, comparison, logical operators, and if/else chains.", duration: "45 mins" },
      { id: "javascript-module04functions", title: "Functions", description: "Declarations, expressions, arrow functions, and scope.", duration: "1 hr" },
      { id: "javascript-module05arraysloops", title: "Arrays & Loops", description: "for, while, forEach, map, filter, and array methods.", duration: "1 hr" },
      { id: "javascript-module06dommanipulation", title: "DOM Manipulation", description: "Query elements, handle events, and update the page dynamically.", duration: "1.5 hrs" },
      { id: "javascript-module07projectquiz", title: "Project — Quiz App", description: "Build a fully interactive quiz using all JS fundamentals.", duration: "2 hrs" },
    ],
  },
  {
    id: "javascript-advanced",
    title: "JS Advanced",
    description: "Go deeper into JavaScript with ES6+ features, asynchronous programming, REST APIs, and professional error handling patterns.",
    iconName: "Zap",
    logo: "/program-logo/javascript.png",
    gradient: "from-amber-400/20 to-amber-100/5",
    textgradient: "bg-gradient-to-br from-yellow-400 to-amber-500 bg-clip-text text-transparent inline-block",

    level: "Intermediate",
    lessons: [
      { id: "javascript-advanced-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "javascript-advanced-module01es6features", title: "ES6+ Features", description: "Destructuring, spread, template literals, and modern syntax.", duration: "1 hr" },
      { id: "javascript-advanced-module02asyncjavascript", title: "Async JavaScript", description: "Callbacks, Promises, async/await, and the event loop.", duration: "1.5 hrs" },
      { id: "javascript-advanced-module03workingapis", title: "Working with APIs", description: "Fetch API, REST principles, JSON, and real-world data.", duration: "1 hr" },
      { id: "javascript-advanced-module04errorhandling", title: "Error Handling", description: "try/catch, custom errors, and defensive programming.", duration: "45 mins" },
      { id: "javascript-advanced-module05projectweather", title: "Project — Weather App", description: "Build a live weather app using a public API.", duration: "2 hrs" },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub",
    description: "Version control is a superpower. Learn Git fundamentals, branching, merging, and how to collaborate with teams using GitHub.",
    iconName: "GitBranch",
    logo: "/program-logo/git.png",
    gradient: "from-red-500/20 to-red-200/5",
    textgradient: "bg-gradient-to-br from-gray-400 to-gray-800 bg-clip-text text-transparent inline-block",

    level: "Beginner",
    lessons: [
      { id: "git-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "git-module01introductiongit", title: "Introduction to Git", description: "What version control is, installing Git, and basic concepts.", duration: "30 mins" },
      { id: "git-module02basiccommands", title: "Basic Commands", description: "init, add, commit, status, log — the daily Git workflow.", duration: "45 mins" },
      { id: "git-module03githubremotes", title: "GitHub & Remotes", description: "Push, pull, clone, and manage remote repositories on GitHub.", duration: "50 mins" },
      { id: "git-module04collaboration", title: "Collaboration", description: "Branching, merging, pull requests, and resolving conflicts.", duration: "1 hr" },
    ],
  },
  {
    id: "react",
    title: "React",
    description: "A powerful UI library for building component-based interfaces. Learn props, state, hooks, routing, and build real applications.",
    iconName: "AppWindow",
    logo: "/program-logo/react.png",
    gradient: "from-cyan-500/20 to-cyan-200/5",
    textgradient: "bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text text-transparent inline-block",

    level: "Advanced",
    lessons: [
      { id: "react-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "react-module01introduction", title: "Introduction to React", description: "What React is, JSX syntax, and how components work.", duration: "40 mins" },
      { id: "react-module02componentsprops", title: "Components & Props", description: "Reusable components, prop passing, and component trees.", duration: "50 mins" },
      { id: "react-module03stateevents", title: "State & Events", description: "useState, event handling, and controlled components.", duration: "1 hr" },
      { id: "react-module04hooks", title: "React Hooks", description: "useEffect, useRef, useContext, and custom hooks.", duration: "1.5 hrs" },
      { id: "react-module05reactrouter", title: "React Router", description: "Client-side routing, nested routes, and dynamic params.", duration: "1 hr" },
      { id: "react-module06projecttaskmanager", title: "Project — Task Manager", description: "Build a full CRUD task manager with state management.", duration: "2 hrs" },
    ],
  },
  {
    id: "nextjs",
    title: "Next.js",
    description: "The React framework for production. Learn server-side rendering, file-based routing, API routes, Tailwind CSS, and deployment.",
    iconName: "Server",
    logo: "/program-logo/nextjs.png",
    gradient: "from-slate-400/20 to-slate-200/5",
    textgradient: "bg-gradient-to-br from-gray-900 to-gray-300 bg-clip-text text-transparent inline-block",

    level: "Advanced",
    lessons: [
      { id: "nextjs-readme", title: "Introduction", description: "Course overview, objectives, and supplemental resources.", duration: "10 mins" },
      { id: "nextjs-module01introductionnextjs", title: "Introduction to Next.js", description: "Pages router, SSR vs SSG, and the Next.js project structure.", duration: "45 mins" },
      { id: "nextjs-module02tailwindcss", title: "Tailwind CSS", description: "Utility-first CSS, configurations, and responsive design.", duration: "1 hr" },
      { id: "nextjs-module03datafetching", title: "Data Fetching", description: "getStaticProps, getServerSideProps, SWR, and data patterns.", duration: "1 hr" },
      { id: "nextjs-module04apiroutes", title: "API Routes", description: "Building serverless API endpoints inside Next.js.", duration: "50 mins" },
      { id: "nextjs-module05deployment", title: "Deployment", description: "Deploy to Vercel, environment variables, and CI/CD basics.", duration: "45 mins" },
      { id: "nextjs-module06projectecommerce", title: "Project — E-commerce", description: "Build a full-stack e-commerce store with Next.js.", duration: "3 hrs" },
    ],
  },
];

export const categories = [
  {
    name: "All Team",
    moments: [
      // { title: "Rithy THOUL", role: "Promoter && Connection", description: "CEO of KOOMPI", image: "../public/team/rithy-thul.png" },
      // { title: "Brilliant PHAL", role: "OS Lead", description: "OS Lead", image: "../public/team/brilliant.jpg" },
      // { title: "Vuthy SAN", role: "Developer", description: "Web Apps Dev Lead", image: "../public/team/vuthy.jpg" },
      // { title: "Raksme VEN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/raksme.jpg" },
      // { title: "Sukunthy CHAN", role: "Bussiness ", description: "Finance & Vendor Relation", image: "../public/team/sukunthy.png" },
      // { title: "Sela THOL", role: "Bussiness", description: "Media and Communicaiton Manager", image: "../public/team/sela.jpg" },
      // { title: "Theara THEN", role: "Developer & Bussiness", description: "Developer & Social Marketing & Sales", image: "../public/team/theara.jpg" },
      // { title: "Thith THIN", role: "Developer", description: "Fulll Stack Developer", image: "../public/team/thith.jpg" },
      // { title: "Hangsea HONG", role: "DevOps", description: "OS Developer", image: "../public/team/hangsea.jpg" },
      // { title: "Sokunsamnang SAM AN", role: "Developer", description: "Network Devs & Mobile Application ", image: "../public/team/samnang.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
      // { title: "", role: "", description: "", image: "../public/team/raksme.jpg" },
    ]
  },
  {
    name: "Developers",
    moments: [
      { title: "Sivchheng Kheang", role: "Technical Lead", description: "Architecting the technical core and high-performance visions.", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
      { title: "Long Sei", role: "DevOps Engineer", description: "Optimizing cloud orchestration and system deployment cycles.", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Designers",
    moments: [
      { title: "Dara Som", role: "UI/UX Engineer", description: "Refining visual optics and interactive design protocols.", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
    ]
  },
  {
    name: "Apprentice",
    moments: [
      { title: "Sivchheng Kheang", role: "Developer", description: "Learning and building Full-Stack applications.", image: "/team/sivchheng.jpg" },
      { title: "Keochheang THON", role: "Designer", description: "Visual and UI/UX Designer.", image: "/team/keochheang.jpg" },
      { title: "Narith CHOM", role: "Developer", description: "Software Developer.", image: "/team/narith.jpg" },
      { title: "Sisuykong Sao ", role: "Developer", description: "Software Developer.", image: "/team/sisuykong.jpg" },
    ]
  }
];