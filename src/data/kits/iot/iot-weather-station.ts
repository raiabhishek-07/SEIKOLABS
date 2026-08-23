import { defineKit } from "../types";

export const IOT_WEATHER_STATION_KIT = defineKit({
  kitId: "iot-weather-telemetry-hub",
  domainSlug: "iot-smart-devices",
  name: "SEIKO IoT Cloud Weather Station",
  tagline: "Atmospheric Telemetry, Wi-Fi MQTT Streaming & Real-Time Cloud Dashboards",
  description: "Construct an autonomous solar-powered weather telemetry station with ESP32 Wi-Fi microcontroller. Stream live temperature, humidity, pressure, and air quality metrics directly to web dashboards.",
  price: 139,
  originalPrice: 179,
  difficulty: "Beginner",
  targetAge: "Ages 11+ • Cloud & IoT Builders",
  rating: 4.9,
  reviewCount: 310,
  image: "/assets/kit-iot.jpg",

  components: [
    {
      id: "iot-comp-1",
      name: "ESP32 Dual-Core Wi-Fi & Bluetooth MCU",
      category: "Microcontroller",
      quantity: 1,
      spec: "240MHz Tensilica Core • 520KB SRAM • Integrated Wi-Fi 802.11 b/g/n",
      description: "Handles sensor sampling and MQTT JSON packet streaming to cloud servers."
    },
    {
      id: "iot-comp-2",
      name: "BME280 Precision Environmental Sensor",
      category: "Sensor",
      quantity: 1,
      spec: "Temperature (±0.5°C), Humidity (±3%), Barometric Pressure (±1 hPa)",
      description: "I2C 3-in-1 digital environmental sensor probe."
    },
    {
      id: "iot-comp-3",
      name: "0.96\" I2C OLED Display (128x64)",
      category: "Sensor",
      quantity: 1,
      spec: "SSD1306 Graphic Display • High Contrast Blue/Yellow",
      description: "Displays live telemetry stats locally without internet connection."
    }
  ],

  documentation: {
    gettingStartedSummary: "The SEIKO IoT Weather Station teaches HTTP/MQTT web protocols, I2C digital sensor communication, and cloud dashboard integration.",
    pinoutDiagramUrl: "/assets/kit-iot.jpg",
    operatingVoltage: "3.3V Logic • 5V USB Power Rail",
    currentDraw: "80mA Normal • 240mA Wi-Fi Tx Peak",
    microcontrollerCore: "ESP32-WROOM-32 32-bit Dual-Core Xtensa LX6",
    safetyGuidelines: [
      "ESP32 GPIO pins are strictly 3.3V logic tolerant; do not connect 5V signals directly to GPIO input pins."
    ],
    troubleshootingFaqs: [
      {
        question: "Why does the ESP32 fail to connect to my Wi-Fi network?",
        answer: "ESP32 supports 2.4GHz Wi-Fi networks only. Ensure your router 2.4GHz band is active and credentials in code are accurate."
      }
    ]
  },

  curriculum: [
    {
      id: "iot-mod-1",
      moduleNumber: 1,
      title: "I2C Sensor Interfacing & Local OLED Display",
      description: "Wire the BME280 sensor via I2C bus and render live metrics onto the SSD1306 OLED display.",
      duration: "35 mins",
      lessons: [
        {
          id: "iot-1-1",
          moduleIndex: 1,
          lessonIndex: 1,
          title: "I2C Bus Protocol & BME280 Wiring",
          estimatedDuration: "15 mins",
          contentType: "theory",
          summary: "Learn how the two-wire I2C protocol (SDA/SCL) enables addressing multiple sensors on the same bus."
        }
      ]
    }
  ],

  assessments: [
    {
      id: 1,
      question: "Which two signals comprise the standard I2C hardware communication bus?",
      options: [
        "SDA (Serial Data) and SCL (Serial Clock)",
        "TX (Transmit) and RX (Receive)",
        "MOSI and MISO",
        "PWM and ANALOG"
      ],
      correctIndex: 0,
      explanation: "I2C uses two bidirectional open-drain lines: SDA (Data) and SCL (Clock).",
      topic: "IoT Communication"
    }
  ]
});
