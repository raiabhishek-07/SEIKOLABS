import { KitDocumentation } from "../../types";

export const ROVER_DOCUMENTATION: KitDocumentation = {
  gettingStartedSummary: "Complete circuit wiring diagram, pin configuration table, power distribution limits, and common troubleshooting solutions.",
  pinoutDiagramUrl: "/assets/kit-workbench.jpg",
  operatingVoltage: "3.3V/5V Logic • 7.4V - 8.4V Motor Rail",
  currentDraw: "120mA Idle • 1.2A Continuous • 2.5A Stall Peak",
  microcontrollerCore: "ESP32 32-bit Dual-Core Xtensa LX6 (240MHz)",

  safetyGuidelines: [
    "Always turn off the master battery switch before connecting or changing jumper wires.",
    "Do NOT connect 7.4V battery power directly to the ESP32 3.3V pin — always feed battery to the L298N 12V terminal and power ESP32 via the regulated 5V rail.",
    "Ensure common ground (GND) is shared between the ESP32 GND and the L298N GND.",
    "Only charge the battery using standard 5V USB Type-C wall adapters or PC ports."
  ],

  troubleshootingFaqs: [
    {
      question: "One pair of motors spins in reverse when moving forward. How to fix?",
      answer: "Swap the two motor wires connected to the corresponding OUT terminal block on the L298N driver. Polarity determines the direction of DC motor rotation."
    },
    {
      question: "I cannot connect to the 'SEIKO-Rover-AP' Wi-Fi network. What should I check?",
      answer: "Ensure the ESP32 power LED is lit. Press the EN (Reset) button on the ESP32 board. If you configured a password in firmware, default is '12345678'."
    },
    {
      question: "The robot resets when accelerating at full speed. Why?",
      answer: "This is typically caused by battery voltage drop under motor stall current. Ensure the 2S battery pack is fully charged via the Type-C port, and verify all screw terminals are tight."
    },
    {
      question: "How do I calibrate straight-line driving if the robot pulls slightly to one side?",
      answer: "In Lesson 3.1 firmware, adjust the LEFT_TRIM and RIGHT_TRIM PWM constants (0 to 255) to compensate for motor manufacturing tolerances."
    }
  ]
};
