// All portfolio content lives here. Edit this file to update the site.
import bootstrapLogo from '../assets/tech/bootstrap.svg'
import css3Logo from '../assets/tech/css3.svg'
import expressLogo from '../assets/tech/express.svg'
import gitLogo from '../assets/tech/git.svg'
import githubLogo from '../assets/tech/github.svg'
import html5Logo from '../assets/tech/html5.svg'
import javascriptLogo from '../assets/tech/javascript.svg'
import mongodbLogo from '../assets/tech/mongodb.svg'
import nodejsLogo from '../assets/tech/nodejs.svg'
import postmanLogo from '../assets/tech/postman.svg'
import reactLogo from '../assets/tech/react.svg'
import reduxLogo from '../assets/tech/redux.svg'
import tailwindLogo from '../assets/tech/tailwindcss.svg'
import typescriptLogo from '../assets/tech/typescript.svg'
import vercelLogo from '../assets/tech/vercel.svg'
import vscodeLogo from '../assets/tech/vscode.svg'

// Files in public/ must go through this so they work when the site is served from a
// sub-path (GitHub Pages: /rohit-portfolio/) as well as from the domain root (Vercel, dev).
const asset = (path) => `${import.meta.env.BASE_URL}${path}`

export const profile = {
  name: 'Rohit Prajapati',
  role: 'MERN Stack / Full-Stack Web Developer',
  shortRole: 'Full-Stack Developer',
  location: 'Noida, Uttar Pradesh, India',
  email: 'rp1485260@gmail.com',
  // Shown in the Contact section. Set to '' to hide it from the site.
  phone: '+91 73486 75919',
  // Add a square photo at public/profile.jpg and set photo: asset('profile.jpg').
  // Until then a monogram is shown.
  photo: '',
  availability: 'Open to full-stack developer roles',
  // The large line under the name in the hero.
  headline: 'I build full-stack web apps, from the React interface to the API and database behind it.',
  intro:
    'Full-stack developer with a strong foundation in the MERN stack. I build responsive, scalable websites with RESTful APIs, JWT authentication and modern state management, and deploy them end to end.',
  resume: {
    url: asset('resume.pdf'),
    downloadName: 'Rohit-Prajapati-Resume.pdf',
  },
}

export const socials = [
  { id: 'github', label: 'GitHub', handle: 'Rohitp969', url: 'https://github.com/Rohitp969' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'rohit-prajapati-954a8527a',
    url: 'https://www.linkedin.com/in/rohit-prajapati-954a8527a',
  },
]

export const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

// Every technology shown on the site. `logo` is an image; `icon` is a Lucide icon key
// (see components/TechIcon.jsx); `mono` logos are black and get inverted in dark mode.
export const tech = {
  javascript: { name: 'JavaScript (ES6+)', logo: javascriptLogo },
  typescript: { name: 'TypeScript', logo: typescriptLogo },
  react: { name: 'React.js', logo: reactLogo },
  redux: { name: 'Redux', logo: reduxLogo },
  context: { name: 'Context API', icon: 'context' },
  html5: { name: 'HTML5', logo: html5Logo },
  css3: { name: 'CSS3', logo: css3Logo },
  tailwind: { name: 'Tailwind CSS', logo: tailwindLogo },
  bootstrap: { name: 'Bootstrap', logo: bootstrapLogo },
  responsive: { name: 'Responsive Design', icon: 'responsive' },
  nodejs: { name: 'Node.js', logo: nodejsLogo },
  express: { name: 'Express.js', logo: expressLogo, mono: true },
  mongodb: { name: 'MongoDB', logo: mongodbLogo },
  mongoose: { name: 'Mongoose', icon: 'database' },
  rest: { name: 'REST APIs', icon: 'api' },
  jwt: { name: 'JWT Auth', icon: 'key' },
  git: { name: 'Git', logo: gitLogo },
  github: { name: 'GitHub', logo: githubLogo, mono: true },
  postman: { name: 'Postman', logo: postmanLogo },
  vscode: { name: 'VS Code', logo: vscodeLogo },
  vercel: { name: 'Vercel', logo: vercelLogo, mono: true },
  render: { name: 'Render', icon: 'cloud' },
}

