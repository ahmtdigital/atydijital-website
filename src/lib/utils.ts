
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Updates a URL parameter without causing a full page reload
 * @param param The parameter name
 * @param value The parameter value
 */
export function updateUrlParam(param: string, value: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set(param, value);
  window.history.pushState({}, '', url.toString());
}

/**
 * Gets a URL parameter value
 * @param param The parameter name
 * @returns The parameter value or null if not found
 */
export function getUrlParam(param: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(param);
}
