export type DomainSlug =
  | 'robotics'
  | 'water-aqua'
  | 'music-sound'
  | 'iot-smart-devices'
  | 'biomedical-health'
  | 'vehicles-transportation'
  | 'space-aerospace'
  | 'agriculture-environment'
  | 'smart-home-automation'
  | 'energy-power'
  | 'safety-security'
  | 'science-experiments'
  | 'gaming-interactive'
  | 'ai-intelligent-machines'
  | 'mechanical-machines'
  | 'aviation'
  | 'communication'
  | 'disaster-rescue'
  | 'smart-city'
  | 'industrial-automation';

export interface ProductDomain {
  slug: DomainSlug;
  title: string;
  shortLabel: string;
  discipline: string;
  tagline: string;
  description: string;
  image: string;
  icon: string;
  color: string;
  purpose: string;
  applications: string[];
  featuredKits: string[];
  hardwareComponents: string[];
  targetAudience: string;
  needToUpdate?: boolean;
}

export const PRODUCT_DOMAINS: ProductDomain[] = [
  {
    slug: 'robotics',
    title: 'Robotics',
    shortLabel: 'Robotics',
    discipline: 'Autonomous Systems & Kinematics',
    tagline: 'Dual-Core ESP32 Wi-Fi & Bluetooth Teleoperation with Type-C 2S Fast-Charge',
    description: 'Construct a high-torque 4-wheel drive wireless smart car with ESP32 Wi-Fi web controller and Type-C 2S charging.',
    image: '/assets/kit-robotics.jpg',
    icon: 'bi-robot',
    color: '#8A965E',
    purpose: 'Teaches students how mechanical structures, L298N motor drivers, ESP32 Wi-Fi web servers, and Type-C 2S power electronics combine into a responsive 4WD smart vehicle.',
    applications: ['Smartphone Web Joystick Control', 'Bluetooth BLE Teleoperation', '4WD Differential Drive Kinematics', 'Type-C 2S Fast Charging'],
    featuredKits: ['SEIKO RoverX: ESP32 4WD Connected RC Bot'],
    hardwareComponents: ['ESP32 Dual-Core MCU', 'L298N Motor Driver', '4x TT Geared Motors', '4x All-Terrain Wheels', '2S Battery Pack', 'Type-C 2S Charger', 'Dual-Layer Chassis'],
    targetAudience: 'Ages 10+ • Students & Makers',
    needToUpdate: false
  },
  {
    slug: 'water-aqua',
    title: 'Water & Aqua',
    shortLabel: 'Water & Aqua',
    discipline: 'Aquatic & Marine Engineering',
    tagline: 'Hydrodynamic propulsion, waterproof telemetry, and environmental probes',
    description: 'Aquatic electronics, marine telemetry, waterproof sensors, and solar-powered boats.',
    image: '/assets/kit-workbench.jpg',
    icon: 'bi-droplet-half',
    color: '#4A90E2',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Solar Aquatic Boat Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'music-sound',
    title: 'Music & Sound',
    shortLabel: 'Music & Sound',
    discipline: 'Audio DSP & Acoustic Synthesis',
    tagline: 'Capacitive touch MIDI, waveform synthesis, and real-time spectrum analysis',
    description: 'DIY synthesizers, MIDI controllers, capacitive touch audio, and real-time spectrum visualizers.',
    image: '/assets/kit-starter.jpg',
    icon: 'bi-music-note-beamed',
    color: '#9B51E0',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO DIY Synthesizer Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'iot-smart-devices',
    title: 'IoT & Smart Devices',
    shortLabel: 'IoT Devices',
    discipline: 'Embedded IoT & Cloud Telemetry',
    tagline: 'Wireless mesh nodes, MQTT telemetry streaming, and cloud dashboards',
    description: 'Wi-Fi microcontrollers, cloud telemetry dashboards, and wireless sensor nodes.',
    image: '/assets/kit-iot.jpg',
    icon: 'bi-broadcast',
    color: '#27AE60',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO IoT Cloud Weather Station Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'biomedical-health',
    title: 'Biomedical & Health',
    shortLabel: 'Biomedical',
    discipline: 'Biomedical Engineering & Wearables',
    tagline: 'Non-invasive bio-potential amplification, optical pulse, and ECG telemetry',
    description: 'ECG heart rate monitors, bio-telemetry, pulse sensors, and health wearable prototypes.',
    image: '/assets/kit-sensor.jpg',
    icon: 'bi-heart-pulse',
    color: '#EB5757',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Biomedical Health Monitor Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'vehicles-transportation',
    title: 'Vehicles & Transportation',
    shortLabel: 'Vehicles',
    discipline: 'Automotive & Electric Mobility',
    tagline: 'Electric drivetrains, regenerative braking, and smart transit infrastructure',
    description: 'Electric vehicle prototypes, speed control, differential gearboxes, and transit automation.',
    image: '/assets/kit-smartcar.jpg',
    icon: 'bi-car-front',
    color: '#F2994A',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Electric Vehicle Speed Controller Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'space-aerospace',
    title: 'Space & Aerospace',
    shortLabel: 'Space & Aero',
    discipline: 'Aerospace & Orbital Telemetry',
    tagline: 'Satellite flight computers, 6-DOF inertial navigation, and atmospheric sondes',
    description: 'Cubesats, atmospheric sondes, 6-axis altitude tracking, and rocket telemetry.',
    image: '/assets/kit-expansion.jpg',
    icon: 'bi-rocket-takeoff',
    color: '#2D9CDB',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Cubesat Nanosatellite Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'agriculture-environment',
    title: 'Agriculture & Environment',
    shortLabel: 'AgriTech',
    discipline: 'Agritech & Sustainable Ecology',
    tagline: 'Precision soil telemetry, automated micro-valves, and microclimate regulation',
    description: 'Soil moisture telemetry, automated irrigation valves, weather stations, and crop monitors.',
    image: '/assets/kit-diy.jpg',
    icon: 'bi-flower1',
    color: '#219653',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Smart Agriculture Irrigation Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'smart-home-automation',
    title: 'Smart Home & Automation',
    shortLabel: 'Smart Home',
    discipline: 'Smart Living & Ambient Automation',
    tagline: 'Intelligent relay switching, RFID access security, and ambient climate control',
    description: 'Automated lighting, smart door locks, climate automation, and voice assistant nodes.',
    image: '/assets/kit-iot.jpg',
    icon: 'bi-house-gear',
    color: '#F2C94C',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Smart Home Automation Hub Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'energy-power',
    title: 'Energy & Power',
    shortLabel: 'Energy & Power',
    discipline: 'Renewable Energy & Power Systems',
    tagline: 'Solar dual-axis tracking, supercapacitor storage, and power efficiency metering',
    description: 'Solar micro-grid tracking, supercapacitor storage, and energy harvest meters.',
    image: '/assets/kit-workbench.jpg',
    icon: 'bi-lightning-charge',
    color: '#E2B93B',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Solar Panel Sun Tracking Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'safety-security',
    title: 'Safety & Security',
    shortLabel: 'Safety & Security',
    discipline: 'Cyber-Physical & Perimeter Security',
    tagline: 'PIR motion tripwires, RFID authentication, and hazardous gas leak interception',
    description: 'PIR motion detection, RFID access gates, toxic gas leak alarms, and perimeter sensors.',
    image: '/assets/kit-sensor.jpg',
    icon: 'bi-shield-lock',
    color: '#D32F2F',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Perimeter Intrusion Security Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'science-experiments',
    title: 'Science & Experiments',
    shortLabel: 'Science Labs',
    discipline: 'Fundamental Physics & Circuit Theory',
    tagline: 'Discrete circuit analysis, boolean logic gates, and experimental physics probes',
    description: 'Physics lab probes, chemical reaction meters, light spectroscopy, and logic circuit labs.',
    image: '/assets/kit-starter.jpg',
    icon: 'bi-journal-code',
    color: '#7B1FA2',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Basic Circuit Logic Lab Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'gaming-interactive',
    title: 'Gaming & Interactive',
    shortLabel: 'Gaming',
    discipline: 'Game Engine Architecture & Interactive Tech',
    tagline: 'Pixel framebuffers, 2D physics math, and microsecond hardware interrupts',
    description: 'Retro handheld arcade consoles, reflex testers, OLED displays, and buzzer engines.',
    image: '/assets/kit-basic-electronics.jpg',
    icon: 'bi-controller',
    color: '#C2185B',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Retro Arcade Console Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'ai-intelligent-machines',
    title: 'AI & Intelligent Machines',
    shortLabel: 'AI & ML',
    discipline: 'Edge AI & Embedded Machine Learning',
    tagline: 'Computer vision face tracking, optical flow, and TinyML neural classification',
    description: 'Computer vision, ESP32-CAM optical tracking, neural networks, and voice speech AI.',
    image: '/assets/kit-expansion.jpg',
    icon: 'bi-cpu',
    color: '#00838F',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO AI Vision & Voice Autonomous Robot'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'mechanical-machines',
    title: 'Mechanical & Machines',
    shortLabel: 'Mechanical',
    discipline: 'Mechanics, Kinematics & Actuators',
    tagline: 'Compound gear reduction, torque multiplication, and mechanical linkages',
    description: 'Gear ratios, pulley reduction, linkage mechanisms, and pneumatic actuator arms.',
    image: '/assets/kit-workbench.jpg',
    icon: 'bi-gear-wide-connected',
    color: '#616161',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Mechanical Workbench Gear Lab Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'aviation',
    title: 'Aviation',
    shortLabel: 'Aviation',
    discipline: 'Aerodynamics, Avionics & Flight Control',
    tagline: 'Brushless ESC commutation, 6-axis PID flight stabilization, and airfoil physics',
    description: 'DIY quadcopters, wing aerodynamics, brushless ESC motor drivers, and gyroscopes.',
    image: '/assets/hero-banner.jpg',
    icon: 'bi-send',
    color: '#0288D1',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO DIY Quadcopter Drone Flight Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'communication',
    title: 'Communication',
    shortLabel: 'Communication',
    discipline: 'Wireless Telecommunications & RF',
    tagline: 'Long-range LoRa packet radio, Bluetooth LE serial streams, and RF modulation',
    description: 'LoRa long-range radio, Bluetooth LE transceivers, infrared telemetry, and RF links.',
    image: '/assets/kit-iot.jpg',
    icon: 'bi-wifi',
    color: '#512DA8',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO LoRa Wireless Communication Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'disaster-rescue',
    title: 'Disaster & Rescue',
    shortLabel: 'Disaster Rescue',
    discipline: 'Disaster Mitigation & Emergency Systems',
    tagline: 'Seismic vibration telemetry, ultrasonic river flood sensors, and SOS beacons',
    description: 'Seismic tremor sensors, flood level indicators, search-and-rescue beacons, and SOS nodes.',
    image: '/assets/kit-sensor.jpg',
    icon: 'bi-life-preserver',
    color: '#E64A19',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Disaster & Rescue Beacon Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'smart-city',
    title: 'Smart City',
    shortLabel: 'Smart City',
    discipline: 'Urban Infrastructure & Smart Grids',
    tagline: 'Adaptive intersection timing, ultrasonic parking guidance, and municipal telemetry',
    description: 'Smart traffic light grids, municipal waste level sensors, and automated parking guidance.',
    image: '/assets/kit-basic-electronics.jpg',
    icon: 'bi-building',
    color: '#1976D2',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Smart City Traffic Grid Simulator'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  },
  {
    slug: 'industrial-automation',
    title: 'Industrial Automation',
    shortLabel: 'Industrial',
    discipline: 'Industrial Mechatronics & Factory Systems',
    tagline: 'PLC ladder logic emulation, optical sorting conveyors, and RS485 Modbus networks',
    description: 'PLC ladder logic controllers, conveyor belt sorters, relay banks, and RS485 Modbus.',
    image: '/assets/kit-expansion.jpg',
    icon: 'bi-diagram-3',
    color: '#388E3C',
    purpose: 'Need to update: Curriculum and domain specifications to be finalized.',
    applications: ['Need to update'],
    featuredKits: ['SEIKO Industrial Automation Sorter Kit'],
    hardwareComponents: ['Need to update'],
    targetAudience: 'Need to update',
    needToUpdate: true
  }
];
