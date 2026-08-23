import { CurriculumModule } from "../../types";

export const ROBOTIC_ARM_CURRICULUM: CurriculumModule[] = [
  {
    id: "arm-mod-1",
    moduleNumber: 1,
    title: "Mechanical Linkage & Gripper Assembly",
    description: "Assemble the turntable base, mount shoulder & elbow servos, and assemble the gear-driven claw.",
    duration: "40 mins",
    lessons: [
      {
        id: "arm-1-1",
        moduleIndex: 1,
        lessonIndex: 1,
        title: "Base Turntable & Shoulder Assembly",
        estimatedDuration: "20 mins",
        contentType: "step-by-step",
        summary: "Step-by-step guide to assembling the base servo and shoulder pivot.",
        steps: [
          {
            stepNumber: 1,
            title: "Install Base Turntable Bearing",
            instruction: "Slot the 608ZZ radial bearing into the center hole of the base plate. Secure with M4 center bolt.",
            partsNeeded: ["1x Base Plate", "1x 608ZZ Bearing", "1x M4 Bolt"]
          },
          {
            stepNumber: 2,
            title: "Mount SG90 Base Rotation Servo",
            instruction: "Fix the base rotation servo with the included M2 screws into the lower mounting bracket.",
            partsNeeded: ["1x SG90 Servo", "2x M2 Screws"]
          }
        ]
      }
    ]
  },
  {
    id: "arm-mod-2",
    moduleNumber: 2,
    title: "PCA9685 I2C Driver & Dual Joystick Teleoperation",
    description: "Connect the PCA9685 16-channel servo driver over I2C, map joystick analog inputs to servo angles, and calibrate joint limit constraints.",
    duration: "45 mins",
    lessons: [
      {
        id: "arm-2-1",
        moduleIndex: 2,
        lessonIndex: 1,
        title: "I2C PWM Servo Control Firmware",
        estimatedDuration: "30 mins",
        contentType: "code",
        summary: "C++ Arduino code reading joystick X/Y axes and updating PCA9685 PWM pulse widths in real time.",
        codeSnippet: {
          language: "cpp",
          filename: "RoboticArm_Joystick.ino",
          code: `#include <Wire.h>
#include <Adafruit_PWMServoDriver.h>

Adafruit_PWMServoDriver pwm = Adafruit_PWMServoDriver();

#define SERVOMIN  150 // Minimum pulse length count (out of 4096)
#define SERVOMAX  600 // Maximum pulse length count (out of 4096)

int joyX = A0;
int joyY = A1;

void setup() {
  pwm.begin();
  pwm.setPWMFreq(60); // Analog servos run at ~60 Hz
}

void loop() {
  int valX = analogRead(joyX);
  int pulseX = map(valX, 0, 1023, SERVOMIN, SERVOMAX);
  pwm.setPWM(0, 0, pulseX); // Base Servo on Channel 0
  delay(20);
}`,
          explanationPoints: [
            { lineRange: "Lines 1-4", explanation: "Include Adafruit PWM library and instantiate driver on I2C address 0x40." },
            { lineRange: "Lines 12-15", explanation: "Initialize I2C bus and set PWM frequency to 60Hz standard for analog servos." },
            { lineRange: "Lines 17-21", explanation: "Map analog joystick voltage reading to microsecond PWM pulse width for Channel 0." }
          ]
        }
      }
    ]
  }
];
