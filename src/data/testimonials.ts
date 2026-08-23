export interface Testimonial {
  id: string;
  name: string;
  role: 'Student' | 'Parent' | 'Teacher' | 'Faculty';
  organization: string;
  quote: string;
  rating: number;
  avatar: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Siddharth Verma",
    role: "Student",
    organization: "Grade 9 Student",
    quote: "Instead of just learning about sensors from a textbook, I finally understood how ultrasonic sound waves work by building an obstacle avoiding robot that actually steers itself!",
    rating: 5,
    avatar: "SV"
  },
  {
    id: "t2",
    name: "Dr. Meenakshi Sundaram",
    role: "Faculty",
    organization: "HOD Electronics, Engineering College",
    quote: "This kit bridges the gap between theoretical circuit theory and real-world engineering. Our 1st-year students were able to deploy Wi-Fi IoT web servers in their very first lab session.",
    rating: 5,
    avatar: "MS"
  },
  {
    id: "t3",
    name: "Rajesh K. Sharma",
    role: "Parent",
    organization: "Parent of Grade 7 Student",
    quote: "My daughter spent hours tinkering, coding, and debugging her Bluetooth robot. It shifted her screen time from watching videos to actually creating electronic projects.",
    rating: 5,
    avatar: "RS"
  },
  {
    id: "t4",
    name: "Vikram Sengupta",
    role: "Teacher",
    organization: "STEM Lab Coordinator, Delhi Public School",
    quote: "The modular component reuse is brilliant. We purchased 25 kits for our school STEM lab, and students have built 10 completely different projects using the exact same hardware set.",
    rating: 5,
    avatar: "VS"
  }
];
