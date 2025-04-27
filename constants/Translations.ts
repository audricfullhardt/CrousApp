export type Language = 'fr' | 'en';

export type Translations = {
  [key: string]: {
    fr: string;
    en: string;
  };
};

export const translations: Translations = {
  // Common
  'app.name': {
    fr: 'CROUStillant',
    en: 'CROUStillant',
  },
  'app.description': {
    fr: 'Vos repas, simples et accessibles',
    en: 'Your meals, simple and accessible',
  },
  'app.subtitle': {
    fr: 'CROUStillant vous permet de consulter les menus des restaurants CROUS de France et d\'outre-mer.',
    en: 'CROUStillant allows you to view menus from CROUS restaurants in France and overseas.',
  },

  // Tabs
  'tabs.home': {
    fr: 'Accueil',
    en: 'Home',
  },
  'tabs.restaurants': {
    fr: 'Restaurants',
    en: 'Restaurants',
  },
  'tabs.menu': {
    fr: 'Menu',
    en: 'Menu',
  },
  'tabs.info': {
    fr: 'À propos',
    en: 'About',
  },
  'tabs.settings': {
    fr: 'Paramètres',
    en: 'Settings',
  },

  // Common actions
  'common.cancel': {
    fr: 'Annuler',
    en: 'Cancel',
  },
  'common.success': {
    fr: 'Succès',
    en: 'Success',
  },
  'common.error': {
    fr: 'Erreur',
    en: 'Error',
  },

  // Settings
  'settings.appearance': {
    fr: 'Apparence',
    en: 'Appearance',
  },
  'settings.behavior': {
    fr: 'Comportement',
    en: 'Behavior',
  },
  'settings.personal_info': {
    fr: 'Informations personnelles',
    en: 'Personal Information',
  },
  'settings.language.title': {
    fr: 'Choisir la langue',
    en: 'Choose language',
  },
  'settings.language.description': {
    fr: 'Choisissez la langue que vous souhaitez utiliser sur le site.',
    en: 'Choose the language you want to use on the site.',
  },
  'settings.dark_theme.title': {
    fr: 'Thème sombre',
    en: 'Dark theme',
  },
  'settings.dark_theme.description': {
    fr: 'Activez le thème sombre pour une expérience plus agréable en faible luminosité.',
    en: 'Enable dark theme for a more pleasant experience in low light.',
  },
  'settings.region.title': {
    fr: 'Choisir la région',
    en: 'Choose region',
  },
  'settings.region.description': {
    fr: 'Choisissez une région pour afficher les restaurants de cette région en premier.',
    en: 'Choose a region to display restaurants from this region first.',
  },
  'settings.region.all': {
    fr: 'Toutes les régions',
    en: 'All regions',
  },
  'settings.favorites.title': {
    fr: 'Vos restaurants favoris',
    en: 'Your favorite restaurants',
  },
  'settings.favorites.description': {
    fr: 'Liste de vos restaurants favoris. Cliquez sur la croix pour retirer un restaurant des favoris.',
    en: 'List of your favorite restaurants. Click on the cross to remove a restaurant from favorites.',
  },
  'settings.favorites.empty.title': {
    fr: 'Attention - Aucun restaurant favori',
    en: 'Warning - No favorite restaurants',
  },
  'settings.favorites.empty.description': {
    fr: 'Vous n\'avez pas de favoris pour le moment. Ajoutez votre premier favori maintenant en se rendant sur la page ',
    en: 'You don\'t have any favorites yet. Add your first favorite now by going to the ',
  },
  'settings.favorites.empty.link': {
    fr: 'des restaurants',
    en: 'restaurants page',
  },
  'settings.delete_data.title': {
    fr: 'Supprimer les données',
    en: 'Delete data',
  },
  'settings.delete_data.description': {
    fr: 'Supprimez toutes les données stockées localement sur votre appareil. Cette action est irréversible.',
    en: 'Delete all data stored locally on your device. This action is irreversible.',
  },
  'settings.delete_data.button': {
    fr: 'Supprimer les données',
    en: 'Delete data',
  },
  'settings.delete_data.confirm': {
    fr: 'Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.',
    en: 'Are you sure you want to delete all data? This action is irreversible.',
  },
  'settings.delete_data.delete': {
    fr: 'Supprimer',
    en: 'Delete',
  },
  'settings.delete_data.success': {
    fr: 'Toutes les données ont été supprimées.',
    en: 'All data has been deleted.',
  },
  'settings.delete_data.error': {
    fr: 'Une erreur est survenue lors de la suppression des données.',
    en: 'An error occurred while deleting the data.',
  },

  // Home Screen
  'home.discover': {
    fr: 'Découvrir votre menu',
    en: 'Discover your menu',
  },
  'home.view_restaurants': {
    fr: 'Voir les restaurants',
    en: 'View restaurants',
  },
  'home.open_source': {
    fr: 'Ce projet est 100% open source !',
    en: 'This project is 100% open source!',
  },

  // Restaurants Screen
  'restaurants.title': {
    fr: 'Restaurants',
    en: 'Restaurants',
  },
  'restaurants.available': {
    fr: 'Il y a {count} restaurants disponibles',
    en: 'There are {count} restaurants available',
  },
  'restaurants.search': {
    fr: 'Rechercher un restaurant...',
    en: 'Search for a restaurant...',
  },
  'restaurants.filters': {
    fr: 'Filtres',
    en: 'Filters',
  },
  'restaurants.filters.crous': {
    fr: 'CROUS',
    en: 'CROUS',
  },
  'restaurants.filters.all_crous': {
    fr: 'Tous les CROUS',
    en: 'All CROUS',
  },
  'restaurants.filters.restaurant_name': {
    fr: 'Nom du restaurant',
    en: 'Restaurant name',
  },
  'restaurants.filters.alphabetical_order': {
    fr: 'Ordre alphabétique (A-Z)',
    en: 'Alphabetical order (A-Z)',
  },
  'restaurants.filters.reverse_alphabetical': {
    fr: 'Ordre alphabétique inverse (Z-A)',
    en: 'Reverse alphabetical order (Z-A)',
  },
  'restaurants.filters.city': {
    fr: 'Ville du restaurant',
    en: 'Restaurant city',
  },
  'restaurants.filters.city_alphabetical_order': {
    fr: 'Ordre alphabétique (A-Z)',
    en: 'Alphabetical order (A-Z)',
  },
  'restaurants.filters.city_reverse_alphabetical': {
    fr: 'Ordre alphabétique inverse (Z-A)',
    en: 'Reverse alphabetical order (Z-A)',
  },
  'restaurants.filters.type': {
    fr: 'Type de restaurant',
    en: 'Restaurant type',
  },
  'restaurants.filters.all_types': {
    fr: 'Tous les types',
    en: 'All types',
  },
  'restaurants.filters.payment': {
    fr: 'Moyens de paiement',
    en: 'Payment methods',
  },
  'restaurants.filters.card_payment': {
    fr: 'Paiement par carte bancaire accepté',
    en: 'Card payment accepted',
  },
  'restaurants.filters.izly_payment': {
    fr: 'Paiement Izly accepté',
    en: 'Izly payment accepted',
  },
  'restaurants.filters.additional': {
    fr: 'Filtres additionnels',
    en: 'Additional filters',
  },
  'restaurants.filters.open_now': {
    fr: 'Ouvert maintenant',
    en: 'Open now',
  },
  'restaurants.filters.accessible': {
    fr: 'Accessible aux personnes à mobilité réduite',
    en: 'Accessible to people with reduced mobility',
  },
  'restaurants.filters.close': {
    fr: 'Fermer',
    en: 'Close',
  },
  'restaurants.nearby': {
    fr: 'Restaurants à proximité',
    en: 'Nearby restaurants',
  },
  'restaurants.show_map': {
    fr: 'Afficher sur la carte',
    en: 'Show on map',
  },
  'restaurants.view_menu': {
    fr: 'Voir le menu',
    en: 'View menu',
  },
  'restaurants.open': {
    fr: 'Ouvert',
    en: 'Open',
  },
  'restaurants.closed': {
    fr: 'Fermé',
    en: 'Closed',
  },
  'restaurants.reset': {
    fr: 'Réinitialiser',
    en: 'Reset',
  },

  // Info Screen
  'info.students': {
    fr: 'Créé par des étudiants, pour des étudiants...',
    en: 'Created by students, for students...',
  },
  'info.students_desc': {
    fr: 'CROUStillant est un projet qui a pour but de fournir des informations sur les menus des restaurants universitaires en France et en Outre-Mer.',
    en: 'CROUStillant is a project aimed at providing information about university restaurant menus in France and Overseas.',
  },
  'info.hot_meals': {
    fr: 'Plats toujours chauds.',
    en: 'Always hot meals.',
  },
  'info.hot_meals_desc': {
    fr: 'CROUStillant scan l\'entièreté des menus des restaurants CROUS plusieurs fois par jour pour vous fournir des informations toujours à jour et fiables.',
    en: 'CROUStillant scans all CROUS restaurant menus several times a day to provide you with up-to-date and reliable information.',
  },
  'info.open_source': {
    fr: 'Gratuit & 100% open-source !',
    en: 'Free & 100% open-source!',
  },
  'info.open_source_desc': {
    fr: 'CROUStillant est un projet entièrement open-source et gratuit. Vous pouvez consulter le code source du projet sur GitHub et contribuer à son développement si vous le souhaitez.',
    en: 'CROUStillant is a completely open-source and free project. You can view the project source code on GitHub and contribute to its development if you wish.',
  },
  'info.view_github': {
    fr: 'Voir le projet sur GitHub →',
    en: 'View project on GitHub →',
  },

  // Location
  'location.permission_denied': {
    fr: 'Permission refusée',
    en: 'Permission denied',
  },
  'location.permission_required': {
    fr: 'L\'accès à votre localisation est nécessaire pour afficher les restaurants les plus proches.',
    en: 'Access to your location is required to show nearby restaurants.',
  },
  'location.error': {
    fr: 'Erreur de localisation',
    en: 'Location error',
  },
  'location.error_message': {
    fr: 'Impossible d\'obtenir votre position. Veuillez vérifier que la localisation est activée.',
    en: 'Unable to get your location. Please check that location services are enabled.',
  },
  'location.distance': {
    fr: 'à {distance}km',
    en: '{distance}km away',
  },

  // Map
  'restaurants.map_title': {
    fr: 'Carte des restaurants',
    en: 'Restaurants map',
  },
  'common.back': {
    fr: 'Retour',
    en: 'Back',
  },
}; 