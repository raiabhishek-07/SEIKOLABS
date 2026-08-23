import { ProductDomain } from "../domains";

export const ROBOTICS_DOMAIN: ProductDomain = {
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
  applications: [
    'Smartphone Web Joystick Control',
    'Bluetooth BLE Teleoperation',
    '4WD Differential Drive Kinematics',
    'Type-C 2S Fast Charging'
  ],
  featuredKits: ['SEIKO RoverX: ESP32 4WD Connected RC Bot'],
  hardwareComponents: [
    'ESP32 Dual-Core MCU',
    'L298N Motor Driver',
    '4x TT Geared Motors',
    '4x All-Terrain Wheels',
    '2S Battery Pack',
    'Type-C 2S Charger',
    'Dual-Layer Chassis'
  ],
  targetAudience: 'Ages 10+ • Students & Makers',
  needToUpdate: false
};
