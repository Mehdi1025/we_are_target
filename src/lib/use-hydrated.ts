"use client";

import { useEffect, useState } from "react";

/** true après le premier paint client — aligne le HTML avec l'hydratation avant les valeurs scroll / session. */
export function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
