import { StyleSheet, View, TouchableOpacity, ScrollView, Switch, Alert, Modal } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import AppHeader from '@/app/components/ui/AppHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { Language } from '@/constants/Translations';

const REGIONS = [
  { id: 'all', name: 'Toutes les régions' },
  { id: 'idf', name: 'Île-de-France' },
  { id: 'aura', name: 'Auvergne-Rhône-Alpes' },
  { id: 'paca', name: 'Provence-Alpes-Côte d\'Azur' },
];

const LANGUAGES: { id: Language; name: string }[] = [
  { id: 'fr', name: 'Français (fr)' },
  { id: 'en', name: 'English (en)' },
];

export default function ParamsScreen() {
  const theme = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { favoriteRestaurants, favoriteRegion, setFavoriteRegion, clearFavorites, removeFavoriteRestaurant } = useFavorites();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showRegionModal, setShowRegionModal] = useState(false);

  const handleDeleteData = async () => {
    Alert.alert(
      t('settings.delete_data.title'),
      t('settings.delete_data.confirm'),
      [
        {
          text: t('common.cancel'),
          style: 'cancel',
        },
        {
          text: t('settings.delete_data.delete'),
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              await clearFavorites();
              Alert.alert(t('common.success'), t('settings.delete_data.success'));
            } catch (error) {
              Alert.alert(t('common.error'), t('settings.delete_data.error'));
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
            <ThemedText style={[styles.modalTitle, { color: theme.colors.text }]}>{t('settings.language.title')}</ThemedText>
            <TouchableOpacity onPress={() => setShowLanguageModal(false)}>
              <IconSymbol name="xmark" size={24} color={theme.colors.text} />
            </TouchableOpacity>
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
                <IconSymbol
                  name="checkmark"
                  size={20}
                  color={theme.colors.primary}
                />
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
            <ThemedText style={[styles.modalTitle, { color: theme.colors.text }]}>{t('settings.region.title')}</ThemedText>
            <TouchableOpacity onPress={() => setShowRegionModal(false)}>
              <IconSymbol name="xmark" size={24} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
          {REGIONS.map((region) => (
            <TouchableOpacity
              key={region.id}
              style={[
                styles.modalOption,
                favoriteRegion === region.id && { backgroundColor: theme.colors.primary + '20' },
              ]}
              onPress={() => {
                setFavoriteRegion(region.id);
                setShowRegionModal(false);
              }}
            >
              <ThemedText style={[
                styles.modalOptionText,
                { color: theme.colors.text },
                favoriteRegion === region.id && { color: theme.colors.primary },
              ]}>
                {region.name}
              </ThemedText>
              {favoriteRegion === region.id && (
                <IconSymbol
                  name="checkmark"
                  size={20}
                  color={theme.colors.primary}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader/>
      <ScrollView style={styles.content}>
        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('settings.appearance')}</ThemedText>
        
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextContainer}>
              <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('settings.dark_theme.title')}</ThemedText>
              <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
                {t('settings.dark_theme.description')}
              </ThemedText>
            </View>
            <Switch
              value={theme.dark}
              onValueChange={(value) => theme.setTheme(value ? 'dark' : 'light')}
            />
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('settings.language.title')}</ThemedText>
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('settings.language.description')}
            </ThemedText>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: theme.colors.surfaceVariant }]}
              onPress={() => setShowLanguageModal(true)}
            >
              <ThemedText style={{ color: theme.colors.text }}>{LANGUAGES.find(l => l.id === language)?.name || 'Français (fr)'}</ThemedText>
              <IconSymbol name="chevron.down" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('settings.behavior')}</ThemedText>
        
        {favoriteRestaurants.length === 0 ? (
          <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
            <View style={[styles.alert, { backgroundColor: theme.colors.error + '10' }]}>
              <IconSymbol name="exclamationmark.triangle" size={20} color={theme.colors.error} />
              <ThemedText style={[styles.alertText, { color: theme.colors.error }]}>
                {t('settings.favorites.empty.title')}
              </ThemedText>
            </View>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('settings.favorites.empty.description')}
              <Link href="/restaurants" style={[styles.link, { color: theme.colors.link }]}>
                {t('settings.favorites.empty.link')}
              </Link>
            </ThemedText>
          </View>
        ) : null}

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('settings.favorites.title')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('settings.favorites.description')}
            </ThemedText>
            {favoriteRestaurants.length > 0 && (
              <View style={styles.favoritesList}>
                {favoriteRestaurants.map((restaurant) => (
                  <View key={restaurant.id} style={[styles.favoriteItem, { backgroundColor: theme.colors.surfaceVariant }]}>
                    <View>
                      <ThemedText style={[styles.restaurantName, { color: theme.colors.text }]}>{restaurant.name}</ThemedText>
                      <ThemedText style={[styles.restaurantCity, { color: theme.colors.text }]}>{restaurant.city}</ThemedText>
                    </View>
                    <TouchableOpacity
                      onPress={() => removeFavoriteRestaurant(restaurant.id)}
                      style={styles.removeButton}
                    >
                      <IconSymbol name="xmark" size={16} color={theme.colors.error} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('settings.region.title')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('settings.region.description')}
            </ThemedText>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: theme.colors.surfaceVariant }]}
              onPress={() => setShowRegionModal(true)}
            >
              <ThemedText style={{ color: theme.colors.text }}>
                {REGIONS.find(r => r.id === favoriteRegion)?.name || t('settings.region.all')}
              </ThemedText>
              <IconSymbol name="chevron.down" size={20} color={theme.colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        <ThemedText style={[styles.sectionHeader, { color: theme.colors.text }]}>{t('settings.personal_info')}</ThemedText>
        
        <View style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <View>
            <ThemedText style={[styles.settingTitle, { color: theme.colors.text }]}>{t('settings.delete_data.title')}</ThemedText>
            <ThemedText style={[styles.settingDescription, { color: theme.colors.text }]}>
              {t('settings.delete_data.description')}
            </ThemedText>
            <TouchableOpacity
              style={[styles.deleteButton, { backgroundColor: theme.colors.error }]}
              onPress={handleDeleteData}
            >
              <ThemedText style={[styles.deleteButtonText, { color: theme.colors.surface }]}>
                {t('settings.delete_data.button')}
              </ThemedText>
            </TouchableOpacity>
          </View>
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
    padding: 16,
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
});
