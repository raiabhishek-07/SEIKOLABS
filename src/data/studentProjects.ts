export interface StudentProject {
  id: string;
  studentName: string;
  gradeOrCollege: string;
  projectTitle: string;
  description: string;
  techTags: string[];
  likes: number;
  image: string;
  award?: string;
}

export const STUDENT_PROJECTS_DATA: StudentProject[] = [
  {
    id: "sp-1",
    studentName: "Aarav Sharma",
    gradeOrCollege: "Grade 8 Student",
    projectTitle: "Voice & Gesture Controlled Rover",
    description: "Modified the Bluetooth Robot kit to accept custom voice commands and hand-tilt accelerometer gestures from a smart watch.",
    techTags: ["Arduino", "Bluetooth", "Accelerometer", "Robotics"],
    likes: 142,
    image: "/student-1.png",
    award: "1st Place STEM Fair 2025"
  },
  {
    id: "sp-2",
    studentName: "Priya & Team",
    gradeOrCollege: "Polytechnic Diploma Team",
    projectTitle: "Automated Crop Health & Soil Monitor",
    description: "Used the kit's ESP8266 and sensor modules to transmit soil moisture and light intensity telemetry to a custom web app.",
    techTags: ["ESP8266", "IoT", "Sensors", "Agriculture"],
    likes: 118,
    image: "/student-2.png",
    award: "College Innovation Grant Winner"
  },
  {
    id: "sp-3",
    studentName: "Rohan Patel",
    gradeOrCollege: "Grade 10 Student",
    projectTitle: "Autonomous Maze Solving Vehicle",
    description: "Programmed a flood-fill algorithm using twin ultrasonic sensors to navigate an unknown maze without colliding.",
    techTags: ["Arduino", "Ultrasonic", "Algorithms", "Autonomous"],
    likes: 95,
    image: "/student-3.png"
  },
  {
    id: "sp-4",
    studentName: "Ananya Roy",
    gradeOrCollege: "1st Year B.Tech Engineering",
    projectTitle: "Smart Parking Guidance System",
    description: "Integrated multiple IR sensors with servo gates and an LCD readout to automate parking slot allocation for campus garages.",
    techTags: ["Servo", "IR Sensors", "LCD", "Automation"],
    likes: 167,
    image: "/student-4.png",
    award: "Robotics Club Project of the Year"
  }
];
