export const getSectionIdFromHref = (href: string): string | null => {
  const trimmed = href.trim();

  if (trimmed.startsWith("#")) {
    const id = trimmed.slice(1);
    return id || null;
  }

  try {
    const url = new URL(trimmed, window.location.origin);
    if (url.hash) {
      return url.hash.slice(1) || null;
    }
  } catch {
    return null;
  }

  return null;
};
