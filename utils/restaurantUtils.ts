import { Restaurant } from '@/constants/api';

/**
 * Vérifie si un restaurant est ouvert selon ses horaires
 */
export const checkIfRestaurantOpen = (restaurant: Restaurant): boolean => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentHour = now.getHours();
  const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
  
  if (!restaurant.jours_ouvert?.[dayIndex]) {
    return false;
  }
  
  const daySchedule = restaurant.jours_ouvert[dayIndex];
  const timeRanges = [
    { start: 6, end: 11, service: daySchedule.ouverture.matin },
    { start: 11, end: 15, service: daySchedule.ouverture.midi },
    { start: 18, end: 22, service: daySchedule.ouverture.soir },
  ];

  return timeRanges.some(({ start, end, service }) => 
    currentHour >= start && currentHour < end && service
  );
};

/**
 * Formate une date au format français (DD-MM-YYYY)
 */
export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split('T')[0].split('-').reverse().join('-');
};

/**
 * Calcule la distance entre deux points géographiques
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

/**
 * Filtre les restaurants par recherche textuelle
 */
export const filterRestaurantsBySearch = (
  restaurants: Restaurant[],
  searchQuery: string
): Restaurant[] => {
  if (!searchQuery.trim()) return restaurants;
  
  const query = searchQuery.toLowerCase();
  return restaurants.filter(restaurant =>
    (restaurant.nom?.toLowerCase() || '').includes(query) ||
    (restaurant.adresse?.toLowerCase() || '').includes(query) ||
    (restaurant.zone?.toLowerCase() || '').includes(query)
  );
};

/**
 * Trie les restaurants par ordre alphabétique
 */
export const sortRestaurantsAlphabetically = (
  restaurants: Restaurant[],
  reverse = false
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    const comparison = a.nom.localeCompare(b.nom, undefined, { sensitivity: 'base' });
    return reverse ? -comparison : comparison;
  });
};

/**
 * Trie les restaurants par ville
 */
export const sortRestaurantsByCity = (
  restaurants: Restaurant[],
  reverse = false
): Restaurant[] => {
  return [...restaurants].sort((a, b) => {
    const comparison = (a.zone || '').localeCompare(b.zone || '', undefined, { sensitivity: 'base' });
    return reverse ? -comparison : comparison;
  });
};

/**
 * Filtre les restaurants par méthodes de paiement
 */
export const filterRestaurantsByPayment = (
  restaurants: Restaurant[],
  cardPayment: boolean,
  izlyPayment: boolean
): Restaurant[] => {
  if (!cardPayment && !izlyPayment) return restaurants;
  
  return restaurants.filter(restaurant => {
    if (!restaurant.paiement) return false;
    
    const hasCardPayment = cardPayment && restaurant.paiement.includes('Carte bancaire');
    const hasIzlyPayment = izlyPayment && restaurant.paiement.includes('IZLY');
    
    return cardPayment && izlyPayment
      ? hasCardPayment && hasIzlyPayment
      : hasCardPayment || hasIzlyPayment;
  });
};

/**
 * Filtre les restaurants ouverts actuellement
 */
export const filterOpenRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.getHours() * 60 + now.getMinutes();

  return restaurants.filter(restaurant => {
    if (!restaurant.actif || !restaurant.horaires?.length) return false;

    const todaySchedule = restaurant.horaires[currentDay === 0 ? 6 : currentDay - 1];
    if (!todaySchedule) return false;

    const timeMatch = todaySchedule.match(/(\d{1,2})h(\d{2})\s*-\s*(\d{1,2})h(\d{2})/);
    if (!timeMatch) return false;

    const [, openHour, openMinutes, closeHour, closeMinutes] = timeMatch.map(Number);
    const openTime = openHour * 60 + openMinutes;
    const closeTime = closeHour * 60 + closeMinutes;

    return currentTime >= openTime && currentTime <= closeTime;
  });
};

/**
 * Filtre les restaurants accessibles (PMR)
 */
export const filterAccessibleRestaurants = (restaurants: Restaurant[]): Restaurant[] => {
  return restaurants.filter(restaurant => 
    restaurant.paiement?.some(payment => 
      payment.toLowerCase().includes('pmr') || 
      payment.toLowerCase().includes('accessib')
    )
  );
};

export const filterRestaurantsByRegion = (restaurants: Restaurant[], region: number): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.region?.code === region);
};

export const filterRestaurantsByRegionAll = (restaurants: Restaurant[]): Restaurant[] => {
  return restaurants.filter(restaurant => restaurant.region?.code !== undefined);
};
