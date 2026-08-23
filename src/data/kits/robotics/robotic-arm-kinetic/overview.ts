export const ROBOTIC_ARM_OVERVIEW = {
  kitId: "robotic-arm-kinetic-kit",
  domainSlug: "robotics" as const,
  name: "SEIKO 4-DOF Robotic Arm Manipulator",
  tagline: "Inverse Kinematics, Servo Articulation & Dual Joystick Control",
  description: "Construct a precision 4-axis acrylic robotic manipulator. Master servo PWM positioning, coordinate inverse kinematics, and program automated pick-and-place routines.",
  price: 169,
  originalPrice: 219,
  difficulty: "Intermediate" as const,
  targetAge: "Ages 12+ • Engineering Students",
  rating: 4.8,
  reviewCount: 240,
  image: "/assets/kit-workbench.jpg",

  outcomes: [
    "4 Degrees of Freedom (DOF) Mechanical Linkage Kinematics",
    "PCA9685 I2C 16-Channel 12-Bit PWM Servo Driver Control",
    "Dual-Axis Analog Joystick Coordinate Teleoperation",
    "Automated Pick-and-Place Trajectory Programming"
  ],

  specs: [
    { label: "Microcontroller", value: "ATmega328P with I2C PCA9685 Driver Shield" },
    { label: "Operating Voltage", value: "5V Logic • 6V External Servo Supply" },
    { label: "Current Draw", value: "500mA Idle • 2.2A Stall Peak" },
    { label: "Articulation Range", value: "180° per joint (Base, Shoulder, Elbow, Claw)" },
    { label: "Payload Capacity", value: "150g at full arm extension" }
  ]
};
