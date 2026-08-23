import { defineKit } from "../../types";
import { ROVER_OVERVIEW } from "./overview";
import { ROVER_COMPONENTS } from "./components";
import { ROVER_DOCUMENTATION } from "./documentation";
import { ROVER_CURRICULUM } from "./curriculum";
import { ROVER_ASSESSMENTS } from "./assessments";
import { ROVER_PD_DATA } from "./pd";

export const SMART_ROBOTICS_ROVER_KIT = defineKit({
  ...ROVER_OVERVIEW,
  components: ROVER_COMPONENTS,
  documentation: ROVER_DOCUMENTATION,
  curriculum: ROVER_CURRICULUM,
  assessments: ROVER_ASSESSMENTS
});

export {
  ROVER_OVERVIEW,
  ROVER_COMPONENTS,
  ROVER_DOCUMENTATION,
  ROVER_CURRICULUM,
  ROVER_ASSESSMENTS,
  ROVER_PD_DATA
};
