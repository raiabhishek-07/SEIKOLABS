export interface Project {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Robotics' | 'Sensors' | 'IoT' | 'Automation' | 'Medical' | 'AI' | 'Drones' | 'Marine' | 'Challenge';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  estimatedTime: string;
  skills: string[];
  componentsRequired: string[];
  circuitOverview: string;
  wiringInstructions: string[];
  codeSnippet: string;
  howItWorks: string;
  commonMistakes: string[];
  challenge: string;
  badgeColor: string;
}

export type ProjectItem = Project;

export const PROJECTS_DATA: Project[] = [
  {
    id: "obstacle-avoiding-robot",
    number: "Project 01",
    title: "Obstacle Avoiding Robot",
    shortDescription: "Build an autonomous robot that detects obstacles using ultrasonic sensors and automatically changes direction.",
    fullDescription: "Construct a self-navigating rover equipped with an HC-SR04 Ultrasonic Sensor mounted on a servo motor. The robot continuously scans its front path, measures clearance in centimeters, and makes intelligent steering decisions to avoid collisions.",
    category: "Robotics",
    difficulty: "Intermediate",
    estimatedTime: "1.5 Hours",
    skills: ["Ultrasonic sensing", "Motor control", "Arduino programming", "Decision making", "Algorithm logic"],
    componentsRequired: ["Arduino UNO", "Ultrasonic Sensor (HC-SR04)", "L298N Motor Driver", "2 x DC Gear Motors", "Robot Chassis", "Servo Motor (SG90)", "Battery Pack"],
    circuitOverview: "Connect HC-SR04 Trig -> Pin 9, Echo -> Pin 10. L298N IN1..IN4 -> Pins 5, 6, 7, 8. Servo Signal -> Pin 11. Motor Driver connected to 7.4V battery pack.",
    wiringInstructions: [
      "Attach the HC-SR04 Trig pin to Arduino Digital Pin 9 and Echo pin to Digital Pin 10.",
      "Connect the Servo Motor signal pin to Digital Pin 11 for scanning left/right.",
      "Connect IN1, IN2, IN3, IN4 of L298N Motor Driver to Arduino Pins 5, 6, 7, and 8.",
      "Wire the left DC motor to Motor Driver Terminal A and right DC motor to Terminal B.",
      "Ensure common ground (GND) between Arduino, Motor Driver, and Battery source."
    ],
    codeSnippet: `// Obstacle Avoiding Robot Code
#include <Servo.h>

#define TRIG_PIN 9
#define ECHO_PIN 10
#define IN1 5
#define IN2 6
#define IN3 7
#define IN4 8

Servo headServo;

void setup() {
  pinMode(TRIG_PIN, OUTPUT);
  pinMode(ECHO_PIN, INPUT);
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  
  headServo.attach(11); headServo.write(90);
}

long getDistance() {
  digitalWrite(TRIG_PIN, LOW); delayMicroseconds(2);
  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);
  digitalWrite(TRIG_PIN, LOW);
  return pulseIn(ECHO_PIN, HIGH) * 0.034 / 2;
}

void moveForward() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, HIGH); digitalWrite(IN4, LOW);
}

void stopRobot() {
  digitalWrite(IN1, LOW); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, LOW);
}

void turnRight() {
  digitalWrite(IN1, HIGH); digitalWrite(IN2, LOW);
  digitalWrite(IN3, LOW); digitalWrite(IN4, HIGH);
  delay(400);
}

void loop() {
  long distance = getDistance();
  if (distance > 20) {
    moveForward();
  } else {
    stopRobot(); delay(200);
    turnRight();
  }
  delay(50);
}`,
    howItWorks: "The ultrasonic sensor emits sound pulses. By measuring time echo returns, the Arduino calculates distance. If under 20cm, it halts motors and turns.",
    commonMistakes: [
      "Forgetting common ground between Arduino and Motor Driver.",
      "Swapping Trig and Echo pins in code."
    ],
    challenge: "Can you modify the robot to scan both left and right before turning?",
    badgeColor: "from-cyan-500 to-blue-600"
  },
  {
    id: "ai-face-tracking-camera-bot",
    number: "Project 02",
    title: "AI Face Tracking Pan-Tilt Camera",
    shortDescription: "Program an ESP32-CAM to recognize human faces and automatically pan/tilt camera servos to keep faces centered.",
    fullDescription: "Deploy computer vision on an edge AI microcontroller! The ESP32-CAM processes video frames, runs lightweight facial detection algorithms, and transmits PWM positioning coordinates to pan/tilt servo motors.",
    category: "AI",
    difficulty: "Advanced",
    estimatedTime: "2 Hours",
    skills: ["Computer Vision", "ESP32-CAM", "Servo Control", "AI Model Deployment", "C++"],
    componentsRequired: ["ESP32-CAM Module", "Dual SG90 Servo Rig", "FTDI USB Serial Programmer", "Power Supply"],
    circuitOverview: "ESP32-CAM GPIO 14 -> Pan Servo Signal, GPIO 15 -> Tilt Servo Signal. Powered via 5V 2A regulator.",
    wiringInstructions: [
      "Connect Pan Servo signal to ESP32-CAM GPIO 14.",
      "Connect Tilt Servo signal to ESP32-CAM GPIO 15.",
      "Supply 5V power to VIN and GND."
    ],
    codeSnippet: `// ESP32-CAM Face Tracking AI Sketch
#include "esp_camera.h"
#include <ESP32Servo.h>

Servo panServo;
Servo tiltServo;

void setup() {
  Serial.begin(115200);
  panServo.attach(14);
  tiltServo.attach(15);
  // Initialize Camera & AI Face Detector
  Serial.println("AI Face Tracker Ready");
}

void loop() {
  // Capture frame, detect bounding box & update servos!
}`,
    howItWorks: "Image pixels are passed through a neural net detection model. Bounding box center coordinates drive proportional servo position adjustments.",
    commonMistakes: [
      "Insufficient power supply causing ESP32-CAM brownout resets when servos draw current.",
      "Overheating the camera board during long streaming sessions."
    ],
    challenge: "Add custom voice feedback using an I2S DAC speaker when a recognized face enters view!",
    badgeColor: "from-purple-500 to-indigo-600"
  },
  {
    id: "biomedical-heart-rate-monitor",
    number: "Project 03",
    title: "Biomedical Heart Rate & SpO2 Oximeter",
    shortDescription: "Build a medical pulse oximeter device with real-time PPG waveform graph and pulse sound alerts.",
    fullDescription: "Construct a biomedical diagnostic device. The optical MAX30102 sensor shines red and infrared light through finger capillaries to calculate heart rate (BPM) and blood oxygen saturation (SpO2 percentage).",
    category: "Medical",
    difficulty: "Intermediate",
    estimatedTime: "1 Hour",
    skills: ["Biomedical Sensing", "PPG Waveforms", "I2C Protocol", "OLED Graphics", "Signal Processing"],
    componentsRequired: ["Arduino UNO", "MAX30102 Pulse Oximeter Sensor", "0.96 inch OLED Display", "Buzzer"],
    circuitOverview: "MAX30102 SDA -> A4, SCL -> A5. OLED SDA -> A4, SCL -> A5 (I2C Bus). Buzzer -> Pin 6.",
    wiringInstructions: [
      "Connect MAX30102 and OLED display to Arduino I2C pins A4 (SDA) and A5 (SCL).",
      "Power both modules from 3.3V / 5V rail.",
      "Connect Piezo Buzzer to Pin 6."
    ],
    codeSnippet: `// Medical Heart Rate Oximeter
#include <Wire.h>
#include "MAX30105.h"

MAX30105 particleSensor;

void setup() {
  Wire.begin();
  particleSensor.begin(Wire, I2C_SPEED_FAST);
  particleSensor.setup();
}

void loop() {
  long irValue = particleSensor.getIR();
  if (irValue > 50000) {
    // Finger detected -> Calculate BPM
  }
}`,
    howItWorks: "Oxygenated and deoxygenated hemoglobin absorb IR and red light at different ratios. Measuring pulse absorption modulation yields heart rate and blood oxygen readings.",
    commonMistakes: [
      "Pressing finger too hard on optical sensor, blocking capillary blood flow.",
      "Ambient fluorescent light interference."
    ],
    challenge: "Add ESP8266 Wi-Fi telemetry to upload pulse data directly to a doctor's remote cloud portal!",
    badgeColor: "from-rose-500 to-pink-600"
  },
  {
    id: "line-following-robot",
    number: "Project 04",
    title: "Line Following Robot",
    shortDescription: "Use infrared (IR) sensors to track a black tape line on a surface and steer autonomously.",
    fullDescription: "Construct a precision line-tracking vehicle using twin IR sensors that detect surface reflectivity variations.",
    category: "Robotics",
    difficulty: "Intermediate",
    estimatedTime: "1 Hour",
    skills: ["IR sensing", "Conditional logic", "Motor control", "Robotics"],
    componentsRequired: ["Arduino UNO", "2 x IR Line Sensors", "L298N Driver", "2 x DC Motors", "Chassis"],
    circuitOverview: "Left IR -> Pin 2, Right IR -> Pin 3. L298N -> Pins 5,6,7,8.",
    wiringInstructions: [
      "Mount 2 IR sensors underneath chassis front.",
      "Connect IR signals to Pins 2 & 3.",
      "Connect L298N driver inputs to Pins 5..8."
    ],
    codeSnippet: `// Line Follower Code
#define LEFT_SENSOR 2
#define RIGHT_SENSOR 3

void setup() {
  pinMode(LEFT_SENSOR, INPUT);
  pinMode(RIGHT_SENSOR, INPUT);
}

void loop() {
  int l = digitalRead(LEFT_SENSOR);
  int r = digitalRead(RIGHT_SENSOR);
  // Adjust motor speeds based on line detection
}`,
    howItWorks: "Infrared light reflects off white floor (LOW) and absorbs on black line (HIGH).",
    commonMistakes: ["IR sensors placed too far from floor."],
    challenge: "Implement PID control for smooth steering curves!",
    badgeColor: "from-indigo-500 to-purple-600"
  },
  {
    id: "diy-quadcopter-flight-controller",
    number: "Project 05",
    title: "DIY Quadcopter Flight Controller",
    shortDescription: "Assemble and calibrate a 4-axis drone using gyroscope MPU6050 feedback for self-leveling flight.",
    fullDescription: "Program PID control loops to balance 4 brushless motors in real-time using MPU6050 6-axis gyroscope accelerometer sensors.",
    category: "Drones",
    difficulty: "Advanced",
    estimatedTime: "2.5 Hours",
    skills: ["Aeronautics", "Gyroscope Calibration", "PID Control", "Wireless RF", "Motors"],
    componentsRequired: ["Flight Controller Board", "MPU6050 Gyro", "4 x ESC Motors", "Drone Frame", "RF Receiver"],
    circuitOverview: "MPU6050 SDA/SCL -> I2C. ESC Signal Pins -> Digital PWM Pins 3, 5, 6, 9.",
    wiringInstructions: [
      "Mount MPU6050 flat on center of drone frame.",
      "Wire 4 motor ESC signal wires to PWM outputs.",
      "Bind 2.4GHz RF Receiver."
    ],
    codeSnippet: `// Quadcopter Flight Controller PID Stub
#include <Wire.h>

void setup() {
  Wire.begin();
  // Calibrate Gyro MPU6050
}

void loop() {
  // Calculate Roll, Pitch, Yaw & adjust motor PWM
}`,
    howItWorks: "Gyroscope reads angular velocity changes 200 times per second. PID algorithms adjust motor speeds to counteract tilt.",
    commonMistakes: ["Mounting propellers upside down or in wrong rotation direction."],
    challenge: "Integrate a barometer sensor for automatic altitude hold mode!",
    badgeColor: "from-blue-500 to-cyan-600"
  },
  {
    id: "autonomous-solar-water-boat",
    number: "Project 06",
    title: "Autonomous Solar River Water Boat",
    shortDescription: "Build a floating catamaran boat powered by solar panels that monitors water quality and navigates autonomously.",
    fullDescription: "Construct a marine robot. Solar panels charge onboard batteries while twin waterjet thrusters steer the vessel along water paths.",
    category: "Marine",
    difficulty: "Intermediate",
    estimatedTime: "1.5 Hours",
    skills: ["Hydrodynamics", "Solar Power", "Waterproofing", "Sensor Analytics", "Robotics"],
    componentsRequired: ["Waterproof Hull", "Solar Panel", "Twin Submersible Motors", "Turbidity Sensor", "Arduino"],
    circuitOverview: "Solar Charger -> Battery -> Motor Driver. Water turbidity sensor -> Pin A0.",
    wiringInstructions: [
      "Seal motor wire entry points with marine silicone.",
      "Connect Solar charge controller to battery pack.",
      "Wire water quality sensor probe."
    ],
    codeSnippet: `// Solar Water Boat Controller
#define TURBIDITY_PIN A0

void setup() {
  Serial.begin(9600);
}

void loop() {
  int waterQuality = analogRead(TURBIDITY_PIN);
  // Log water data & navigate thrusters
}`,
    howItWorks: "Photovoltaic cells convert sunlight into electric current, storing energy to drive dual submerged propellers.",
    commonMistakes: ["Inadequate waterproofing around electrical battery compartments."],
    challenge: "Add a GPS module to log water quality data with latitude/longitude coordinates!",
    badgeColor: "from-teal-500 to-emerald-600"
  },
  {
    id: "custom-robot-challenge",
    number: "Project 07",
    title: "Custom Open Engineering Challenge",
    shortDescription: "Design your own custom robotic creation combining sensors, motors, AI, and wireless telemetry!",
    fullDescription: "Unleash ultimate maker creativity. Combine kit components to invent a brand-new application of your own design.",
    category: "Challenge",
    difficulty: "Advanced",
    estimatedTime: "Open Ended",
    skills: ["System Integration", "Debugging", "Prototyping", "Inventive Thinking"],
    componentsRequired: ["All Kit Components Included!"],
    circuitOverview: "Custom circuit designed by student maker.",
    wiringInstructions: ["Design pin assignment map & test modules."],
    codeSnippet: `// Custom Engineering Challenge Boilerplate
void setup() {
  Serial.begin(9600);
  Serial.println("Custom STEM Innovation Booted!");
}

void loop() {
  // Your custom algorithm here!
}`,
    howItWorks: "True engineering mastery happens when students combine modular components into new solutions.",
    commonMistakes: ["Not mapping pin assignments before wiring."],
    challenge: "Document your build and submit it to our Student Innovation Showcase!",
    badgeColor: "from-amber-400 to-red-600"
  }
];
