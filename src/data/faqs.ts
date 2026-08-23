export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Hardware & Coding' | 'Schools & Bulk' | 'Support';
}

export const FAQS_DATA: FAQItem[] = [
  {
    id: "faq-1",
    question: "Is the kit suitable for absolute beginners?",
    answer: "Yes! The learning pathway is structured to start from basic concepts like lighting an LED and reading a digital sensor, before gradually progressing to autonomous robotics, motor drivers, and Wi-Fi IoT web servers. No prior electronics experience is required.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "What programming language is used?",
    answer: "The projects primarily use Arduino C/C++ in the free official Arduino IDE. Beginners can also use block-based graphical programming interfaces (like Scratch/mBlock) to understand logic before transitioning to text C++.",
    category: "Hardware & Coding"
  },
  {
    id: "faq-3",
    question: "Can the exact same kit hardware be used for multiple projects?",
    answer: "Absolutely! The entire platform is specifically designed around reusable, modular hardware components. You don't glue or permanently solder parts—everything plugs onto solderless headers, allowing you to dismantle and reassemble all 10+ projects as many times as you like.",
    category: "General"
  },
  {
    id: "faq-4",
    question: "Is it suitable for school students as well as engineering students?",
    answer: "Yes. School students (ages 10+) focus on sensor logic, basic C++ syntax, and obstacle/line robotics. Engineering and polytechnic diploma students dive deep into H-Bridge driver PWM signal modulation, ESP8266 HTTP web servers, and sensor fusion control algorithms.",
    category: "General"
  },
  {
    id: "faq-5",
    question: "Can schools and colleges purchase kits in bulk?",
    answer: "Yes! We offer institutional pricing, school lab bundles, curriculum lesson plans, teacher training workshops, and replacement spare parts packages. You can click 'Talk to Our Education Team' to request a customized quote.",
    category: "Schools & Bulk"
  },
  {
    id: "faq-6",
    question: "Do you provide project documentation and code support?",
    answer: "Every kit includes a 120-page printed manual plus digital access to step-by-step video tutorials, wiring schematics, copyable C++ code libraries, debugging guides, and mini-challenges.",
    category: "Support"
  },
  {
    id: "faq-7",
    question: "Can students create their own custom projects?",
    answer: "Yes! In fact, Project 10 is an open engineering challenge specifically designed to encourage students to combine sensors, Bluetooth, and motors to invent their own custom solutions.",
    category: "Hardware & Coding"
  }
];
