export * from "./kits/types";
export * from "./kits/registry";

import { getKitById } from "./kits/registry";

// Backward compatibility alias
export const getKitHubData = getKitById;
