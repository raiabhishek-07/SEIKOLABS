import { AssessmentQuestion } from "../../types";

export const ROVER_ASSESSMENTS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "What is the primary function of the L298N Dual H-Bridge motor driver in the SEIKO RoverX?",
    options: [
      "To step up battery voltage from 3.3V to 12V",
      "To convert low-current GPIO control signals into high-current bidirectional drive power for the motors",
      "To broadcast the Wi-Fi network SSID to smartphones",
      "To balance the charge across the 2S battery cells"
    ],
    correctIndex: 1,
    explanation: "Microcontrollers cannot output enough current (max ~20mA per pin) to drive DC motors directly. The L298N acts as a high-current bridge controlled by the ESP32's logic signals.",
    topic: "Motor Electronics"
  },
  {
    id: 2,
    question: "How does the onboard Type-C 2S BMS module safely charge a 7.4V (2-cell) lithium battery pack from a 5V USB port?",
    options: [
      "By using an alternating current transformer",
      "By utilizing a synchronous boost step-up converter with integrated constant-current/constant-voltage (CC/CV) charging and cell balance protection",
      "By discharging one cell while charging the other",
      "By reducing the battery voltage down to 3.3V"
    ],
    correctIndex: 1,
    explanation: "The Type-C 2S charging module incorporates a DC-DC synchronous boost regulator to step up 5V input to 8.4V with built-in battery management system (BMS) safety cutoff.",
    topic: "Power Systems"
  },
  {
    id: 3,
    question: "In the ESP32 SoftAP Web Controller firmware, which protocol allows instantaneous two-way joystick telemetry without reloading the web page?",
    options: [
      "FTP (File Transfer Protocol)",
      "WebSockets (Full-duplex TCP communication)",
      "POP3 Email Protocol",
      "Static HTTP GET Polling"
    ],
    correctIndex: 1,
    explanation: "WebSockets maintain a persistent, bidirectional channel between the client browser and the ESP32 server, transmitting motor joystick coordinates in real time (<15ms latency).",
    topic: "Network Architecture"
  },
  {
    id: 4,
    question: "If you want the 4WD RoverX to perform a stationary 360-degree clockwise spin turn in place, what should the motor states be?",
    options: [
      "All four motors spin forward at 100% speed",
      "Left-side motors spin forward while Right-side motors spin in reverse",
      "Right-side motors spin forward while Left-side motors are completely turned off",
      "All four motors spin in reverse"
    ],
    correctIndex: 1,
    explanation: "Spin turns (skid steering) require opposing wheel rotation: driving the left wheels forward and right wheels in reverse generates a pure rotational torque about the vehicle's center of mass.",
    topic: "Kinematics & Control"
  },
  {
    id: 5,
    question: "Why MUST the ESP32 ground pin (GND) be connected to the L298N ground pin (GND)?",
    options: [
      "To make the status LEDs shine twice as bright",
      "To establish a common zero-volt reference so the L298N logic inputs can accurately distinguish HIGH (3.3V) and LOW (0V) signals",
      "To prevent the Wi-Fi signal from interfering with motor PWM",
      "It is completely optional and does not affect operation"
    ],
    correctIndex: 1,
    explanation: "Without a shared common ground, voltage potential differences between separate boards cause floating inputs, erratic motor behavior, or failure to trigger logic thresholds.",
    topic: "Circuit Prototyping"
  }
];
