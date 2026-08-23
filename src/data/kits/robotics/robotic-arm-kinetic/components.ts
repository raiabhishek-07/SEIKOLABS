import { ComponentItem } from "../../types";

export const ROBOTIC_ARM_COMPONENTS: ComponentItem[] = [
  {
    id: "arm-comp-1",
    name: "SG90 Metal-Gear Micro Servos",
    category: "Actuator",
    quantity: 4,
    spec: "180° Articulation • 2.0 kg·cm Torque",
    description: "Drives Base, Shoulder, Elbow, and Claw Gripper joints.",
    image: "/assets/kit-workbench.jpg"
  },
  {
    id: "arm-comp-2",
    name: "Dual-Axis Analog Joystick Module",
    category: "Sensor",
    quantity: 2,
    spec: "X/Y Analog Potentiometers with Tactile Push Button",
    description: "Manual analog teleoperation control for coordinate positioning.",
    image: "/assets/kit-starter.jpg"
  },
  {
    id: "arm-comp-3",
    name: "Laser-Cut Acrylic Arm Skeleton & Claw",
    category: "Mechanical",
    quantity: 1,
    spec: "3mm High-Tensile Acrylic Linkage Plates with Fasteners",
    description: "Mechanical linkage frame with precision gripper claws.",
    image: "/assets/kit-robotics.jpg"
  },
  {
    id: "arm-comp-4",
    name: "PCA9685 16-Channel 12-bit PWM Servo Shield",
    category: "Microcontroller",
    quantity: 1,
    spec: "I2C Interface • Independent External Servo Power Rail",
    description: "Relieves microcontroller timer load to control up to 16 servos smoothly.",
    image: "/assets/kit-workbench.jpg"
  }
];
