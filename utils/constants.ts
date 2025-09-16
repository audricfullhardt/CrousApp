/**
 * Constantes pour l'application CrousApp
 */

// Configuration de pagination
export const PAGINATION_CONFIG = {
  ITEMS_PER_PAGE: 20,
} as const;

// Types de repas
export const MEAL_TYPES = {
  MORNING: 'matin',
  LUNCH: 'midi',
  EVENING: 'soir',
} as const;

// Libellés des types de repas
export const MEAL_TYPE_LABELS = {
  [MEAL_TYPES.MORNING]: 'Petit-déjeuner',
  [MEAL_TYPES.LUNCH]: 'Déjeuner',
  [MEAL_TYPES.EVENING]: 'Dîner',
} as const;

// Jours de la semaine
export const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"] as const;

// Types de services
export const SERVICE_TYPES = ['matin', 'midi', 'soir'] as const;

// Types de paiement
export const PAYMENT_TYPES = {
  CARD: 'Carte bancaire',
  IZLY: 'IZLY',
} as const;

// Types de restaurant
export const RESTAURANT_TYPES = {
  CAFETERIA: 'Cafeteria',
} as const;

// Mots-clés pour les icônes de plats
export const PLAT_ICON_KEYWORDS = {
  COFFEE: ['café', 'thé', 'chocolat', 'boisson', 'eau', 'soda'],
  BAKERY: ['croissant', 'pain', 'muffin', 'donuts'],
} as const;

// Couleurs pour les statuts
export const STATUS_COLORS = {
  OPEN: '#4CAF50',
  CLOSED: '#F44336',
} as const;

// Configuration des styles
export const STYLE_CONFIG = {
  BORDER_RADIUS: {
    SMALL: 8,
    MEDIUM: 12,
    LARGE: 16,
  },
  SHADOW: {
    LIGHT: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
    MEDIUM: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    STRONG: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
  },
} as const;
