import { KitHubDetail } from "./types";
import { SMART_ROBOTICS_ROVER_KIT } from "./robotics/smart-robotics-rover";
import { ROBOTIC_ARM_KINETIC_KIT } from "./robotics/robotic-arm-kinetic";
import { IOT_WEATHER_STATION_KIT } from "./iot/iot-weather-station";
import { STEM_KITS_CATALOG } from "../products";
import { PRODUCT_DOMAINS, DomainSlug } from "../domains";

/**
 * Global Registry Index of all custom-defined kit files.
 * To add a new kit, simply create a file in its domain folder and add it here!
 */
export const KITS_REGISTRY: Record<string, KitHubDetail> = {
  "smart-robotics-rover-kit": SMART_ROBOTICS_ROVER_KIT,
  "flagship-smart-robotics-kit": SMART_ROBOTICS_ROVER_KIT,
  "robotic-arm-kinetic-kit": ROBOTIC_ARM_KINETIC_KIT,
  "iot-weather-telemetry-hub": IOT_WEATHER_STATION_KIT
};

/**
 * Universal Kit Fetcher with Smart Blueprint Fallback Engine.
 * Guarantees zero 404 errors or blank pages across all 20 domains.
 */
export function getKitById(kitId: string, domainSlug?: string): KitHubDetail {
  // 1. Direct match in registry
  if (KITS_REGISTRY[kitId]) {
    return KITS_REGISTRY[kitId];
  }

  // 2. Lookup in stem catalog
  const catalogProduct = STEM_KITS_CATALOG.find((k) => k.id === kitId) || STEM_KITS_CATALOG[0];
  const matchedDomain = PRODUCT_DOMAINS.find(
    (d) => d.slug === (domainSlug || catalogProduct.domainSlug)
  ) || PRODUCT_DOMAINS[0];

  // 3. Generate structured blueprint dynamically
  return {
    kitId: catalogProduct.id,
    domainSlug: matchedDomain.slug,
    name: catalogProduct.name,
    tagline: catalogProduct.tagline || `Hands-on ${matchedDomain.title} Hardware Kit`,
    description: catalogProduct.description,
    price: catalogProduct.price,
    originalPrice: catalogProduct.originalPrice,
    difficulty: catalogProduct.difficulty,
    targetAge: catalogProduct.targetAge,
    rating: catalogProduct.rating,
    reviewCount: catalogProduct.reviewCount,
    image: catalogProduct.image || matchedDomain.image,
    components: SMART_ROBOTICS_ROVER_KIT.components.map((c, i) => ({
      ...c,
      id: `comp-${catalogProduct.id}-${i}`,
      name: catalogProduct.whatsInside[i % catalogProduct.whatsInside.length] || c.name
    })),
    documentation: {
      ...SMART_ROBOTICS_ROVER_KIT.documentation,
      gettingStartedSummary: `Welcome to the ${catalogProduct.name}. This hardware lab teaches fundamental engineering concepts in ${matchedDomain.title} using solderless prototyping.`
    },
    curriculum: SMART_ROBOTICS_ROVER_KIT.curriculum.map((m) => ({
      ...m,
      lessons: m.lessons.map((l) => ({
        ...l,
        summary: `Hands-on module for ${catalogProduct.name} exploring ${l.title}.`
      }))
    })),
    assessments: SMART_ROBOTICS_ROVER_KIT.assessments
  };
}

/**
 * Returns all custom-defined kits in the registry.
 */
export function getAllRegisteredKits(): KitHubDetail[] {
  return Object.values(KITS_REGISTRY);
}

/**
 * Returns all registered kits belonging to a specific domain.
 */
export function getKitsByDomain(domainSlug: DomainSlug | string): KitHubDetail[] {
  return Object.values(KITS_REGISTRY).filter((k) => k.domainSlug === domainSlug);
}
