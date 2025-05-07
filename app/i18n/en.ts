export default {
  restaurants: {
    title: 'Restaurants',
    available: '{count} restaurants available',
    search: 'Search for a restaurant',
    filters: 'Filters',
    nearby: 'Nearby',
    show_map: 'Show map',
    open: 'Open',
    closed: 'Closed',
    view_menu: 'View menu',
    favorites_count: 'There is {{count}} favorite restaurant',
    favorites_count_plural: 'There are {{count}} favorite restaurants',
    reset: 'Reset',
    map_title: 'Restaurants map',
    filter_options: {
      restaurant_name: 'Restaurant name',
      alphabetical_order: 'Alphabetical order',
      reverse_alphabetical: 'Reverse alphabetical order',
      city: 'City',
      city_alphabetical_order: 'Alphabetical order',
      city_reverse_alphabetical: 'Reverse alphabetical order',
      payment: 'Payment',
      card_payment: 'Card payment',
      izly_payment: 'Izly',
      additional: 'Additional options',
      open_now: 'Open now',
      accessible: 'Accessible',
      close: 'Close',
    },
  },
  settings: {
    title: 'Settings',
    appearance: 'Appearance',
    language: {
      title: 'Language',
      description: 'Choose the application language',
    },
    dark_theme: {
      title: 'Dark theme',
      description: 'Enable dark theme',
    },
    behavior: 'Behavior',
    favorites: {
      title: 'Favorite restaurants',
      description: 'Manage your favorite restaurants',
      empty: {
        title: 'No favorite restaurants',
        description: 'You don\'t have any favorite restaurants yet. ',
        link: 'Discover restaurants',
      },
    },
    region: {
      title: 'Region',
      description: 'Choose your region',
      all: 'All regions',
    },
    personal_info: 'Personal information',
    delete_data: {
      title: 'Delete data',
      description: 'Delete all application data',
      button: 'Delete',
      confirm: 'Are you sure you want to delete all data?',
      success: 'Data successfully deleted',
      error: 'Error while deleting data',
    },
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  },
  common: {
    cancel: 'Cancel',
    success: 'Success',
    error: 'Error',
    back: 'Back',
  },
  tabs: {
    home: 'Home',
    restaurants: 'Restaurants',
    menu: 'Menu',
    info: 'Info',
    settings: 'Settings',
  },
  home: {
    discover: 'Discover your menu',
    view_restaurants: 'View restaurants',
    open_source: 'The project is 100% open source !',
    Cards: {
      title: 'All information about your restaurant',
      searchCard: {
        title: 'Search by region, city or restaurant',
        desc: 'Easily access your restaurant with our search function',
        button: 'Learn more',
      },
      hoursCard: {
        title: 'Opening and closing hours',
        desc: 'Quickly check the opening hours of your university restaurant.',
        button: 'Learn more',
      },
      paymentCard: {
        title: 'Contacts and accepted payment methods',
        desc: 'Discover the payment methods accepted in your university restaurant.',
        button: 'Learn more',
      },
      accessCard: {
        title: 'Access to all restaurants',
        desc: 'CROUStillant offers you a complete selection of CROUS restaurants.',
        button: 'Learn more',
      },
    },
    Team: {
      title: 'Join the team',
      Cards: {
        projectDesc: {
          title: 'Created by students, for students',
          desc: 'CROUStillant is a project aimed at providing information about university restaurant menus in France and Overseas.',
          button: 'Join the project',
        },
        teamDesc: {
          title: 'Join the team!',
          desc: 'CROUStillant is a constantly evolving project. We are always looking for new talents to join the team and help us improve the service.',
          button: 'Join us',
          teamMembers: {
            title: 'Team members',
            members: {
              paul: 'Paul Bayfield',
              alden: 'Adlen Cherif',
              lucas: 'Lucas Debeve',
              louis: 'Louis Descotes',
            }
          }
        },
        cicd: {
          title: 'Easy integration',
          desc: 'Integrate CROUStillant information into your own application for free using our API.',
          button: 'Start using it',
          server: {
            title: 'Server',
            link: 'https://api.croustillant.menu',
            server_desc: 'Production server',
          },
        },
        convinced: {
          title: 'Convinced?',
          desc: 'Start using CROUStillant now!',
          button: 'Discover your menu',
        }
      },
    }
  },
  info: {
    students: 'Students',
    students_desc: 'This application is intended for students who want to find nearby CROUS restaurants.',
    hot_meals: 'Hot meals',
    hot_meals_desc: 'CROUS restaurants offer hot meals at reduced prices for students.',
    open_source: 'Open Source',
    open_source_desc: 'This application is open source and available on GitHub.',
    view_github: 'View on GitHub',
  },
  app: {
    name: 'CROUStillant',
    description: 'CROUS menu in one click',
    subtitle: 'CROUStillant allows you to view menus from CROUS restaurants in France and overseas.',
  },
  location: {
    permission_denied: 'Permission denied',
    permission_required: 'Permission required',
    error: 'Error',
    error_message: 'An error occurred while retrieving your position',
    distance: '{distance}km away',
  },
}; 