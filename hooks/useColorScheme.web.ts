
import { useEffect, useState } from "react";

/**
 * Always returns light mode for consistent theming
 */
export function useColorScheme() {
  return "light" as const;
}
