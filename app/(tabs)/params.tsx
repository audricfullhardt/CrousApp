import { StyleSheet, View, TouchableOpacity, ScrollView, Switch, Alert, Modal, Platform, Pressable, Linking } from 'react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import AppHeader from '@/app/components/ui/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import { X, ChevronDown, AlertTriangle, Check, Trash2 } from 'lucide-react-native';
import type { Language } from '@/contexts/LanguageContext';
import { Config } from '@/constants/Config';
import { api, Region } from '@/constants/api';
import { useRestaurantFilters } from '@/hooks/useRestaurantFilters';
import { trackPageView } from '@/utils/umami';

const LANGUAGES: { id: Language; name: string }[] = [
  { id: 'fr', name: 'Français (fr)' },
  { id: 'en', name: 'English (en)' },
];

export default function ParamsScreen() {
  const theme = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { favoriteRestaurants, favoriteRegion, setFavoriteRegion, clearFavorites, removeFavoriteRestaurant } = useFavorites();
  const { filters, applyFilters } = useRestaurantFilters();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [loadingRegions, setLoadingRegions] = useState(true);
  const navigateToLegal = () => Linking.openURL(Config.EXTERNAL.LEGAL_PAGE);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await api.getRegions();
        if (response.success) {
          setRegions(response.data);
        }
      } catch (error) {
        console.error('Error fetching regions:', error);
      } finally {
        setLoadingRegions(false);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
      trackPageView('Paramètres', '/parametres');
    }, []);

  const handleDeleteData = async () => {
    Alert.alert(
      t('SettingsPage.personal.deleteDataTitle'),
      t('SettingsPage.personal.deleteDataConfirmDescription'),
      [
        {
          text: t('SettingsPage.personal.deleteDataConfirmNo'),
          style: 'cancel',
        },
        {
          text: t('SettingsPage.personal.deleteDataConfirmYes'),
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              await clearFavorites();
              Alert.alert(t('SettingsPage.personal.deleteDataSuccessTitle'), t('SettingsPage.personal.deleteDataSuccessDescription'));
            } catch (error) {
              Alert.alert(t('SettingsPage.personal.deleteDataError'), t('SettingsPage.personal.deleteDataErrorDescription'));
              console.error(error);
            }
          },
        },
      ]
    );
  };

  const LanguageModal = () => (
    <Modal
      visible={showLanguageModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowLanguageModal(false)}
    >
      <View style={[styles.modalOverlay, { backgroundColor: theme.colors.surface + '80' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={[styles.modalTitle, { color: theme.colors.text }]}>{t('SettingsPage.language.title')}</ThemedText>
            <Pressable style={styles.closeButton} onPress={() => setShowLanguageModal(false)}>
              <X size={24} color={theme.colors.text} />
            </Pressable>
          </View>
          {LANGUAGES.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={[
                styles.modalOption,
                language === lang.id && { backgroundColor: theme.colors.primary + '20' },
              ]}
              onPress={() => {
                setLanguage(lang.id);
                setShowLanguageModal(false);
              }}
            >
              <ThemedText style={[
                styles.modalOptionText,
                { color: theme.colors.text },
                language === lang.id && { color: theme.colors.primary },
              ]}>
                {lang.name}
              </ThemedText>
              {language === lang.id && (
                <Check size={20} color={theme.colors.primary} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  const RegionModal = () => (
    <Modal
      visible={showRegionModal}
      transparent
      animationType="fade"
      onRequestClose={() => setShowRegionModal(false)}
    >
      <View style={[styles.modalOverlay, { backgroundColor: theme.colors.surface + '80' }]}>
        <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.modalHeader}>
            <ThemedText style={[styles.modalTitle, { color: theme.colors.text }]}>{t('SettingsPage.favourites.regionTitle')}</ThemedText>
            <Pressable style={styles.closeButton} onPress={() => setShowRegionModal(false)}>
              <X size={24} color={theme.colors.text} />
            </Pressable>
          </View>
          <ScrollView style={styles.modalScrollView}>
            {loadingRegions ? (
              <ThemedText style={[styles.modalOptionText, { color: theme.colors.text, textAlign: 'center', padding: 20 }]}>
                {t('SettingsPage.favourites.regionLoading')}...
              </ThemedText>
            ) : (
              <>
                {/* Option "Toutes les régions" */}
                <TouchableOpacity
                  style={[
                    styles.modalOption,
                    favoriteRegion === 'all' && { backgroundColor: theme.colors.primary + '20' },
                  ]}
                  onPress={() => {
                    setFavoriteRegion('all');
                    applyFilters([], '');
                    setShowRegionModal(false);
                  }}
                >
                  <ThemedText style={[
                    styles.modalOptionText,
                    { color: theme.colors.text },
                    favoriteRegion === 'all' && { color: theme.colors.primary },
                  ]}>
                    {t('SettingsPage.favourites.regionSelectAll')}
                  </ThemedText>
                  {favoriteRegion === 'all' && (
                    <Check size={20} color={theme.colors.primary} />
                  )}
                </TouchableOpacity>
                
                {/* Liste des régions */}
                {regions.map((region) => (
                  <TouchableOpacity
                    key={region.code}
                    style={[
                      styles.modalOption,
                      favoriteRegion === region.code.toString() && { backgroundColor: theme.colors.primary + '20' },
                    ]}
                    onPress={() => {
                      setFavoriteRegion(region.code.toString());
                      applyFilters([], '');
                      setShowRegionModal(false);
                    }}
                  >
                    <ThemedText style={[
                      styles.modalOptionText,
                      { color: theme.colors.text },
                      favoriteRegion === region.code.toString() && { color: theme.colors.primary },
                ]}>
                      {region.libelle}
                    </ThemedText>
                    {favoriteRegion === region.code.toString() && (
                      <Check size={20} color={theme.colors.primary} />
                    )}
                  </TouchableOpacity>
                ))}
              </>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader/>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('SettingsPage.appearanceTitle')}</ThemedText>
        
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('SettingsPage.theme.title')}</ThemedText>
              <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
                {t('SettingsPage.theme.description')}
              </ThemedText>
            </View>
            <Switch
              value={theme.dark}
              onValueChange={(value) => theme.setTheme(value ? 'dark' : 'light')}
            />
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('SettingsPage.language.title')}</ThemedText>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('SettingsPage.language.description')}
            </ThemedText>
            <Pressable style={styles.dropdownButton} onPress={() => setShowLanguageModal(true)}>
              <ThemedText style={[styles.dropdownText, { color: theme.colors.text }]}>
                {LANGUAGES.find(l => l.id === language)?.name || 'Français (fr)'}
              </ThemedText>
              <ChevronDown size={20} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('SettingsPage.behaviorTitle')}</ThemedText>
        
        {favoriteRestaurants.length === 0 ? (
          <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.alert, { backgroundColor: theme.colors.error + '10' }]}>
              <AlertTriangle size={20} color={theme.colors.error} />
              <ThemedText style={[styles.alertText, { color: theme.colors.error }]}>
                {t('SettingsPage.favourites.nofavouritesTitle')}
              </ThemedText>
            </View>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('SettingsPage.favourites.nofavouritesDescription')}
              <Link href="/restaurants" style={[styles.link, { color: theme.colors.link }]}>
                {t('RestaurantsPage.seo.title')}
              </Link>
            </ThemedText>
          </View>
        ) : null}

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('SettingsPage.favourites.title')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('SettingsPage.favourites.description')}
            </ThemedText>
            {favoriteRestaurants.length > 0 && (
              <View style={styles.favoritesList}>
                {favoriteRestaurants.map((restaurant) => (
                  <View key={restaurant.id} style={[styles.favoriteItem, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <View style={styles.restaurantInfo}>
                      <ThemedText style={[styles.restaurantName, { color: theme.colors.text }]} numberOfLines={1} ellipsizeMode="tail">{restaurant.name}</ThemedText>
                      <ThemedText style={[styles.restaurantCity, { color: theme.colors.text }]}>{restaurant.city}</ThemedText>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFavoriteRestaurant(restaurant.id)}
                      style={styles.removeButton}
                    >
                      <Trash2 size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('SettingsPage.favourites.regionTitle')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('SettingsPage.favourites.regionDescription')}
            </ThemedText>
            <Pressable style={styles.dropdownButton} onPress={() => setShowRegionModal(true)}>
              <ThemedText style={[styles.dropdownText, { color: theme.colors.text }]}>
                {favoriteRegion === 'all' 
                  ? t('SettingsPage.favourites.regionSelectAll')
                  : regions.find(r => r.code.toString() === favoriteRegion)?.libelle || t('SettingsPage.favourites.regionSelectAll')
                }
              </ThemedText>
              <ChevronDown size={20} color={theme.colors.text} />
            </Pressable>
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('SettingsPage.personalTitle')}</ThemedText>
        
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('SettingsPage.personal.deleteDataTitle')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('SettingsPage.personal.deleteDataDescription')}
            </ThemedText>
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
              onPress={handleDeleteData}
            >
              <ThemedText style={[styles.deleteButtonText, { color: theme.colors.surface }]}>
                {t('SettingsPage.personal.deleteDataButton')}
              </ThemedText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.card}>
          <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('Footer.authors')}</ThemedText>
          <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
            {t('Footer.disclaimer')}
          </ThemedText>
          <Pressable style={styles.dropdownButton} onPress={() => navigateToLegal()}>
          <ThemedText style={[styles.settingDescription, { color: theme.colors.text, textDecorationLine: 'underline' }]}>{t('LegalPage.legal.title')}</ThemedText>
          </Pressable>
        </View>
      </ScrollView>
      <LanguageModal />
      <RegionModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 100 : 100,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 16,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 12,
  },
  selectButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  alertText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  link: {
    textDecorationLine: 'underline',
  },
  deleteButton: {
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    width: '100%',
    borderRadius: 12,
    padding: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalScrollView: {
    maxHeight: 300,
  },
  favoritesList: {
    marginBottom: 12,
    gap: 8,
  },
  favoriteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  restaurantInfo: {
    flex: 1,
    marginRight: 8,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  restaurantCity: {
    fontSize: 14,
    opacity: 0.7,
  },
  removeButton: {
    padding: 4,
  },
  closeButton: {
    padding: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
  },
  dropdownText: {
    fontSize: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  errorText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
