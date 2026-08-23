export const ROVER_OVERVIEW = {
  kitId: "smart-robotics-rover-kit",
  domainSlug: "robotics" as const,
  name: "SEIKO RoverX: ESP32 4WD Connected RC Bot",
  tagline: "Dual-Core ESP32 Wi-Fi & Bluetooth Teleoperation with Type-C 2S Fast-Charge",
  description: "Construct a high-torque 4-wheel drive wireless smart car powered by an ESP32 dual-core microcontroller. Drive wirelessly from any smartphone browser via local Wi-Fi Access Point, pair Bluetooth gamepads, and charge effortlessly with the onboard Type-C 2S BMS module.",
  price: 149,
  originalPrice: 199,
  difficulty: "Beginner" as const,
  targetAge: "Ages 10+ • Students & Makers",
  rating: 4.9,
  reviewCount: 380,
  image: "/assets/kit-robotics.jpg",

  outcomes: [
    "ESP32 Wi-Fi SoftAP Mode & Embedded Web Server Architecture",
    "L298N Dual H-Bridge Motor Control & PWM Velocity Modulation",
    "Type-C 2S Lithium Power Management & Synchronous Boost Charging",
    "Solderless Dupont Prototyping & Low-Voltage Safety Circuit Design"
  ],

  specs: [
    { label: "Microcontroller", value: "ESP32 32-bit Dual-Core Xtensa LX6 (240MHz)" },
    { label: "Operating Voltage", value: "3.3V/5V Logic • 7.4V - 8.4V Motor Rail" },
    { label: "Current Draw", value: "120mA Idle • 1.2A Continuous • 2.5A Stall Peak" },
    { label: "Wireless Protocols", value: "2.4GHz Wi-Fi (SoftAP) + BLE 4.2" },
    { label: "Charging Interface", value: "USB Type-C 2S Fast-Charge (8.4V BMS Synchronous)" }
  ]
};
