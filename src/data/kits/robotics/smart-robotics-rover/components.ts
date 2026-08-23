import { ComponentItem } from "../../types";

export const ROVER_COMPONENTS: ComponentItem[] = [
  {
    id: "comp-esp32",
    name: "ESP32 Dual-Core Wi-Fi & Bluetooth Microcontroller",
    category: "Microcontroller",
    quantity: 1,
    spec: "240MHz 32-bit Xtensa LX6 • 520KB SRAM • 2.4GHz Wi-Fi + BLE 4.2",
    description: "Hosts a local Wi-Fi web server with HTML5 virtual joystick and handles real-time motor PWM control.",
    image: "/assets/kit-robotics.jpg"
  },
  {
    id: "comp-l298n",
    name: "L298N Dual H-Bridge Motor Driver Module",
    category: "Actuator",
    quantity: 1,
    spec: "Dual Channel • 2A Peak Current Per Channel • 5V - 35V Operating Range",
    description: "Controls bidirectional rotational direction and PWM speed for left and right paired TT motors.",
    image: "/assets/kit-workbench.jpg"
  },
  {
    id: "comp-motors",
    name: "TT Dual-Shaft DC Gearbox Motors",
    category: "Actuator",
    quantity: 4,
    spec: "1:48 Gear Reduction • 200 RPM @ 6V • 0.8 kg·cm Torque",
    description: "4-wheel high-torque geared motors delivering 4WD drive traction across smooth and rugged surfaces.",
    image: "/assets/kit-robotics.jpg"
  },
  {
    id: "comp-wheels",
    name: "All-Terrain Rubber Tread Wheels (65mm)",
    category: "Mechanical",
    quantity: 4,
    spec: "65mm Diameter • 26mm Width • Deep Tread High-Grip Rubber",
    description: "Press-fit rubberized wheels engineered for maximum traction and anti-slip drive stability.",
    image: "/assets/kit-robotics.jpg"
  },
  {
    id: "comp-battery",
    name: "2S Rechargeable Li-ion Battery Pack (7.4V)",
    category: "Power",
    quantity: 1,
    spec: "7.4V Nominal (8.4V Peak) • 2200mAh • High-Discharge 18650 Cells",
    description: "Provides clean, independent high-amperage power to the 4WD drive motors and logic rails.",
    image: "/assets/kit-starter.jpg"
  },
  {
    id: "comp-charger",
    name: "Type-C 2S Lithium Fast-Charging & BMS Module",
    category: "Power",
    quantity: 1,
    spec: "USB Type-C Input (5V 2A) • 8.4V Synchronous Step-Up • Overcharge/Short-Circuit BMS",
    description: "Enables fast charging of the 2S battery pack directly via any modern USB-C cable without removing cells.",
    image: "/assets/kit-starter.jpg"
  },
  {
    id: "comp-chassis",
    name: "Dual-Layer Laser-Cut Acrylic Smart Chassis Kit",
    category: "Mechanical",
    quantity: 1,
    spec: "3mm High-Impact Transparent Acrylic • Pre-Drilled Mounting Grids for ESP32 & L298N",
    description: "Rigid dual-deck vehicle platform with integrated motor mounting brackets, spacers, and hardware.",
    image: "/assets/kit-robotics.jpg"
  },
  {
    id: "comp-wires",
    name: "Solderless Dupont Prototyping Jumper Wires & Switch",
    category: "Wiring",
    quantity: 1,
    spec: "20cm Male-to-Female & Male-to-Male (40-Pin Ribbon) + SPST Power Toggle Switch",
    description: "Multi-colored flexible ribbon jumper cables for quick, solderless pin connections and master power switching.",
    image: "/assets/kit-starter.jpg"
  }
];
