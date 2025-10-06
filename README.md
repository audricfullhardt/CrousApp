# 🍽️ CROUStillantApp

Une application React Native moderne pour découvrir et explorer les restaurants CROUS avec une interface intuitive et des fonctionnalités avancées.

## 📱 Description

CrousApp est une application mobile développée avec React Native et Expo Router qui permet aux étudiants de :
- Découvrir les restaurants CROUS disponibles
- Consulter les menus en temps réel
- Localiser les restaurants sur une carte interactive
- Gérer leurs restaurants favoris
- Personnaliser l'interface selon leurs préférences

## 🚀 Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- **Node.js** (version 18 ou supérieure)
- **npm** ou **yarn**
- **Expo CLI** : `npm install -g @expo/cli`
- **Expo Go** (application mobile pour tester)
- **Git**

### Pour le développement iOS (optionnel)
- **Xcode** (sur macOS)
- **iOS Simulator**

### Pour le développement Android (optionnel)
- **Android Studio**
- **Android Emulator**

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <url-du-repo>
   cd CrousApp
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configurer les variables d'environnement**
   ```bash
   cp .env.example .env
   ```
   Puis éditez le fichier `.env` avec vos clés API :
   ```
   EXPO_PUBLIC_API_BASE_URL=your_api_url_here
   ```

4. **Démarrer le serveur de développement**
   ```bash
   npm start
   # ou
   yarn start
   ```

5. **Lancer sur votre appareil**
   - Scannez le QR code avec l'app **Expo Go** (iOS/Android)
   - Ou utilisez les commandes :
     ```bash
     npm run ios      # iOS Simulator
     npm run android  # Android Emulator
     npm run web      # Navigateur web
     ```

## 📁 Structure du projet

```
CrousApp/
├── app/                          # Pages et composants (Expo Router)
│   ├── (tabs)/                   # Navigation par onglets
│   │   ├── _layout.tsx          # Configuration des onglets
│   │   ├── index.tsx            # Page d'accueil
│   │   ├── restaurants.tsx      # Liste des restaurants
│   │   ├── menu.tsx             # Détails du menu
│   │   ├── info.tsx             # Informations de l'app
│   │   └── params.tsx           # Paramètres
│   ├── components/ui/           # Composants réutilisables
│   │   ├── RestaurantCard.tsx   # Carte restaurant
│   │   ├── FilterModal.tsx      # Modal de filtres
│   │   ├── TabBarBackground.tsx  # Arrière-plan des onglets
│   │   └── ...
│   ├── i18n/                    # Fichiers de traduction
│   │   ├── fr.ts               # Français
│   │   └── en.ts               # Anglais
│   └── _layout.tsx             # Layout principal
├── contexts/                    # Contextes React
│   ├── ThemeContext.tsx        # Gestion des thèmes
│   ├── LanguageContext.tsx     # Gestion des langues
│   └── FavoritesContext.tsx    # Gestion des favoris
├── constants/                   # Constantes et configuration
│   ├── Theme.ts               # Définition des thèmes
│   ├── Colors.ts              # Palette de couleurs
│   └── api.ts                 # Configuration API
├── hooks/                      # Hooks personnalisés
│   ├── useLocation.ts         # Géolocalisation
│   └── useThemeColor.ts       # Couleurs du thème
├── assets/                     # Ressources statiques
│   ├── images/               # Images et icônes
│   └── fonts/                # Polices personnalisées
└── app.json                   # Configuration Expo
```

### Fichiers principaux

- **`app/_layout.tsx`** : Layout racine avec les providers (thème, langue, favoris)
- **`app/(tabs)/_layout.tsx`** : Configuration de la navigation par onglets
- **`contexts/`** : Gestion globale de l'état (thème, langue, favoris)
- **`constants/Theme.ts`** : Définition des thèmes clair/sombre
- **`app/i18n/`** : Système d'internationalisation (FR/EN)

## 🌍 Gestion de la langue et du thème

### Système de traduction

L'application supporte le français et l'anglais via un système de contextes :

```tsx
// Utilisation dans un composant
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t, language, setLanguage } = useLanguage();
  
  return (
    <Text>{t('restaurants.title')}</Text>
  );
}
```

**Fichiers de traduction :**
- `app/i18n/fr.ts` : Traductions françaises
- `app/i18n/en.ts` : Traductions anglaises

**Ajouter une nouvelle traduction :**
1. Ajoutez la clé dans les fichiers `fr.ts` et `en.ts`
2. Utilisez `t('ma.nouvelle.cle')` dans vos composants

### Système de thème

Support des thèmes clair, sombre et automatique :

```tsx
// Utilisation dans un composant
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Contenu</Text>
    </View>
  );
}
```

**Thèmes disponibles :**
- **Clair** : Interface claire et moderne
- **Sombre** : Interface sombre pour un confort visuel
- **Automatique** : Suit les préférences système

**Personnalisation :**
- Modifiez `constants/Theme.ts` pour ajuster les couleurs
- Les préférences sont sauvegardées automatiquement

## 🛠️ Scripts disponibles

```bash
npm start          # Démarrer le serveur de développement
npm run android    # Lancer sur Android
npm run ios        # Lancer sur iOS
npm run web        # Lancer sur le web
npm test           # Lancer les tests
npm run lint       # Vérifier le code
npm run reset-project  # Réinitialiser le projet
```

## 🔧 Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine :

```env
EXPO_PUBLIC_API_BASE_URL=https://api.example.com
```

### Configuration des cartes

Pour utiliser les cartes Google Maps, configurez vos clés API dans `app.json` :

```json
{
  "expo": {
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_API_KEY"
      }
    },
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_API_KEY"
        }
      }
    }
  }
}
```

## 📱 Fonctionnalités

- ✅ **Navigation par onglets** avec Expo Router
- ✅ **Thèmes clair/sombre** avec persistance
- ✅ **Internationalisation** (FR/EN)
- ✅ **Géolocalisation** pour les restaurants proches
- ✅ **Cartes interactives** avec Google Maps
- ✅ **Gestion des favoris** avec AsyncStorage
- ✅ **Interface responsive** et moderne
- ✅ **Effets de flou** sur iOS
- ✅ **Animations fluides** avec Reanimated


**Développé avec ❤️ pour la communauté étudiante**