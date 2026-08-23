import { DomainSlug, PRODUCT_DOMAINS } from "./domains";
export type { DomainSlug };
export { PRODUCT_DOMAINS };

export type CategoryId = 
  | 'all'
  | 'diy'
  | 'robotics'
  | 'music'
  | 'medical'
  | 'aero'
  | 'water'
  | 'realtime'
  | 'ai'
  | 'games';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  fullName: string;
  description: string;
  icon: string;
}

export const PRODUCT_CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'All', fullName: 'All STEM Kits', description: 'Explore our complete catalog of hands-on hardware kits.', icon: 'bi-grid-fill' },
  { id: 'diy', label: 'DIY', fullName: 'Basic DIY Kits', description: 'Essential electronic circuits, resistors, breadboards, and logic gates.', icon: 'bi-tools' },
  { id: 'robotics', label: 'Robotics', fullName: 'Robotic Kits', description: 'Autonomous rovers, motor drivers, sensor fusion, and mechanical arms.', icon: 'bi-robot' },
  { id: 'music', label: 'Music', fullName: 'Music Kits', description: 'Synthesizers, MIDI controllers, capacitive touch audio, and visualizers.', icon: 'bi-music-note-beamed' },
  { id: 'medical', label: 'Medical', fullName: 'Medical Kits', description: 'Biomedical sensors, heart rate monitors, ECG pulses, and bio-telemetry.', icon: 'bi-heart-pulse' },
  { id: 'aero', label: 'Aero', fullName: 'Aero Kits', description: 'DIY quadcopter flight drones, aerodynamics, and 6-axis gyroscope stabilization.', icon: 'bi-send' },
  { id: 'water', label: 'Water', fullName: 'Water Kits', description: 'Aquatic boats, solar thrusters, waterproofing, and water quality probes.', icon: 'bi-droplet' },
  { id: 'realtime', label: 'Real-Time', fullName: 'Real-Time Projects', description: 'IoT sensor hubs, cloud telemetry dashboards, and smart automation.', icon: 'bi-broadcast' },
  { id: 'ai', label: 'AI', fullName: 'AI-Based Kits', description: 'Computer vision, ESP32-CAM, optical tracking, and voice AI speech processing.', icon: 'bi-cpu' },
  { id: 'games', label: 'Games', fullName: 'Fun Games Kits', description: 'Retro handheld arcade consoles, reflex speed testers, and buzzer engines.', icon: 'bi-controller' },
];

export interface LearningModule {
  title: string;
  duration: string;
  type: 'setup' | 'theory' | 'build' | 'code' | 'experiment';
  description: string;
}

export interface KitProduct {
  id: string;
  name: string;
  categoryId: CategoryId;
  domainSlug?: DomainSlug;
  categoryLabel: string;
  categoryFullName: string;
  category?: string;
  color?: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  badge: string;
  rating: number;
  reviewCount: number;
  projectsCount: number;
  targetAge: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  whatsInside: string[];
  learningOutcomes: string[];
  specifications: { label: string; value: string }[];
  downloadableManualUrl: string;
  downloadableProjectListUrl: string;
  icon: string;
  image?: string;
  learningModules: LearningModule[];
  relatedProjectIds: string[];
}