export const skillGroups = [
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces that work on every screen size',
    items: ['react', 'redux', 'context', 'javascript', 'html5', 'css3', 'tailwind', 'bootstrap', 'responsive'],
  },
  {
    id: 'backend',
    title: 'Backend and database',
    description: 'APIs, authentication and data',
    items: ['nodejs', 'express', 'mongodb', 'mongoose', 'rest', 'jwt'],
  },
  {
    id: 'tools',
    title: 'Tools and platforms',
    description: 'From first commit to deployment',
    items: ['git', 'github', 'postman', 'vscode', 'vercel', 'render'],
  },
  {
    id: 'languages',
    title: 'Languages',
    description: 'What I write code in',
    items: ['javascript', 'typescript'],
  },
]

export const coreExpertise = [
  {
    id: 'api',
    title: 'RESTful API design',
    description: 'Clean Express routes, controllers and Mongoose models for real resources.',
  },
  {
    id: 'crud',
    title: 'CRUD operations',
    description: 'Create, read, update and delete flows from the UI down to MongoDB.',
  },
  {
    id: 'auth',
    title: 'Authentication and authorization',
    description: 'JWT sign-in, hashed passwords and role-based access for users and admins.',
  },
  {
    id: 'performance',
    title: 'Performance optimization',
    description: 'Fast pages, lean API responses and state that avoids prop drilling.',
  },
]

export const about = {
  paragraphs: [
    "I'm a full-stack developer from Noida with a strong foundation in the MERN stack: MongoDB, Express.js, React.js and Node.js. I enjoy building complete products, from the React interface and Redux state to the REST API, authentication and database behind it.",
    'I recently completed a three-month MERN stack internship at Unified Mentor, where I was recognized for consistency and hands-on delivery. My own projects include an e-commerce website and a food delivery website with online payments and admin dashboards, both live on Vercel. I’m looking to contribute to production-grade full-stack projects in a collaborative engineering team.',
  ],
  softSkills: ['Quick learner', 'Problem solving', 'Teamwork', 'Time management', 'Self-motivated', 'Adaptability'],
  languages: ['English', 'Hindi'],
}

