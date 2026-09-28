export const FAVORITES_KEY = 'qualia_navi_favorites';

export function getFavoriteIds(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

export function isFavorite(id: string): boolean {
  const favorites = getFavoriteIds();
  return favorites.includes(id);
}

export function toggleFavorite(id: string): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const favorites = getFavoriteIds();
    const index = favorites.indexOf(id);
    let updated: string[];
    let added = false;
    if (index >= 0) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
      added = true;
    }
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('qualia_favorites_updated', { detail: { id, added, favorites: updated } }));
    return added;
  } catch (e) {
    return false;
  }
}