export const STEM_KITS_CATALOG: KitProduct[] = [
  // 1. Basic DIY Kits (DIY)
  {
    id: "basic-electronics-circuit-starter",
    name: "SEIKO Circuit Starter Kit",
    categoryId: "diy",
    categoryLabel: "DIY",
    categoryFullName: "Basic DIY Kits",
    tagline: "The Gateway to Electricity & Circuit Theory",
    description: "Learn how current flows through resistors, capacitors, LEDs, transistors, and digital logic gates using safe solderless connections.",
    price: 79,
    originalPrice: 99,
    badge: "Essential DIY",
    rating: 4.9,
    reviewCount: 420,
    projectsCount: 15,
    targetAge: "Ages 8+ to Beginners",
    difficulty: "Beginner",
    whatsInside: [
      "830 Tie-Point Solderless Breadboard",
      "100+ Resistors, Capacitors, Diodes & Transistors",
      "74HC Series Logic Gate ICs (AND, OR, NOT)",
      "Potentiometers, Relays & Photoresistors",
      "Illustrated 80-Page Starter Workbook"
    ],
    learningOutcomes: [
      "Ohm's Law & Circuit Analysis",
      "Boolean Logic & Digital Switches",
      "Troubleshooting Electrical Connections"
    ],
    specifications: [
      { label: "Components", value: "150+ Discrete Parts" },
      { label: "Power Source", value: "Safe 5V DC USB / 9V Battery" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-tools",
    image: "/assets/kit-starter.jpg",
    learningModules: [
      { title: "Unboxing & Component Identification", duration: "20 min", type: "setup", description: "Identify each resistor, capacitor, LED, and IC chip. Learn to read color bands and component markings." },
      { title: "Ohm's Law & Voltage Dividers", duration: "30 min", type: "theory", description: "Understand the relationship between voltage, current, and resistance. Build your first voltage divider circuit." },
      { title: "LED Circuits & Transistor Switches", duration: "40 min", type: "build", description: "Wire LEDs with current-limiting resistors and build NPN transistor switching circuits on the breadboard." },
      { title: "Logic Gates & Boolean Algebra", duration: "45 min", type: "code", description: "Use 74HC series ICs to build AND, OR, and NOT gates. Verify truth tables with LED indicators." },
      { title: "Design Your Own Circuit", duration: "60 min", type: "experiment", description: "Combine resistors, transistors, and logic gates to design a custom alarm or light sequencer circuit." }
    ],
    relatedProjectIds: ["obstacle-avoiding-robot", "line-following-robot"]
  },
  {
    id: "diy-solderless-electronics-lab",
    name: "SEIKO Electronics Workbench Lab",
    categoryId: "diy",
    categoryLabel: "DIY",
    categoryFullName: "Basic DIY Kits",
    tagline: "Complete Hands-On Component Lab",
    description: "A comprehensive hardware workbench with digital multimeter, variable power supply module, and breadboard prototyping components.",
    price: 99,
    originalPrice: 129,
    badge: "Workbench Special",
    rating: 4.8,
    reviewCount: 280,
    projectsCount: 20,
    targetAge: "Ages 10+",
    difficulty: "Beginner",
    whatsInside: [
      "Compact Digital Multimeter",
      "Dual Voltage Power Supply Shield",
      "High-Density Breadboard Station",
      "65x Color-Coded Flexible Jumper Wires",
      "Component Storage Compartment Case"
    ],
    learningOutcomes: [
      "Measuring Voltage, Current & Resistance",
      "Voltage Regulation & Power Distribution",
      "Breadboard Prototyping Speed"
    ],
    specifications: [
      { label: "Multimeter", value: "CAT-II 600V Precision Meter" },
      { label: "Power Output", value: "3.3V / 5V Regulated Rails" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-border-inner",
    image: "/assets/kit-workbench.jpg",
    learningModules: [
      { title: "Setting Up Your Workbench", duration: "15 min", type: "setup", description: "Assemble the power supply module, connect the multimeter probes, and organize your component storage case." },
      { title: "Measuring Voltage, Current & Resistance", duration: "30 min", type: "theory", description: "Learn to use each multimeter mode. Measure real component values and compare with rated specifications." },
      { title: "Power Supply Regulation Circuit", duration: "35 min", type: "build", description: "Wire the dual-voltage power supply shield to deliver stable 3.3V and 5V rails to your breadboard." },
      { title: "Continuity Testing & Debugging", duration: "25 min", type: "code", description: "Use the multimeter's continuity mode to trace broken connections and diagnose faulty wiring." },
      { title: "Rapid Prototyping Challenge", duration: "45 min", type: "experiment", description: "Build a complete sensor-to-LED indicator circuit from scratch using only your workbench tools." }
    ],
    relatedProjectIds: ["obstacle-avoiding-robot", "line-following-robot"]
  },

  // 2. Robotic Kits (Robotics)
  {
    id: "smart-robotics-rover-kit",
    name: "SEIKO RoverX: ESP32 4WD Connected RC Bot",
    domainSlug: "robotics",
    categoryId: "robotics",
    categoryLabel: "Robotics",
    categoryFullName: "Robotic Kits",
    tagline: "Dual-Core ESP32 Wi-Fi & Bluetooth Teleoperation with Type-C 2S Fast-Charge",
    description: "Construct a high-torque 4-wheel drive wireless smart car powered by an ESP32 dual-core microcontroller. Drive wirelessly from any smartphone browser via local Wi-Fi Access Point, pair Bluetooth gamepads, and charge effortlessly with the onboard Type-C 2S BMS module.",
    price: 149,
    originalPrice: 199,
    badge: "Flagship RC Bot",
    rating: 4.9,
    reviewCount: 384,
    projectsCount: 10,
    targetAge: "Ages 10+ to College Engineering",
    difficulty: "Beginner",
    whatsInside: [
      "ESP32 Dual-Core Wi-Fi & Bluetooth Microcontroller",
      "L298N Heavy-Duty Dual H-Bridge Motor Controller",
      "4x TT DC High-Torque Gearbox Motors",
      "4x 65mm All-Terrain Rubber Treaded Wheels",
      "Rechargeable 2S 7.4V Li-ion Battery Pack",
      "Type-C 2S Fast-Charging & BMS Protection Module",
      "Dual-Layer Laser-Cut Acrylic Chassis Kit & Standoffs",
      "Solderless Dupont Jumper Wires & Power Switch"
    ],
    learningOutcomes: [
      "ESP32 Wi-Fi SoftAP & HTML5 Web Joystick Teleoperation",
      "L298N H-Bridge PWM Motor Speed Modulation",
      "Type-C 2S Lithium Power Management & BMS Circuits"
    ],
    specifications: [
      { label: "Microcontroller", value: "ESP32 32-bit Dual-Core 240MHz MCU" },
      { label: "Drivetrain", value: "4WD (4x TT Geared DC Motors 1:48)" },
      { label: "Power & Charging", value: "7.4V 2S Li-ion with Onboard Type-C 2S BMS" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-robot",
    image: "/assets/kit-robotics.jpg",
    learningModules: [
      { title: "Chassis Mechanics & 4WD Drivetrain Assembly", duration: "40 min", type: "setup", description: "Assemble the dual-layer acrylic chassis, mount 4 TT motors, press-fit 4 rubber wheels, and install Type-C charging port." },
      { title: "L298N Motor Driver, ESP32 GPIOs & Power Wiring", duration: "45 min", type: "theory", description: "Wire motors in parallel pairs, configure ESP32 PWM pins, establish common ground, and connect the 2S battery pack." },
      { title: "ESP32 Wi-Fi SoftAP & Smartphone Web Joystick", duration: "50 min", type: "code", description: "Flash the C++ web server firmware to host a browser-based touch joystick for app-free smartphone control." },
      { title: "Bluetooth BLE Gamepad Control & Speed Tuning", duration: "30 min", type: "experiment", description: "Pair Bluetooth controllers, calibrate PWM motor trim to eliminate drift, and test high-speed agility." }
    ],
    relatedProjectIds: ["obstacle-avoiding-robot", "line-following-robot", "custom-robot-challenge"]
  },
  {
    id: "robotic-arm-kinetic-kit",
    name: "SEIKO Robotic Arm & Servo Controller",
    categoryId: "robotics",
    categoryLabel: "Robotics",
    categoryFullName: "Robotic Kits",
    tagline: "4-DOF Kinematic Desktop Manipulator",
    description: "Assemble a 4-degree-of-freedom robotic claw manipulator driven by precision micro servos and dual analog joystick controllers.",
    price: 179,
    originalPrice: 229,
    badge: "Robotics Pro",
    rating: 4.9,
    reviewCount: 190,
    projectsCount: 8,
    targetAge: "Ages 12+",
    difficulty: "Intermediate",
    whatsInside: [
      "Precision Acrylic Mechanical Arm Frame",
      "4x SG90 Metal-Gear High-Torque Micro Servos",
      "Dual Analog Axis Joystick Module Board",
      "Multi-Channel Servo Driver Shield",
      "Object Pickup & Sorting Challenge Guide"
    ],
    learningOutcomes: [
      "Inverse Kinematics & Angular Servo Positions",
      "Joystick Signal Mapping & Calibration",
      "Industrial Pick-and-Place Automation"
    ],
    specifications: [
      { label: "Degrees of Freedom", value: "4 Servo Joints (Base, Arm, Wrist, Claw)" },
      { label: "Payload Capacity", value: "80g Object Pick-up" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-diagram-3",
    image: "/assets/hero-banner.jpg",
    learningModules: [
      { title: "Arm Frame Assembly", duration: "30 min", type: "setup", description: "Assemble the acrylic arm segments, attach servo brackets, and install the gripper claw mechanism." },
      { title: "Inverse Kinematics Basics", duration: "25 min", type: "theory", description: "Understand how angular positions of servo joints translate to physical arm reach and claw positioning." },
      { title: "Servo Wiring & Calibration", duration: "35 min", type: "build", description: "Connect all 4 servos to the driver shield, calibrate PWM ranges, and set mechanical zero positions." },
      { title: "Joystick Control Programming", duration: "40 min", type: "code", description: "Map analog joystick XY values to proportional servo angles for smooth, intuitive arm movement." },
      { title: "Pick-and-Place Sorting Challenge", duration: "45 min", type: "experiment", description: "Program the arm to pick up objects from one zone and sort them into color-coded bins." }
    ],
    relatedProjectIds: ["obstacle-avoiding-robot", "custom-robot-challenge"]
  },

  // 3. Music Kits (Music)
  {
    id: "digital-synthesizer-midi-kit",
    name: "SEIKO Capacitive Touch MIDI Synthesizer",
    categoryId: "music",
    categoryLabel: "Music",
    categoryFullName: "Music Kits",
    tagline: "Build a Digital Piano & MIDI Audio Engine",
    description: "Create an 8-note capacitive touch piano keyboard. Synthesize waveforms, program pitch modulation, and stream MIDI audio over USB.",
    price: 119,
    originalPrice: 149,
    badge: "Audio Creator",
    rating: 4.9,
    reviewCount: 210,
    projectsCount: 8,
    targetAge: "Ages 10+",
    difficulty: "Intermediate",
    whatsInside: [
      "MPR121 Capacitive Touch Sensor PCB",
      "I2S Audio DAC Amplifier Breakout Board",
      "8-Key Conductive Touch Keypad Surface",
      "High-Fidelity Mini Speaker & Volume Dial",
      "USB MIDI Firmware Library"
    ],
    learningOutcomes: [
      "Capacitive Touch Sensing Physics",
      "Audio Waveform Synthesis (Square, Sine, Saw)",
      "USB MIDI Protocol Integration"
    ],
    specifications: [
      { label: "Audio Output", value: "16-bit 44.1kHz I2S DAC" },
      { label: "Keys", value: "8 Touch Pads + 2 Octave Shift Buttons" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-music-note-beamed",
    image: "/assets/kit-starter.jpg",
    learningModules: [
      { title: "Sensor & Speaker Setup", duration: "20 min", type: "setup", description: "Connect the MPR121 capacitive touch sensor, I2S DAC amplifier, and mini speaker to your microcontroller." },
      { title: "Sound Wave Physics", duration: "25 min", type: "theory", description: "Learn how digital signals become analog sound waves through DAC conversion and speaker cone vibration." },
      { title: "Building the Touch Keyboard", duration: "35 min", type: "build", description: "Arrange 8 conductive touch pads, wire them to the MPR121, and mount the octave shift buttons." },
      { title: "Waveform Synthesis Code", duration: "45 min", type: "code", description: "Program sine, square, and sawtooth waveform generators. Add pitch modulation and volume control." },
      { title: "MIDI Controller Mode", duration: "40 min", type: "experiment", description: "Enable USB MIDI output to control digital audio workstation software from your hardware keyboard." }
    ],
    relatedProjectIds: []
  },
  {
    id: "soundwave-visualizer-kit",
    name: "SEIKO Oscilloscope & Sound Spectrum Visualizer",
    categoryId: "music",
    categoryLabel: "Music",
    categoryFullName: "Music Kits",
    tagline: "Visualize Sound Frequency Waveforms in Real Time",
    description: "Sample biological ambient acoustics and music beats using a microphone sensor module. Render live frequency FFT bars on an OLED screen.",
    price: 139,
    originalPrice: 179,
    badge: "Audio Spectrum",
    rating: 4.8,
    reviewCount: 145,
    projectsCount: 6,
    targetAge: "Ages 12+",
    difficulty: "Advanced",
    whatsInside: [
      "Electret Condenser Microphone Preamplifier",
      "0.96\" High-Speed I2C Monochrome OLED Screen",
      "Signal Filtering Capacitor Array",
      "Real-Time FFT Audio Analysis Firmware",
      "Acrylic Desktop Visualizer Casing"
    ],
    learningOutcomes: [
      "Fast Fourier Transform (FFT) Signal Math",
      "Analog-to-Digital Sampling Rates & Nyquist",
      "OLED Graphic Display Buffer Rendering"
    ],
    specifications: [
      { label: "Display", value: "128x64 Pixel I2C Graphic OLED" },
      { label: "Sampling Rate", value: "9.6kHz Audio ADC Sampling" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-activity",
    image: "/assets/kit-workbench.jpg",
    learningModules: [
      { title: "Microphone & Display Assembly", duration: "20 min", type: "setup", description: "Wire the electret microphone preamplifier and OLED display to the I2C bus on your microcontroller." },
      { title: "FFT & Frequency Analysis Theory", duration: "30 min", type: "theory", description: "Understand Fast Fourier Transform math that converts time-domain audio into frequency spectrum bars." },
      { title: "Audio Sampling Circuit", duration: "30 min", type: "build", description: "Add signal filtering capacitors and tune the ADC sampling rate for clean audio signal capture." },
      { title: "Real-Time Spectrum Renderer", duration: "45 min", type: "code", description: "Program the FFT algorithm and render live frequency bars on the 128x64 OLED pixel buffer." },
      { title: "Desktop Visualizer Build", duration: "35 min", type: "experiment", description: "Assemble the acrylic casing and create custom display modes for music visualization." }
    ],
    relatedProjectIds: []
  },

  // 4. Medical Kits (Medical)
  {
    id: "medical-stem-bio-electronics-kit",
    name: "SEIKO Bio-Electronics Medical Kit",
    categoryId: "medical",
    categoryLabel: "Medical",
    categoryFullName: "Medical Kits",
    tagline: "Learn Biomedical Engineering by Building Health Tech",
    description: "Build real working biomedical devices! Measure heart rate, plot ECG pulse waveforms, capture muscle contraction signals, and monitor oxygen levels.",
    price: 169,
    originalPrice: 219,
    badge: "Medical Pioneer",
    rating: 4.9,
    reviewCount: 178,
    projectsCount: 7,
    targetAge: "Ages 12+ & Bio-Engineering Students",
    difficulty: "Intermediate",
    whatsInside: [
      "MAX30102 Optical Heart Rate & SpO2 Sensor",
      "AD8232 ECG Bio-Amplifier Board with Electrodes",
      "EMG Muscle Electrical Activity Sensor Module",
      "Infrared Non-Contact Body Thermometer Probe",
      "0.96\" Graphic Medical Telemetry Display"
    ],
    learningOutcomes: [
      "Biomedical Signal Filtering & Amplification",
      "Human Physiological Heart Pulse Waveforms",
      "Medical Device Prototyping Protocols"
    ],
    specifications: [
      { label: "Sensors", value: "Optical Pulse, ECG, EMG, IR Temp" },
      { label: "Signal Precision", value: "18-bit Low-Noise ADC" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-heart-pulse",
    image: "/assets/kit-sensor.jpg",
    learningModules: [
      { title: "Sensor Board Identification", duration: "20 min", type: "setup", description: "Identify MAX30102, AD8232, EMG, and IR thermometer modules. Connect the OLED telemetry display." },
      { title: "Biomedical Signal Theory", duration: "35 min", type: "theory", description: "Learn how photoplethysmography measures pulse rate and how ECG electrodes detect cardiac electrical activity." },
      { title: "Heart Rate Monitor Build", duration: "40 min", type: "build", description: "Wire the MAX30102 optical sensor to I2C, place your fingertip, and display live BPM readings on the OLED." },
      { title: "ECG Waveform Plotter Code", duration: "45 min", type: "code", description: "Program the AD8232 amplifier to capture and plot real-time ECG pulse waveforms on the serial plotter." },
      { title: "Multi-Sensor Health Dashboard", duration: "50 min", type: "experiment", description: "Combine heart rate, body temperature, and muscle activity into a unified health telemetry dashboard." }
    ],
    relatedProjectIds: ["biomedical-heart-rate-monitor"]
  },
  {
    id: "infrared-health-telemetry-kit",
    name: "SEIKO Touchless Health Telemetry Monitor",
    categoryId: "medical",
    categoryLabel: "Medical",
    categoryFullName: "Medical Kits",
    tagline: "Non-Contact Temperature & Pulse Diagnostic Station",
    description: "Design a desktop medical triage station. Read non-contact skin temperature and optical pulse rate, displaying health status LEDs.",
    price: 129,
    originalPrice: 169,
    badge: "Health Telemetry",
    rating: 4.8,
    reviewCount: 110,
    projectsCount: 5,
    targetAge: "Ages 10+",
    difficulty: "Beginner",
    whatsInside: [
      "GY-906 MLX90614 Infrared Medical Temp Sensor",
      "Fingertip Pulse Oximeter Photodiode Module",
      "RGB Status LED Indicator Array",
      "Acoustic Alarm Buzzer Module",
      "Tabletop Health Monitor Enclosure"
    ],
    learningOutcomes: [
      "Infrared Blackbody Radiation Physics",
      "Photoplethysmography (PPG) Optical Sensing",
      "Diagnostic Threshold Alarm Logic"
    ],
    specifications: [
      { label: "Sensor Accuracy", value: "±0.2°C Temperature Accuracy" },
      { label: "Distance Range", value: "2cm to 5cm Non-Contact Sensing" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-thermometer-half",
    image: "/assets/kit-starter.jpg",
    learningModules: [
      { title: "Component Layout & Wiring", duration: "15 min", type: "setup", description: "Mount the IR temperature sensor and pulse oximeter module inside the desktop enclosure frame." },
      { title: "Infrared Radiation Physics", duration: "25 min", type: "theory", description: "Understand how the MLX90614 measures skin temperature using blackbody infrared emission detection." },
      { title: "Triage Station Assembly", duration: "30 min", type: "build", description: "Wire RGB status LEDs and alarm buzzer to create visual and audible health threshold indicators." },
      { title: "Threshold Alarm Logic", duration: "35 min", type: "code", description: "Program temperature and pulse rate threshold values that trigger red/green status LEDs and buzzer alerts." },
      { title: "Field Screening Simulation", duration: "30 min", type: "experiment", description: "Run a multi-person screening simulation and log results to test your triage station's accuracy." }
    ],
    relatedProjectIds: ["biomedical-heart-rate-monitor"]
  },

  // 5. Aero Kits (Aero)
  {
    id: "diy-quadcopter-flight-drone-kit",
    name: "SEIKO DIY Quadcopter Flight Drone Kit",
    categoryId: "aero",
    categoryLabel: "Aero",
    categoryFullName: "Aero Kits",
    tagline: "Assemble, Program & Fly Your Own Drone",
    description: "Learn aerodynamics, 6-axis gyroscope stabilization, and radio telemetry by assembling and programming your own 4-axis quadcopter drone.",
    price: 199,
    originalPrice: 259,
    badge: "Aeronautics Special",
    rating: 4.9,
    reviewCount: 156,
    projectsCount: 5,
    targetAge: "Ages 13+",
    difficulty: "Advanced",
    whatsInside: [
      "Carbon Fiber 4-Axis Drone Frame Chassis",
      "MPU6050 6-Axis Gyroscope & Accelerometer Module",
      "4x High-RPM Coreless Motors & Propeller Sets",
      "2.4GHz 6-Channel RF Wireless Transmitter Remote",
      "3.7V 850mAh LiPo Flight Battery & Charger"
    ],
    learningOutcomes: [
      "PID Flight Stabilization Loop Algorithms",
      "Aerodynamic Lift-to-Weight Mathematics",
      "Wireless Radio Receiver Calibration"
    ],
    specifications: [
      { label: "Flight Controller", value: "32-bit Core Processor" },
      { label: "Stabilization", value: "6-Axis MPU6050 IMU Gyro" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-send",
    image: "/assets/kit-smartcar.jpg",
    learningModules: [
      { title: "Frame & Motor Assembly", duration: "30 min", type: "setup", description: "Assemble the carbon fiber frame, mount 4 coreless motors, and attach propeller sets with correct rotation." },
      { title: "Aerodynamics & Flight Physics", duration: "25 min", type: "theory", description: "Learn lift-to-weight ratios, thrust vectoring, and how varying motor speeds controls yaw, pitch, and roll." },
      { title: "Gyroscope & ESC Wiring", duration: "35 min", type: "build", description: "Connect the MPU6050 IMU to the flight controller and wire ESC motor drivers to PWM output channels." },
      { title: "PID Stabilization Firmware", duration: "50 min", type: "code", description: "Implement proportional-integral-derivative control loops to auto-stabilize the quadcopter during hover." },
      { title: "First Flight & Calibration", duration: "40 min", type: "experiment", description: "Calibrate the RF transmitter, perform pre-flight checks, and execute your first controlled hover flight." }
    ],
    relatedProjectIds: ["diy-quadcopter-flight-controller"]
  },
  {
    id: "aero-wind-tunnel-simulator",
    name: "SEIKO Aero Thrust & Lift Simulator",
    categoryId: "aero",
    categoryLabel: "Aero",
    categoryFullName: "Aero Kits",
    tagline: "Test Airflow, Propeller Thrust & Aerodynamic Lift",
    description: "Build a miniature aero test bench. Measure propeller RPM, wind velocity, and electronic thrust forces using load cell sensors.",
    price: 149,
    originalPrice: 189,
    badge: "Aero Test Bench",
    rating: 4.8,
    reviewCount: 92,
    projectsCount: 6,
    targetAge: "Ages 12+",
    difficulty: "Intermediate",
    whatsInside: [
      "Precision Strain-Gauge Load Cell Sensor (5kg)",
      "Anemometer Wind Speed Turbine Wheel Module",
      "Optical Infrared RPM Tachometer Sensor",
      "Electronic Speed Controller (ESC) Driver",
      "Acrylic Aero Testing Channel Frame"
    ],
    learningOutcomes: [
      "Bernoulli's Principle & Airfoil Lift Force",
      "Tachometer Pulse Timing & RPM Math",
      "Propeller Thrust Efficiency Curve Analysis"
    ],
    specifications: [
      { label: "Thrust Sensor", value: "HX711 24-bit ADC Load Cell" },
      { label: "RPM Range", value: "0 to 30,000 RPM Sensing" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-wind",
    image: "/assets/kit-workbench.jpg",
    learningModules: [
      { title: "Test Bench Assembly", duration: "25 min", type: "setup", description: "Mount the load cell, anemometer, and RPM tachometer sensor onto the acrylic aero testing channel frame." },
      { title: "Bernoulli's Principle", duration: "20 min", type: "theory", description: "Learn how airflow velocity relates to pressure differences and how propeller blade pitch generates thrust." },
      { title: "Sensor Calibration Circuit", duration: "30 min", type: "build", description: "Wire the HX711 load cell amplifier and calibrate thrust readings using known reference weights." },
      { title: "Data Logging Firmware", duration: "40 min", type: "code", description: "Program the microcontroller to log RPM, wind speed, and thrust force data to serial output in real time." },
      { title: "Propeller Efficiency Curves", duration: "35 min", type: "experiment", description: "Test different propeller sizes and pitch angles to plot thrust-vs-RPM efficiency curves." }
    ],
    relatedProjectIds: ["diy-quadcopter-flight-controller"]
  },

  // 6. Water Kits (Water)
  {
    id: "autonomous-solar-water-boat-kit",
    name: "SEIKO Autonomous Solar Water Jet Boat",
    categoryId: "water",
    categoryLabel: "Water",
    categoryFullName: "Water Kits",
    tagline: "Marine Robotics & Renewable Solar Energy",
    description: "Build an autonomous catamaran watercraft driven by twin solar-charged waterjet thrusters. Program river navigation and water quality probes.",
    price: 139,
    originalPrice: 179,
    badge: "Marine Robotics",
    rating: 4.8,
    reviewCount: 94,
    projectsCount: 6,
    targetAge: "Ages 10+",
    difficulty: "Beginner",
    whatsInside: [
      "Waterproof Catamaran Twin Hull Vessel",
      "2x Submersible Waterproof Waterjet Thrusters",
      "High-Efficiency Monocrystalline Solar Panel",
      "Turbidity & Water pH Environmental Probe",
      "Floating RF Remote Transmitter Console"
    ],
    learningOutcomes: [
      "Hydrodynamics & Buoyancy Calculations",
      "Solar Power Generation & Battery Storage",
      "Environmental Water Quality Analytics"
    ],
    specifications: [
      { label: "Hull", value: "IP68 Sealed Waterproof Compartments" },
      { label: "Power", value: "Solar Panel + Rechargeable Battery" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-droplet",
    image: "/assets/kit-diy.jpg",
    learningModules: [
      { title: "Hull & Thruster Assembly", duration: "25 min", type: "setup", description: "Seal the catamaran hull compartments, install waterjet thrusters, and mount the solar panel on the deck." },
      { title: "Solar Energy & Buoyancy", duration: "20 min", type: "theory", description: "Learn photovoltaic energy conversion and calculate hull displacement for optimal buoyancy balance." },
      { title: "Waterproof Wiring", duration: "35 min", type: "build", description: "Apply marine silicone sealant around wire entry points and test waterproof integrity before launch." },
      { title: "Water Quality Probe Code", duration: "40 min", type: "code", description: "Program the turbidity and pH sensor probes to log water quality measurements during navigation runs." },
      { title: "River Navigation Test", duration: "45 min", type: "experiment", description: "Launch the boat, test solar charging efficiency, and collect environmental water quality data." }
    ],
    relatedProjectIds: ["autonomous-solar-water-boat"]
  },
  {
    id: "marine-hydro-submarine-kit",
    name: "SEIKO Hydro Submarine & Water Sensor Kit",
    categoryId: "water",
    categoryLabel: "Water",
    categoryFullName: "Water Kits",
    tagline: "Underwater Depth & Salinity Prototyping",
    description: "Construct a submersible hydro-robot capable of controlled water depth ballast pumping, temperature logging, and wireless water telemetry.",
    price: 159,
    originalPrice: 199,
    badge: "Submersible Tech",
    rating: 4.7,
    reviewCount: 78,
    projectsCount: 5,
    targetAge: "Ages 12+",
    difficulty: "Intermediate",
    whatsInside: [
      "Waterproof Syringe Ballast Mechanism",
      "Submersible DC Water Pump",
      "Water Temperature Sensor (DS18B20 Stainless)",
      "Underwater LED Floodlight Module",
      "Water Density & Salinity Conductivity Sensor"
    ],
    learningOutcomes: [
      "Archimedes' Buoyancy Principle & Ballast Control",
      "Submersible Gasket Pressure Sealing",
      "Underwater Environmental Telemetry"
    ],
    specifications: [
      { label: "Temp Sensor", value: "DS18B20 Waterproof Probe (-55°C to 125°C)" },
      { label: "Depth Rating", value: "1.5m Waterproof Submersion" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-tsunami",
    image: "/assets/kit-starter.jpg",
    learningModules: [
      { title: "Submarine Frame Assembly", duration: "30 min", type: "setup", description: "Assemble the waterproof hull, install the syringe ballast mechanism, and mount the DC water pump." },
      { title: "Archimedes' Buoyancy", duration: "20 min", type: "theory", description: "Understand how displacing water creates buoyant force and how ballast tanks control depth." },
      { title: "Sensor & LED Wiring", duration: "35 min", type: "build", description: "Wire the DS18B20 waterproof temperature probe, salinity sensor, and underwater LED floodlight." },
      { title: "Depth Control Firmware", duration: "45 min", type: "code", description: "Program the ballast pump to achieve controlled ascent and descent based on depth pressure readings." },
      { title: "Underwater Data Collection", duration: "40 min", type: "experiment", description: "Submerge the robot, log temperature and salinity data at different depths, and analyze the results." }
    ],
    relatedProjectIds: ["autonomous-solar-water-boat"]
  },

  // 7. Real-Time Projects (Real-Time)
  {
    id: "smart-home-iot-automation-kit",
    name: "SEIKO Real-Time IoT Sensor Station",
    categoryId: "realtime",
    categoryLabel: "Real-Time",
    categoryFullName: "Real-Time Projects",
    tagline: "Build Connected Smart Buildings & Sensor Cloud",
    description: "Transform space into a connected smart environment. Stream real-time temperature, humidity, light, and motion metrics to a smartphone dashboard.",
    price: 139,
    originalPrice: 179,
    badge: "Real-Time Cloud",
    rating: 4.8,
    reviewCount: 230,
    projectsCount: 8,
    targetAge: "Ages 11+",
    difficulty: "Intermediate",
    whatsInside: [
      "NodeMCU ESP8266 Wi-Fi Microcontroller",
      "DHT11 Environmental Temperature & Humidity Sensor",
      "Soil Moisture & Automatic Water Pump Shield",
      "4-Channel High Voltage Isolated Relay Board",
      "Gas & Smoke Leakage Alert Sensor Module"
    ],
    learningOutcomes: [
      "Real-Time Telemetry Data Streaming (MQTT/HTTP)",
      "Remote Smartphone Sensor Dashboards",
      "Relay Safety High Voltage Control"
    ],
    specifications: [
      { label: "Wi-Fi", value: "2.4GHz 802.11 b/g/n" },
      { label: "Telemetry Protocol", value: "MQTT / HTTP REST API Cloud" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-broadcast",
    image: "/assets/kit-iot.jpg",
    learningModules: [
      { title: "ESP8266 & Sensor Setup", duration: "20 min", type: "setup", description: "Flash the NodeMCU ESP8266 firmware, wire DHT11 sensor, soil moisture probe, and relay board." },
      { title: "IoT Protocols & Cloud", duration: "30 min", type: "theory", description: "Understand MQTT publish/subscribe messaging, HTTP REST APIs, and cloud telemetry dashboard platforms." },
      { title: "Smart Home Wiring", duration: "40 min", type: "build", description: "Connect relay-controlled appliances, gas leak sensor, and automatic water pump to the ESP8266 hub." },
      { title: "Smartphone Dashboard Code", duration: "45 min", type: "code", description: "Build a web server on ESP8266 that streams real-time sensor data to a smartphone browser dashboard." },
      { title: "Automation Rules Engine", duration: "35 min", type: "experiment", description: "Create if-then rules: auto-water plants when soil is dry, send SMS alerts on gas leak detection." }
    ],
    relatedProjectIds: ["custom-robot-challenge"]
  },
  {
    id: "realtime-traffic-transit-controller",
    name: "SEIKO Real-Time Smart Transit Controller",
    categoryId: "realtime",
    categoryLabel: "Real-Time",
    categoryFullName: "Real-Time Projects",
    tagline: "Real-Time Vehicle Flow & Intersection Telemetry",
    description: "Design an intelligent traffic management system. Detect vehicle queues in real time using ultrasonic sensors and adjust signal light matrices.",
    price: 119,
    originalPrice: 149,
    badge: "Smart Transit",
    rating: 4.9,
    reviewCount: 160,
    projectsCount: 7,
    targetAge: "Ages 10+",
    difficulty: "Beginner",
    whatsInside: [
      "Dual 8x8 LED Matrix Signal Displays",
      "2x Ultrasonic Vehicle Detection Sensors",
      "Pedestrian Touch Button Crosswalk Pins",
      "Acoustic Crossing Buzzer",
      "Intersection Simulation Road Mat"
    ],
    learningOutcomes: [
      "Finite State Machine (FSM) Timing Logic",
      "Real-Time Queue Detection Algorithms",
      "Pedestrian Priority Intercept Triggers"
    ],
    specifications: [
      { label: "Display", value: "Dual MAX7219 8x8 LED Matrices" },
      { label: "Update Rate", value: "50ms Real-Time Queue Scanning" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-clock-history",
    image: "/assets/kit-basic-electronics.jpg",
    learningModules: [
      { title: "LED Matrix & Sensor Setup", duration: "20 min", type: "setup", description: "Wire dual 8x8 LED matrix displays, ultrasonic vehicle detection sensors, and pedestrian push buttons." },
      { title: "Finite State Machine Theory", duration: "25 min", type: "theory", description: "Learn how traffic signal phases transition using FSM timing logic and priority interrupt triggers." },
      { title: "Intersection Wiring", duration: "30 min", type: "build", description: "Lay out the road mat, position sensors at approach lanes, and connect the crossing buzzer." },
      { title: "Traffic Control Algorithm", duration: "40 min", type: "code", description: "Program state-based signal timing with real-time queue detection and pedestrian priority intercepts." },
      { title: "Rush Hour Simulation", duration: "35 min", type: "experiment", description: "Simulate varying traffic volumes and measure how your algorithm adapts signal timing in real time." }
    ],
    relatedProjectIds: []
  },

  // 8. AI-Based Kits (AI)
  {
    id: "ai-vision-voice-robot-kit",
    name: "SEIKO AI Vision & Voice Autonomous Robot",
    categoryId: "ai",
    categoryLabel: "AI",
    categoryFullName: "AI-Based Kits",
    tagline: "Computer Vision, Facial Recognition & Speech AI",
    description: "Equipped with an ESP32-CAM optical sensor and speech processing module. Program face detection, color blob tracking, and voice commands.",
    price: 189,
    originalPrice: 249,
    badge: "AI Vision Pioneer",
    rating: 4.9,
    reviewCount: 215,
    projectsCount: 8,
    targetAge: "Ages 12+ & CS Students",
    difficulty: "Advanced",
    whatsInside: [
      "ESP32-CAM Dual-Core Board with OV2640 Camera Lens",
      "Voice Recognition & Speech Synthesizer Module",
      "Pan-Tilt Dual Servo Camera Rig Gimbal",
      "High-Torque Motors & Tracked Robot Chassis",
      "Onboard Machine Learning Model Processing Memory"
    ],
    learningOutcomes: [
      "Computer Vision (OpenCV) & Object Recognition",
      "Speech Signal Processing & Voice Model Inference",
      "Edge AI Model Deployment"
    ],
    specifications: [
      { label: "AI Core", value: "ESP32-S3 Dual-Core 240MHz Processor" },
      { label: "Camera", value: "2MP OV2640 Lens Module" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-cpu",
    image: "/assets/kit-expansion.jpg",
    learningModules: [
      { title: "ESP32-CAM & Chassis Assembly", duration: "25 min", type: "setup", description: "Mount the ESP32-CAM on the pan-tilt gimbal, attach it to the tracked chassis, and connect motor drivers." },
      { title: "Computer Vision Fundamentals", duration: "30 min", type: "theory", description: "Learn how image frames are captured, processed for face detection, and converted to motor commands." },
      { title: "Camera Gimbal & Motors", duration: "40 min", type: "build", description: "Wire pan/tilt servos to GPIO pins, connect the voice module, and test camera stream output." },
      { title: "Face Tracking AI Code", duration: "50 min", type: "code", description: "Deploy the face detection model, calculate bounding box centers, and map them to servo tracking angles." },
      { title: "Voice Command Control", duration: "40 min", type: "experiment", description: "Train custom voice commands to control the robot: 'follow', 'stop', 'scan', and 'return home'." }
    ],
    relatedProjectIds: ["ai-face-tracking-camera-bot", "custom-robot-challenge"]
  },
  {
    id: "ai-gesture-neural-flight-controller",
    name: "SEIKO AI Neural Gesture Controller",
    categoryId: "ai",
    categoryLabel: "AI",
    categoryFullName: "AI-Based Kits",
    tagline: "Translate Hand Motion into Hardware Actions with ML",
    description: "Sense 6-axis spatial motion and train a tiny neural network to recognize custom hand gestures to control hardware wirelessly.",
    price: 199,
    originalPrice: 259,
    badge: "Neural Edge AI",
    rating: 4.9,
    reviewCount: 134,
    projectsCount: 6,
    targetAge: "Ages 13+",
    difficulty: "Advanced",
    whatsInside: [
      "6-Axis IMU Spatial Motion Sensor (MPU6050)",
      "Wearable Hand Glove Mount Frame",
      "Micro-OLED Neural Confidence Meter",
      "TinyML Gesture Classifier Library",
      "RF Wireless Command Transmitter"
    ],
    learningOutcomes: [
      "Training TinyML Classifiers on Accelerometer Data",
      "Kinetic Spatial Vector Processing",
      "Wireless Machine Learning Control"
    ],
    specifications: [
      { label: "ML Engine", value: "TensorFlow Lite for Microcontrollers" },
      { label: "Sensor", value: "6-DOF Gyro & Accelerometer" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-hand-index",
    image: "/assets/kit-robotics.jpg",
    learningModules: [
      { title: "IMU Sensor & Glove Setup", duration: "20 min", type: "setup", description: "Mount the MPU6050 6-axis sensor onto the wearable glove frame and connect the OLED confidence meter." },
      { title: "Motion Vectors & ML Basics", duration: "30 min", type: "theory", description: "Learn how accelerometer and gyroscope readings form 6D feature vectors for gesture classification." },
      { title: "Gesture Data Collection", duration: "35 min", type: "build", description: "Record training data by performing each gesture multiple times while the sensor logs acceleration patterns." },
      { title: "TinyML Classifier Training", duration: "50 min", type: "code", description: "Train a TensorFlow Lite model on your gesture data and deploy it to the microcontroller for real-time inference." },
      { title: "Wireless Hardware Control", duration: "40 min", type: "experiment", description: "Use recognized gestures to wirelessly control LEDs, servos, or a robot via the RF command transmitter." }
    ],
    relatedProjectIds: ["ai-face-tracking-camera-bot"]
  },

  // 9. Fun Games Kits (Games)
  {
    id: "retro-arcade-console-game-engine",
    name: "SEIKO Retro Arcade Console Engine",
    categoryId: "games",
    categoryLabel: "Games",
    categoryFullName: "Fun Games Kits",
    tagline: "Build a Handheld Gaming Console & Code Games in C++",
    description: "Assemble a retro handheld game console with OLED screen, D-pad button array, and sound buzzer. Code classic 2D games like Snake, Pong, and Flappy Bird.",
    price: 109,
    originalPrice: 139,
    badge: "Arcade Engine",
    rating: 4.9,
    reviewCount: 310,
    projectsCount: 10,
    targetAge: "Ages 8+",
    difficulty: "Beginner",
    whatsInside: [
      "Custom Handheld Console PCB Shell",
      "1.3\" High-Contrast Mono OLED Screen (128x64)",
      "4-Way Tactile D-Pad & Dual Action Buttons",
      "Piezo Sound Effect Buzzer",
      "2D Game Engine C++ Library Workbook"
    ],
    learningOutcomes: [
      "2D Pixel Grid Rendering & Frame Buffers",
      "Collision Detection & Game Physics Math",
      "High-Score EEPROM Non-Volatile Storage"
    ],
    specifications: [
      { label: "Display", value: "1.3\" SPI OLED Screen" },
      { label: "Controls", value: "D-Pad, Select, Start, A/B Action Buttons" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-controller",
    image: "/assets/kit-basic-electronics.jpg",
    learningModules: [
      { title: "Console PCB Assembly", duration: "20 min", type: "setup", description: "Attach the OLED screen, solder the D-pad and action button array, and mount the piezo buzzer." },
      { title: "2D Game Engine Theory", duration: "25 min", type: "theory", description: "Understand pixel buffers, frame rates, sprite rendering, and how game loops process input each tick." },
      { title: "Button Input Wiring", duration: "25 min", type: "build", description: "Wire D-pad directional buttons and A/B action buttons to digital input pins with pull-up resistors." },
      { title: "Code Your First Game", duration: "50 min", type: "code", description: "Build a classic Snake game from scratch: render the grid, handle input, detect collisions, and track score." },
      { title: "Custom Game Challenge", duration: "45 min", type: "experiment", description: "Design your own original game with custom sprites, difficulty levels, and high-score EEPROM storage." }
    ],
    relatedProjectIds: []
  },
  {
    id: "reflex-speed-reaction-tester",
    name: "SEIKO Reflex & Speed Reaction Tester",
    categoryId: "games",
    categoryLabel: "Games",
    categoryFullName: "Fun Games Kits",
    tagline: "Test Millisecond Reflexes with Light & Sound Challengers",
    description: "Build an interactive electronic reflex arena! Race against random LED triggers, record reaction times down to microseconds, and challenge friends.",
    price: 89,
    originalPrice: 119,
    badge: "Speed Arcade",
    rating: 4.8,
    reviewCount: 220,
    projectsCount: 6,
    targetAge: "Ages 8+",
    difficulty: "Beginner",
    whatsInside: [
      "4x Large Illuminated Arcade Push Buttons",
      "4-Digit 7-Segment Microsecond Timer Display",
      "High-Speed Interrupt Input Shield",
      "Sound Effect Speaker Horn",
      "Multiplayer Score Memory Firmware"
    ],
    learningOutcomes: [
      "Hardware Interrupt Pins (`attachInterrupt`)",
      "Microsecond Timer Math (`micros()`)",
      "Random Seed Delay Generation"
    ],
    specifications: [
      { label: "Timer Resolution", value: "1 Microsecond Precision" },
      { label: "Game Modes", value: "4 Game Modes (Solo, Duel, Survival, Memory)" }
    ],
    downloadableManualUrl: "#manual",
    downloadableProjectListUrl: "#projects",
    icon: "bi-lightning-charge",
    image: "/assets/kit-starter.jpg",
    learningModules: [
      { title: "Button & Timer Setup", duration: "15 min", type: "setup", description: "Mount the 4 illuminated arcade push buttons, 7-segment timer display, and speaker horn on the game board." },
      { title: "Hardware Interrupts Theory", duration: "20 min", type: "theory", description: "Learn how attachInterrupt() captures button presses with microsecond precision without polling delays." },
      { title: "Game Board Wiring", duration: "25 min", type: "build", description: "Connect each button to an interrupt-capable pin and wire the 7-segment display via shift register." },
      { title: "Reaction Timer Code", duration: "35 min", type: "code", description: "Program random LED trigger sequences, capture reaction times with micros(), and display results." },
      { title: "Multiplayer Tournament", duration: "30 min", type: "experiment", description: "Challenge friends in duel mode, survival mode, and memory sequence mode. Track high scores." }
    ],
    relatedProjectIds: []
  }
];

export const MAIN_KIT = STEM_KITS_CATALOG[2]; // Flagship Smart Robotics Kit
