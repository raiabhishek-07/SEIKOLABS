import { AssessmentQuestion } from "../../types";

export const ROBOTIC_ARM_ASSESSMENTS: AssessmentQuestion[] = [
  {
    id: 1,
    question: "How many independent rotational axes does a 4-servo robotic arm possess?",
    options: [
      "2 Axes",
      "4 Degrees of Freedom (DOF)",
      "6 Axes",
      "8 Axes"
    ],
    correctIndex: 1,
    explanation: "Each independent servo controls one rotational joint, giving 4 mechanical degrees of freedom (Base, Shoulder, Elbow, Gripper).",
    topic: "Kinematics"
  },
  {
    id: 2,
    question: "Why is the PCA9685 I2C servo driver shield used instead of connecting 4 servos directly to Arduino GPIO pins?",
    options: [
      "Servos do not work with Arduino",
      "The PCA9685 has an onboard hardware PWM clock and dedicated external power terminal, preventing timer jitter and voltage dips",
      "It makes the servos rotate faster",
      "It converts analog signals to Wi-Fi packets"
    ],
    correctIndex: 1,
    explanation: "The PCA9685 generates completely jitter-free 12-bit hardware PWM pulses via I2C and isolates high-current servo power from the sensitive MCU logic rail.",
    topic: "Control Electronics"
  }
];
