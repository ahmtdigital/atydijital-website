
/**
 * Helper functions for admin panel navigation
 */

/**
 * Updates the URL hash for admin navigation without causing page refresh
 * 
 * Format: #admin#tabname
 * 
 * @param tab The tab name to navigate to
 */
export const updateAdminHash = (tab: string): void => {
  try {
    window.history.replaceState(
      {}, 
      '', 
      `${window.location.pathname}#admin#${tab}`
    );
  } catch (error) {
    console.error("Error updating URL hash:", error);
  }
};

/**
 * Parse the current URL hash to determine admin tab
 * 
 * @returns The current active tab from URL hash or null if not set
 */
export const parseAdminHash = (): string | null => {
  const hashParts = window.location.hash.split('#');
  if (hashParts.length >= 3 && hashParts[1] === 'admin') {
    return hashParts[2] || null;
  } else if (window.location.hash.startsWith('#') && !window.location.hash.includes('#admin#')) {
    // Legacy format support (#tabname)
    return window.location.hash.replace('#', '') || null;
  }
  return null;
};

/**
 * Navigate to a specific admin tab
 * 
 * @param tab Tab name to navigate to
 */
export const navigateToAdminTab = (tab: string): void => {
  updateAdminHash(tab);
  // Reset scroll position when changing tabs
  window.scrollTo(0, 0);
};
