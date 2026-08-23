import { CurriculumModule } from "../../types";

export const ROVER_CURRICULUM: CurriculumModule[] = [
  {
    id: "mod-1",
    moduleNumber: 1,
    title: "Chassis Mechanics & 4WD Drivetrain Assembly",
    description: "Unbox components, inspect motor tolerances, and mechanically mount the 4 DC geared motors, all-terrain wheels, and dual-layer acrylic chassis.",
    duration: "40 mins",
    lessons: [
      {
        id: "lesson-1-1",
        moduleIndex: 1,
        lessonIndex: 1,
        title: "Hardware Unboxing & Component Verification",
        estimatedDuration: "10 mins",
        contentType: "video",
        summary: "Identify each component in the kit, verify static-safe packaging, and understand the role of microcontrollers, motor drivers, and battery packs.",
        videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
        videoTimestamps: [
          { time: "00:00", label: "RoverX Box Contents & Parts Checklist" },
          { time: "02:30", label: "ESP32 Dual-Core Wireless Capabilities" },
          { time: "04:45", label: "L298N H-Bridge Motor Theory" },
          { time: "07:15", label: "Type-C 2S BMS Battery Safety" }
        ],
        checkpointQuiz: {
          question: "Which component is responsible for stepping up USB 5V to 8.4V for fast 2S charging?",
          options: [
            "L298N Motor Driver",
            "Type-C 2S BMS Boost Module",
            "ESP32 Microcontroller",
            "Acrylic Chassis Plate"
          ],
          correctIndex: 1,
          explanation: "The Type-C 2S Boost Charger steps up standard 5V USB input to the 8.4V required to charge a 2-cell lithium battery with integrated overcharge protection."
        }
      },
      {
        id: "lesson-1-2",
        moduleIndex: 1,
        lessonIndex: 2,
        title: "Step-by-Step 4WD Chassis & Motor Installation",
        estimatedDuration: "30 mins",
        contentType: "step-by-step",
        summary: "Assemble the dual-layer chassis with aluminum motor brackets, attach the 4 TT motors, and press-fit the 65mm all-terrain rubber wheels.",
        steps: [
          {
            stepNumber: 1,
            title: "Peel Protective Masking Film",
            instruction: "Peel the kraft paper film from both sides of the upper and lower acrylic chassis plates to reveal crystal-clear acrylic.",
            partsNeeded: ["Lower Acrylic Plate", "Upper Acrylic Plate"],
            image: "/assets/kit-robotics.jpg"
          },
          {
            stepNumber: 2,
            title: "Mount TT Motors to Lower Plate",
            instruction: "Use the M3x30mm screws and locknuts to secure the four TT DC motors to the underside of the lower chassis. Ensure motor output shafts face outwards.",
            partsNeeded: ["4x TT Motors", "8x M3x30mm Screws", "8x M3 Locknuts", "Lower Chassis Plate"],
            warningOrTip: "Do not overtighten screws against the acrylic plate to prevent stress cracking."
          },
          {
            stepNumber: 3,
            title: "Press-Fit 65mm Wheels",
            instruction: "Align the flat sides of the TT motor dual-shaft with the slotted wheel hubs and push firmly until seated flush.",
            partsNeeded: ["4x 65mm Rubber Wheels", "4x M2.5 Retaining Screws"]
          },
          {
            stepNumber: 4,
            title: "Install Brass Standoffs for Upper Deck",
            instruction: "Screw six 35mm brass hexagonal standoffs into the perimeter mounting holes of the lower chassis plate to support the upper electronics deck.",
            partsNeeded: ["6x M3 35mm Brass Standoffs", "6x M3 Nuts"]
          }
        ],
        checkpointQuiz: {
          question: "Why are dual-shaft geared TT motors used instead of direct-drive brushless motors?",
          options: [
            "They consume 10x more power",
            "The 1:48 gearbox reduces RPM while multiplying mechanical torque for climbing slopes",
            "They only spin in one direction",
            "They are completely noiseless"
          ],
          correctIndex: 1,
          explanation: "The internal 1:48 gear train trades high rotational speed for high torque, enabling the rover to carry payloads and navigate uneven terrain."
        }
      }
    ]
  },
  {
    id: "mod-2",
    moduleNumber: 2,
    title: "L298N Motor Driver, ESP32 GPIOs & Power Wiring",
    description: "Wire the solderless Dupont pinout matrix between the ESP32 GPIOs and L298N logic terminals, establish shared ground rails, and connect the 2S battery pack.",
    duration: "35 mins",
    lessons: [
      {
        id: "lesson-2-1",
        moduleIndex: 2,
        lessonIndex: 1,
        title: "Complete Circuit Schematic & Wiring Matrix",
        estimatedDuration: "25 mins",
        contentType: "theory",
        summary: "Understand the H-bridge switching topology, PWM frequency modulation, and step-by-step Dupont wire routing.",
        schematic: {
          diagramImage: "/assets/kit-workbench.jpg",
          description: "Solderless pinout connections connecting ESP32 digital outputs to L298N direction and speed control terminals.",
          pinConnections: [
            { componentPin: "L298N IN1", mcuPin: "ESP32 GPIO 18", functionType: "Left Forward", colorCode: "Blue", note: "Forward Left Logic HIGH" },
            { componentPin: "L298N IN2", mcuPin: "ESP32 GPIO 19", functionType: "Left Reverse", colorCode: "Green", note: "Reverse Left Logic HIGH" },
            { componentPin: "L298N IN3", mcuPin: "ESP32 GPIO 22", functionType: "Right Forward", colorCode: "Yellow", note: "Forward Right Logic HIGH" },
            { componentPin: "L298N IN4", mcuPin: "ESP32 GPIO 23", functionType: "Right Reverse", colorCode: "Orange", note: "Reverse Right Logic HIGH" },
            { componentPin: "L298N ENA (PWM)", mcuPin: "ESP32 GPIO 16", functionType: "Left Speed PWM", colorCode: "White", note: "ledcWrite() Left Velocity" },
            { componentPin: "L298N ENB (PWM)", mcuPin: "ESP32 GPIO 17", functionType: "Right Speed PWM", colorCode: "Purple", note: "ledcWrite() Right Velocity" }
          ]
        },
        checkpointQuiz: {
          question: "What happens if you set both IN1 and IN2 on the L298N to HIGH simultaneously?",
          options: [
            "The motor spins at double speed",
            "Active electrical braking occurs (motor shafts lock)",
            "The microcontroller resets immediately",
            "The battery begins charging"
          ],
          correctIndex: 1,
          explanation: "Setting both inputs of an H-bridge channel to HIGH shorts both motor terminals to ground, creating dynamic electromagnetic braking."
        }
      }
    ]
  },
  {
    id: "mod-3",
    moduleNumber: 3,
    title: "ESP32 Wi-Fi SoftAP & Smartphone Web Joystick",
    description: "Flash the open-source C++ firmware to initialize an autonomous Wi-Fi Access Point and stream real-time motor commands over WebSockets from any web browser.",
    duration: "45 mins",
    lessons: [
      {
        id: "lesson-3-1",
        moduleIndex: 3,
        lessonIndex: 1,
        title: "Web Controller Firmware & WebSocket Teleoperation",
        estimatedDuration: "30 mins",
        contentType: "code",
        summary: "Examine the C++ firmware, understand AsyncWebServer and WebSocket JSON packet handling, and calibrate motor speeds.",
        codeSnippet: {
          language: "cpp",
          filename: "RoverX_WebControl.ino",
          code: `#include <WiFi.h>
#include <ESPAsyncWebServer.h>

const char* ssid = "SEIKO-Rover-AP";
const char* password = "SEIKO_ROBOTICS";

AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

#define ENA 16
#define IN1 18
#define IN2 19
#define IN3 22
#define IN4 23
#define ENB 17

void handleWebSocketMessage(void *arg, uint8_t *data, size_t len) {
  AwsFrameInfo *info = (AwsFrameInfo*)arg;
  if (info->final && info->index == 0 && info->len == len && info->opcode == WS_TEXT) {
    data[len] = 0;
    char command = (char)data[0];
    if (command == 'F') moveForward(200);
    else if (command == 'B') moveBackward(200);
    else if (command == 'L') turnLeft(180);
    else if (command == 'R') turnRight(180);
    else stopMotors();
  }
}

void setup() {
  pinMode(IN1, OUTPUT); pinMode(IN2, OUTPUT);
  pinMode(IN3, OUTPUT); pinMode(IN4, OUTPUT);
  WiFi.softAP(ssid, password);
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);
  server.begin();
}`,
          explanationPoints: [
            { lineRange: "Lines 1-4", explanation: "Include ESP32 Wi-Fi and asynchronous web server libraries to handle network sockets." },
            { lineRange: "Lines 9-14", explanation: "Define the hardware GPIO pins wired to the L298N motor driver inputs." },
            { lineRange: "Lines 16-27", explanation: "Process incoming single-byte WebSocket movement commands with near-zero latency." },
            { lineRange: "Lines 31-36", explanation: "Broadcast the 'SEIKO-Rover-AP' Wi-Fi network and launch the HTTP server on port 80." }
          ]
        },
        checkpointQuiz: {
          question: "Why is WebSockets preferred over standard HTTP POST requests for robotic teleoperation?",
          options: [
            "WebSockets use less battery",
            "WebSockets provide a persistent full-duplex connection for ultra-low latency steering commands",
            "HTTP POST does not work with ESP32",
            "WebSockets only work on Wi-Fi"
          ],
          correctIndex: 1,
          explanation: "WebSockets maintain an open bidirectional channel, eliminating HTTP TCP handshake overhead for instant 15ms joystick response."
        }
      }
    ]
  },
  {
    id: "mod-4",
    moduleNumber: 4,
    title: "Bluetooth BLE Gamepad Control & Speed Tuning",
    description: "Pair wireless Bluetooth controllers (PS4, Xbox, or generic BLE Gamepad) to control the rover with variable analog stick throttles and custom speed profiles.",
    duration: "30 mins",
    lessons: [
      {
        id: "lesson-4-1",
        moduleIndex: 4,
        lessonIndex: 1,
        title: "BLE Gamepad Pairing & Differential PWM Steering",
        estimatedDuration: "30 mins",
        contentType: "hybrid",
        summary: "Combine BLE gamepad packet decoding with mathematical differential drive algorithms for smooth analog turning.",
        videoUrl: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
        videoTimestamps: [
          { time: "00:00", label: "BLE HID Gamepad Architecture" },
          { time: "03:10", label: "Analog Stick Deadzone Calibration" },
          { time: "06:40", label: "Differential Drive Mathematics" }
        ],
        checkpointQuiz: {
          question: "What is an analog stick 'deadzone' and why is it important in robotic control?",
          options: [
            "A zone where motors run at maximum speed",
            "A small center threshold where stick drift is ignored to prevent the car from creeping when untouched",
            "A safety zone where the car stops before hitting walls",
            "The maximum Bluetooth transmission range"
          ],
          correctIndex: 1,
          explanation: "Potentiometers in gamepads have slight mechanical jitter; a deadzone threshold prevents the rover from creeping when the stick is resting."
        }
      }
    ]
  }
];
