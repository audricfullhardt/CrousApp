export default {
  restaurants: {
    title: 'Restaurants',
    available: '{count} restaurants disponibles',
    search: 'Rechercher un restaurant',
    filters: 'Filtres',
    nearby: 'Restaurants à proximité',
    show_map: 'Afficher sur la carte',
    open: 'Ouvert',
    closed: 'Fermé',
    view_menu: 'Voir le menu',
    favorites_count: 'Il y a {{count}} restaurant favori',
    favorites_count_plural: 'Il y a {{count}} restaurants favoris',
    reset: 'Réinitialiser',
    map_title: 'Carte des restaurants',
    filter_options: {
      restaurant_name: 'Nom du restaurant',
      alphabetical_order: 'Ordre alphabétique',
      reverse_alphabetical: 'Ordre alphabétique inverse',
      city: 'Ville',
      city_alphabetical_order: 'Ordre alphabétique',
      city_reverse_alphabetical: 'Ordre alphabétique inverse',
      payment: 'Paiement',
      card_payment: 'Carte bancaire',
      izly_payment: 'Izly',
      additional: 'Options supplémentaires',
      open_now: 'Ouvert maintenant',
      accessible: 'Accessible',
      close: 'Fermer',
    },
  },
  settings: {
    title: 'Paramètres',
    appearance: 'Apparence',
    language: {
      title: 'Langue',
      description: 'Choisissez la langue de l\'application',
    },
    dark_theme: {
      title: 'Thème sombre',
      description: 'Activer le thème sombre',
    },
    behavior: 'Comportement',
    favorites: {
      title: 'Restaurants favoris',
      description: 'Gérez vos restaurants favoris',
      empty: {
        title: 'Aucun restaurant favori',
        description: 'Vous n\'avez pas encore de restaurant favori. ',
        link: 'Découvrir des restaurants',
      },
    },
    region: {
      title: 'Région',
      description: 'Choisissez votre région',
      all: 'Toutes les régions',
    },
    personal_info: 'Informations personnelles',
    delete_data: {
      title: 'Supprimer les données',
      description: 'Supprimer toutes les données de l\'application',
      button: 'Supprimer',
      confirm: 'Êtes-vous sûr de vouloir supprimer toutes les données ?',
      success: 'Données supprimées avec succès',
      error: 'Erreur lors de la suppression des données',
    },
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
  },
  common: {
    cancel: 'Annuler',
    success: 'Succès',
    error: 'Erreur',
    back: 'Retour',
  },
  tabs: {
    home: 'Accueil',
    restaurants: 'Restaurants',
    menu: 'Menu',
    info: 'Info',
    settings: 'Paramètres',
  },
  home: {
    discover: 'Découvrir votre menu',
    view_restaurants: 'Voir les restaurants',
    open_source: 'Le projet est 100% open source !',
    Cards:{
      title: 'Toutes les informations sur votre restaurant',
      searchCard: {
        title: 'Recherche par région, ville ou restaurant',
        desc: 'Accédez facilement à votre restaurant grâce à notre fonction de recherche',
        button: 'En savoir plus',
      },
      hoursCard: {
        title: 'Horaires d\'ouverture et de fermeture',
        desc: 'Consultez rapidement les horaires de votre restaurant universitaire du CROUS.',
        button: 'En savoir plus',
      },
      paymentCard: {
        title: 'Contacts et moyens de paiement acceptés',
        desc: 'Découvrez les moyens de paiement acceptés dans votre restaurant universitaire.',
        button: 'En savoir plus',
      },
      accessCard: {
        title: 'Accès à tous les restaurants',
        desc: 'CROUStillant vous propose une sélection complète des restaurants du CROUS.',
        button: 'En savoir plus',
      },
    },
    Team:{
      title: 'Faites partie de l’équipe',
      Cards:{
        projectDesc:{
          title: 'Créé par des étudiants, pour des étudiants',
          desc: 'CROUStillant est un projet qui a pour but de fournir des informations sur les menus des restaurants universitaires en France et en Outre-Mer.',
          button: 'Participer au projet',
        },
        teamDesc:{
          title: 'Rejoignez l\'équipe !',
          desc: 'CROUStillant est un projet en constante évolution. Nous sommes toujours à la recherche de nouveaux talents pour rejoindre l\'équipe et nous aider à améliorer le service.',
          button: 'Nous rejoindre',
          teamMembers:{
            title: 'Membres de l\'équipe',
            members:{
              paul: 'Paul Bayfield',
              alden: 'Adlen Cherif',
              lucas: 'Lucas Debeve',
              louis: 'Louis Descotes',
            }
          }
        },
        cicd:{
          title: 'Intégration facile',
          desc: 'Intégrer les informations de CROUStillant sur votre propre application gratuitement en utilisant notre API.',
          button: 'Commencer à l\'utiliser',
          server:{
            title: 'Serveur',
            link: 'https://api.croustillant.menu',
            server_desc: 'Serveur de production',
          },
        },
        convinced:{
          title: 'Convaincu ?',
          desc: 'Débutez votre utilisation de CROUStillant dès maintenant !',
          button: 'Découvrir votre menu',
        }
      },
    }
  },
  info: {
    students: 'Étudiants',
    students_desc: 'Cette application est destinée aux étudiants qui souhaitent trouver des restaurants CROUS à proximité.',
    hot_meals: 'Repas chauds',
    hot_meals_desc: 'Les restaurants CROUS proposent des repas chauds à prix réduits pour les étudiants.',
    open_source: 'Open Source',
    open_source_desc: 'Cette application est open source et disponible sur GitHub.',
    view_github: 'Voir sur GitHub',
  },
  app: {
    name: 'CROUStillant',
    description: 'Le menu du CROUS en un clic',
    subtitle: 'CROUStillant vous permet de consulter les menus des restaurants CROUS de France et d\'outre-mer.',
  },
  location: {
    permission_denied: 'Permission refusée',
    permission_required: 'Permission requise',
    error: 'Erreur',
    error_message: 'Une erreur est survenue lors de la récupération de votre position',
    distance: 'à {distance}km',
  },
}; 