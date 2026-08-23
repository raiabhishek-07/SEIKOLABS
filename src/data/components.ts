export interface ComponentItem {
  id: string;
  name: string;
  labelAlias: string;
  roleTag: string;
  whatItDoes: string;
  whatStudentsLearn: string;
  iconName: string;
  hotspotCoords: { x: number; y: number }; // percentage on hero graphic
  specs: string;
  connectedProjectIds: string[];
  connectedSkills: string[];
  color: string;
}

export const COMPONENTS_DATA: ComponentItem[] = [
  {
    id: "arduino-uno",
    name: "Arduino UNO R3",
    labelAlias: "Brain",
    roleTag: "Microcontroller",
    whatItDoes: "The main programmable controller board that reads inputs, processes code logic, and sends control signals to motors and sensors.",
    whatStudentsLearn: "Microcontroller architecture, digital/analog input & output pins, timing routines, and memory management.",
    iconName: "Cpu",
    hotspotCoords: { x: 50, y: 50 },
    specs: "ATmega328P, 16 MHz Crystal, 32KB Flash, 14 Digital I/O Pins",
    connectedProjectIds: ["obstacle-avoiding-robot", "line-following-robot", "bluetooth-controlled-robot", "automatic-distance-detection", "servo-controlled-system", "smart-security-system"],
    connectedSkills: ["Programming", "Electronics", "Problem Solving", "Engineering Thinking"],
    color: "from-cyan-500 to-blue-500"
  },
  {
    id: "ultrasonic-sensor",
    name: "Ultrasonic Sensor (HC-SR04)",
    labelAlias: "Distance",
    roleTag: "Proximity Sensor",
    whatItDoes: "Measures distance to objects using high-frequency 40kHz acoustic sound waves.",
    whatStudentsLearn: "Speed of sound physics, pulse width measurement, digital triggering, and mathematical echo calculations.",
    iconName: "Radio",
    hotspotCoords: { x: 50, y: 20 },
    specs: "Range: 2cm to 400cm, Resolution: 3mm, Angle: 15 degrees",
    connectedProjectIds: ["obstacle-avoiding-robot", "automatic-distance-detection", "smart-parking-assistant"],
    connectedSkills: ["Electronics", "Sensors", "Problem Solving"],
    color: "from-blue-500 to-indigo-500"
  },
  {
    id: "ir-sensor",
    name: "Infrared (IR) Sensor Array",
    labelAlias: "Detection",
    roleTag: "Optical Proximity",
    whatItDoes: "Detects objects or tracks black/white contrast lines on surfaces using IR light emission and photodiode reception.",
    whatStudentsLearn: "Optical reflectivity, analog/digital threshold tuning via onboard potentiometers, and line tracking algorithms.",
    iconName: "Eye",
    hotspotCoords: { x: 30, y: 75 },
    specs: "Operating Voltage: 3.3V-5V, Range: 2cm - 30cm adjustable",
    connectedProjectIds: ["line-following-robot", "servo-controlled-system", "smart-security-system"],
    connectedSkills: ["Electronics", "Sensors", "Robotics"],
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "servo-motor",
    name: "Micro Servo Motor (SG90)",
    labelAlias: "Movement",
    roleTag: "Precision Actuator",
    whatItDoes: "Provides controlled rotational movement from 0° to 180° for scanning sensor heads and steering arms.",
    whatStudentsLearn: "Pulse Width Modulation (PWM), feedback loops, gear reduction, and angular positioning.",
    iconName: "RotateCw",
    hotspotCoords: { x: 50, y: 35 },
    specs: "Torque: 1.8 kg-cm, Speed: 0.1 sec/60 deg, Weight: 9 grams",
    connectedProjectIds: ["obstacle-avoiding-robot", "servo-controlled-system"],
    connectedSkills: ["Robotics", "Engineering Thinking", "Electronics"],
    color: "from-amber-500 to-orange-500"
  },
  {
    id: "esp8266",
    name: "ESP8266 Wi-Fi Module",
    labelAlias: "Connectivity",
    roleTag: "IoT Wireless Chip",
    whatItDoes: "Adds Wi-Fi network connectivity and web hosting capabilities to projects.",
    whatStudentsLearn: "IoT protocols, IP addressing, HTTP web servers, client-server client architecture, and wireless telemetry.",
    iconName: "Wifi",
    hotspotCoords: { x: 75, y: 40 },
    specs: "Tensilica 32-bit CPU, 80MHz, Integrated 802.11 b/g/n Wi-Fi stack",
    connectedProjectIds: ["wifi-controlled-robot", "custom-robot-challenge"],
    connectedSkills: ["IoT", "Programming", "Problem Solving"],
    color: "from-emerald-500 to-teal-500"
  },
  {
    id: "l298n-driver",
    name: "L298N Motor Driver",
    labelAlias: "Power Control",
    roleTag: "Dual H-Bridge Driver",
    whatItDoes: "Controls motor rotational direction and speed by amplifying low-power signals from the microcontroller to high-power motor currents.",
    whatStudentsLearn: "H-Bridge circuit theory, PWM motor speed control, electrical isolation, and inductive kickback protection.",
    iconName: "Zap",
    hotspotCoords: { x: 70, y: 70 },
    specs: "Dual H-Bridge, Peak Current: 2A per bridge, Voltage range: 5V - 35V",
    connectedProjectIds: ["obstacle-avoiding-robot", "line-following-robot", "bluetooth-controlled-robot", "wifi-controlled-robot"],
    connectedSkills: ["Electronics", "Robotics", "Engineering Thinking"],
    color: "from-rose-500 to-red-500"
  },
  {
    id: "bluetooth-hc05",
    name: "Bluetooth Module (HC-05)",
    labelAlias: "Wireless RX",
    roleTag: "Serial Wireless Link",
    whatItDoes: "Enables wireless data transfer between smartphones/tablets and the microcontroller board.",
    whatStudentsLearn: "UART serial communication, baud rates, pairing protocols, and mobile app command parsing.",
    iconName: "Bluetooth",
    hotspotCoords: { x: 25, y: 40 },
    specs: "Bluetooth v2.0+EDR, Frequency: 2.4GHz ISM, Range ~10 meters",
    connectedProjectIds: ["bluetooth-controlled-robot"],
    connectedSkills: ["Programming", "Robotics", "IoT"],
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: "dc-motors",
    name: "4 x Dual-Shaft Gear Motors",
    labelAlias: "Traction",
    roleTag: "Drive Motors",
    whatItDoes: "Converts electrical power into rotational torque to drive the 4-wheel robot chassis.",
    whatStudentsLearn: "Gearbox speed-torque trade-offs, back EMF, and mechanical drive train alignment.",
    iconName: "Disc",
    hotspotCoords: { x: 20, y: 85 },
    specs: "Operating Voltage: 3V-9V, Gear Ratio 1:48, Torque 0.8 kg-cm",
    connectedProjectIds: ["obstacle-avoiding-robot", "line-following-robot", "bluetooth-controlled-robot", "wifi-controlled-robot"],
    connectedSkills: ["Robotics", "Engineering Thinking"],
    color: "from-green-500 to-emerald-600"
  }
];
