import { KitDocumentation } from "../../types";

export const ROBOTIC_ARM_DOCUMENTATION: KitDocumentation = {
  gettingStartedSummary: "The 4-DOF Robotic Arm teaches mechanical linkage mechanics, degree-of-freedom kinematics, and multi-servo PWM synchronization.",
  pinoutDiagramUrl: "/assets/kit-workbench.jpg",
  operatingVoltage: "5V Logic • 6V External Servo Supply",
  currentDraw: "500mA Idle • 2.2A Stall Peak",
  microcontrollerCore: "ATmega328P with I2C PCA9685 Driver Shield",

  safetyGuidelines: [
    "Always connect an external 5V/6V power supply to the PCA9685 servo terminal; do not power 4 servos directly from the Arduino 5V regulator pin.",
    "Keep hands clear of pinch points during initial servo calibration routines."
  ],

  troubleshootingFaqs: [
    {
      question: "Why do servos jitter or reset the microcontroller?",
      answer: "Servos draw high inrush current during motion. Connect a dedicated 5V 2A-3A external power adapter to the PCA9685 power terminal."
    },
    {
      question: "How do I zero/center the servos before mounting the acrylic horns?",
      answer: "Upload the Servo_Center_90deg.ino sketch to send a 90° PWM signal to all channels before tightening the center horn screws."
    }
  ]
};