// Projects come from the GitHub repositories, their READMEs and package.json files.
// Each project gets a large card with a full-page screenshot of the live site
// (put images in public/projects/). `previewSize` is the image's width and height.
// `uses` lists ids from `tech` above; the Skills section highlights them per project.
export const projects = [
  {
    id: 'ekart',
    name: 'Ekart',
    title: 'Ekart: E-Commerce Website',
    tagline: 'A full-stack MERN e-commerce website with online payments and an admin dashboard.',
    description:
      'Customers browse, filter and buy products, pay online or with cash on delivery, and track their orders. Admins manage products, orders and customers from a dashboard with sales analytics.',
    features: [
      'Catalog with category browsing, search, filters, sorting and pagination',
      'Cart with stock checks; checkout with saved addresses, Razorpay or cash on delivery',
      'Accounts with email verification, OTP password reset and order tracking',
      'Admin dashboard with sales analytics, product, order and customer management',
      'Order totals calculated on the server; hashed OTPs with attempt limits',
    ],
    stack: ['React 19', 'Redux Toolkit', 'Tailwind CSS', 'Node.js', 'Express 5', 'MongoDB', 'JWT', 'Razorpay', 'Cloudinary'],
    uses: [
      'react', 'redux', 'javascript', 'html5', 'css3', 'tailwind', 'responsive',
      'nodejs', 'express', 'mongodb', 'mongoose', 'rest', 'jwt', 'git', 'github', 'vercel',
    ],
    preview: asset('projects/ekart-full.webp'),
    previewSize: [960, 5104],
    imageAlt: 'Ekart e-commerce website home page, from the category bar and banner down to the footer',
    liveUrl: 'https://ecart-silk-six.vercel.app/',
    repoUrl: 'https://github.com/Rohitp969/ecart',
  },
  {
    id: 'food-delivery',
    name: 'GoFood',
    title: 'GoFood: Food Delivery Website',
    tagline: 'A full-stack MERN food ordering website with separate customer and admin panels.',
    description:
      'Customers browse restaurants and menus, build a cart, pay and follow their order status. Restaurant admins manage the menu, update orders and review sales from their own panel.',
    features: [
      'Restaurants, menus, food details, wishlist and cart',
      'Checkout with delivery address; Razorpay (online/UPI) or cash on delivery',
      'Order history with status tracking for every order',
      'JWT authentication with role-based access for customers and admins',
      'Admin panel with sales charts, menu management and order reports exported to PDF',
    ],
    stack: ['React', 'Context API', 'Tailwind CSS', 'Chart.js', 'Node.js', 'Express', 'MongoDB', 'JWT', 'Razorpay'],
    uses: [
      'react', 'context', 'javascript', 'html5', 'css3', 'tailwind', 'responsive',
      'nodejs', 'express', 'mongodb', 'mongoose', 'rest', 'jwt', 'git', 'github', 'vercel',
    ],
    preview: asset('projects/food-delivery-full.webp'),
    previewSize: [960, 1516],
    imageAlt: 'GoFood food delivery website home page with search and a grid of restaurant cards',
    liveUrl: 'https://food-delivery-rho-rosy.vercel.app/',
    repoUrl: 'https://github.com/Rohitp969/food-delivery',
  },
]

export const experience = [
  {
    id: 'unified-mentor',
    role: 'MERN Stack Intern',
    company: 'Unified Mentor Pvt. Ltd.',
    type: 'Internship',
    period: 'Mar 2026 – Jun 2026',
    duration: '3 months',
    summary: 'Completed an intensive three-month MERN stack internship, recognized for consistency and hands-on delivery.',
    highlights: [
      'Built responsive, CRUD-based web applications using MongoDB, Express.js, React.js and Node.js from the ground up.',
      'Gained practical experience in API integration, authentication, routing and database design.',
      'Collaborated with mentors on code reviews, debugging and version control workflows using Git and GitHub.',
    ],
    stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Git', 'GitHub'],
    uses: ['mongodb', 'express', 'react', 'nodejs', 'javascript', 'rest', 'git', 'github'],
  },
]

export const education = [
  {
    id: 'btech',
    qualification: 'B.Tech in Computer Science',
    institution: 'SHEAT College of Engineering, Babatpur, Varanasi',
    period: '2021 – 2025',
    scoreLabel: 'CGPA',
    score: '7.20',
  },
  {
    id: 'class-12',
    qualification: 'Class XII',
    institution: 'UP Board, Hindi medium',
    period: '2021',
    scoreLabel: 'Score',
    score: '65%',
  },
  {
    id: 'class-10',
    qualification: 'Class X',
    institution: 'UP Board, Hindi medium',
    period: '2019',
    scoreLabel: 'Score',
    score: '76%',
  },
]

export const certifications = [
  {
    id: 'internship',
    title: 'Certificate of Internship',
    detail: 'MERN Stack Intern',
    issuer: 'Unified Mentor Pvt. Ltd.',
    date: 'Mar – Jun 2026',
  },
  {
    id: 'test-engineer',
    title: 'Test Engineer Course',
    detail: 'Finishing School for Employability',
    issuer: 'Infosys Foundation (ICT Academy)',
    date: '2024',
  },
  {
    id: 'c-programming',
    title: 'C Programming Training',
    issuer: 'Spoken Tutorial, IIT Bombay',
    date: '2023',
  },
  {
    id: 'python',
    title: 'Python Training',
    detail: 'Python 3.4.3',
    issuer: 'Spoken Tutorial, IIT Bombay',
    date: '2023',
  },
]
