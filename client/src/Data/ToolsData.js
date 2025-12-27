const toolsData = [
  // ====================
  // 1. FITNESS + FINANCE (The "FitFinTech" Specials)
  // ====================
  {
    id: "tool-1",
    title: "Fitness + Finance Calculator",
    category: "Lifestyle",
    description: "The ultimate tool. Track your BMI alongside your monthly savings goals to see true growth.",
    link: "/tools/fit-fin-calculator",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: "tool-2",
    title: "Daily Calorie + Budget Planner",
    category: "Lifestyle",
    description: "Manage your daily food intake and daily spending limit in one simple view.",
    link: "/tools/calorie-budget-planner",
    image: "https://images.unsplash.com/photo-1512358958014-b651a7ee1773?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: "tool-3",
    title: "Body Fat % + Expense Tracker",
    category: "Lifestyle",
    description: "Monitor your physical stats while tracking where your money goes every month.",
    link: "/tools/fat-expense-tracker",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-4",
    title: "Healthy Lifestyle Savings",
    category: "Lifestyle",
    description: "Calculate how much money you save by quitting bad habits (smoking, junk food, etc).",
    link: "/tools/lifestyle-savings",
    image: "https://images.unsplash.com/photo-1554224154-260312c00e48?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false
  },

  // ====================
  // 2. WEALTH TOOLS (Finance)
  // ====================
  {
    id: "tool-5",
    title: "SIP Calculator",
    category: "Finance",
    description: "Estimate the future value of your monthly mutual fund investments.",
    link: "/tools/sip-calculator",
    image: "https://images.unsplash.com/photo-1611974765270-ca12586343bb?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: "tool-6",
    title: "Lumpsum Calculator",
    category: "Finance",
    description: "Calculate the returns on a one-time investment over a specific period.",
    link: "/tools/lumpsum-calculator",
    image: "https://images.unsplash.com/photo-1565514020176-db79339a6a5d?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-7",
    title: "Retirement Calculator",
    category: "Finance",
    description: "Find out how much you need to save today for a stress-free retirement.",
    link: "/tools/retirement-calculator",
    image: "https://images.unsplash.com/photo-1532619187608-e5375cabadaf?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-8",
    title: "Net-Worth Calculator",
    category: "Finance",
    description: "Calculate your total financial health by subtracting liabilities from assets.",
    link: "/tools/net-worth",
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-9",
    title: "EMI Calculator",
    category: "Finance",
    description: "Calculate your monthly EMI for Home, Car, or Personal loans.",
    link: "/tools/emi-calculator",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: "tool-10",
    title: "FIRE Calculator",
    category: "Finance",
    description: "Plan your Financial Independence and Retire Early (FIRE) journey.",
    link: "/tools/fire-calculator",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?q=80&w=1974&auto=format&fit=crop",
    isFeatured: false
  },

  // ====================
  // 3. TECH TOOLS
  // ====================
  {
    id: "tool-11",
    title: "Mobile Price Comparison",
    category: "Tech",
    description: "Compare smartphone prices across Amazon, Flipkart, and Croma instantly.",
    link: "/tools/mobile-comparison",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2080&auto=format&fit=crop",
    isFeatured: true
  },
  {
    id: "tool-12",
    title: "Laptop Price Comparison",
    category: "Tech",
    description: "Find the best laptop deals for gaming, work, or students.",
    link: "/tools/laptop-comparison",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-13",
    title: "Tech Specs Comparison",
    category: "Tech",
    description: "Head-to-head feature battle: Processor, RAM, Camera, and Battery.",
    link: "/tools/specs-comparison",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    isFeatured: false
  },
  {
    id: "tool-14",
    title: "Price Drop Alerts",
    category: "Tech",
    description: "Set a target price and get notified when your favorite gadget gets cheaper.",
    link: "/tools/price-alerts",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop",
    isFeatured: false
  },
];

export default toolsData;