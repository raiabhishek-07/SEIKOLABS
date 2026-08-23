import { defineKit } from "../../types";
import { ROBOTIC_ARM_OVERVIEW } from "./overview";
import { ROBOTIC_ARM_COMPONENTS } from "./components";
import { ROBOTIC_ARM_DOCUMENTATION } from "./documentation";
import { ROBOTIC_ARM_CURRICULUM } from "./curriculum";
import { ROBOTIC_ARM_ASSESSMENTS } from "./assessments";
import { ROBOTIC_ARM_PD_DATA } from "./pd";

export const ROBOTIC_ARM_KINETIC_KIT = defineKit({
  ...ROBOTIC_ARM_OVERVIEW,
  components: ROBOTIC_ARM_COMPONENTS,
  documentation: ROBOTIC_ARM_DOCUMENTATION,
  curriculum: ROBOTIC_ARM_CURRICULUM,
  assessments: ROBOTIC_ARM_ASSESSMENTS
});

export {
  ROBOTIC_ARM_OVERVIEW,
  ROBOTIC_ARM_COMPONENTS,
  ROBOTIC_ARM_DOCUMENTATION,
  ROBOTIC_ARM_CURRICULUM,
  ROBOTIC_ARM_ASSESSMENTS,
  ROBOTIC_ARM_PD_DATA
};
