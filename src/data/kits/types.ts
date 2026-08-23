import { DomainSlug } from "../domains";

export interface ComponentItem {
  id: string;
  name: string;
  category: "Microcontroller" | "Sensor" | "Actuator" | "Power" | "Mechanical" | "Wiring";
  quantity: number;
  spec: string;
  description: string;
  image?: string;
}

export interface BuildStep {
  stepNumber: number;
  title: string;
  instruction: string;
  image?: string;
  partsNeeded: string[];
  warningOrTip?: string;
}

export interface SchematicPin {
  componentPin: string;
  mcuPin: string;
  functionType: string;
  colorCode: string;
  note: string;
}

export interface CodeWalkthrough {
  language: "cpp" | "python";
  filename: string;
  code: string;
  explanationPoints: { lineRange: string; explanation: string }[];
}

export interface CheckpointQuiz {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Lesson {
  id: string;
  moduleIndex: number;
  lessonIndex: number;
  title: string;
  estimatedDuration: string;
  contentType: "video" | "step-by-step" | "theory" | "code" | "hybrid";
  summary: string;
  videoUrl?: string;
  videoTimestamps?: { time: string; label: string }[];
  steps?: BuildStep[];
  schematic?: {
    diagramImage: string;
    description: string;
    pinConnections: SchematicPin[];
  };
  codeSnippet?: CodeWalkthrough;
  checkpointQuiz?: CheckpointQuiz;
}

export interface CurriculumModule {
  id: string;
  moduleNumber: number;
  title: string;
  description: string;
  duration: string;
  lessons: Lesson[];
}

export interface KitDocumentation {
  gettingStartedSummary: string;
  pinoutDiagramUrl: string;
  operatingVoltage: string;
  currentDraw: string;
  microcontrollerCore: string;
  safetyGuidelines: string[];
  troubleshootingFaqs: { question: string; answer: string }[];
}

export interface AssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: string;
}

export interface KitHubDetail {
  kitId: string;
  domainSlug: DomainSlug;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  targetAge: string;
  rating: number;
  reviewCount: number;
  image: string;
  components: ComponentItem[];
  documentation: KitDocumentation;
  curriculum: CurriculumModule[];
  assessments: AssessmentQuestion[];
}

// Input type for defineKit with optional defaults
export type DefineKitInput = Omit<KitHubDetail, "rating" | "reviewCount"> & {
  rating?: number;
  reviewCount?: number;
};

/**
 * Type-safe helper to define and validate kit data with IntelliSense autocomplete.
 */
export function defineKit(input: DefineKitInput): KitHubDetail {
  return {
    ...input,
    rating: input.rating ?? 4.9,
    reviewCount: input.reviewCount ?? 150
  };
}
