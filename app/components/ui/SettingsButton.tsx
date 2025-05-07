import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Modal, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Settings, X } from 'lucide-react-native';

function SettingsButton() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const theme = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    theme.setTheme(newTheme);
  };

  return (
    <>
      <Pressable style={styles.button} onPress={() => setIsModalVisible(true)}>
        <Settings size={24} color={theme.colors.text} />
        <ThemedText style={[styles.text, { color: theme.colors.text }]}>
          {t('settings')}
        </ThemedText>
      </Pressable>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={[styles.modalOverlay, { backgroundColor: 'rgba(0, 0, 0, 0.5)' }]}>
          <View style={[styles.modalContent, { backgroundColor: theme.colors.surface }]}>
            <View style={styles.header}>
              <ThemedText style={[styles.title, { color: theme.colors.text }]}>
                {t('settings.title')}
              </ThemedText>
              <Pressable style={styles.closeButton} onPress={() => setIsModalVisible(false)}>
                <X size={24} color={theme.colors.text} />
              </Pressable>
            </View>

            <View style={styles.section}>
              <ThemedText style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {t('settings.language')}
              </ThemedText>
              <View style={styles.options}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    { backgroundColor: language === 'fr' ? theme.colors.primary : theme.colors.surfaceVariant }
                  ]}
                  onPress={() => setLanguage('fr')}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: language === 'fr' ? theme.colors.surface : theme.colors.text }
                  ]}>
                    Français
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    { backgroundColor: language === 'en' ? theme.colors.primary : theme.colors.surfaceVariant }
                  ]}
                  onPress={() => setLanguage('en')}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: language === 'en' ? theme.colors.surface : theme.colors.text }
                  ]}>
                    English
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.section}>
              <ThemedText style={[styles.sectionTitle, { color: theme.colors.text }]}>
                {t('settings.theme')}
              </ThemedText>
              <View style={styles.options}>
                <TouchableOpacity
                  style={[
                    styles.option,
                    { backgroundColor: theme.currentTheme === 'light' ? theme.colors.primary : theme.colors.surfaceVariant }
                  ]}
                  onPress={() => setTheme('light')}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: theme.currentTheme === 'light' ? theme.colors.surface : theme.colors.text }
                  ]}>
                    {t('settings.light')}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    { backgroundColor: theme.currentTheme === 'dark' ? theme.colors.primary : theme.colors.surfaceVariant }
                  ]}
                  onPress={() => setTheme('dark')}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: theme.currentTheme === 'dark' ? theme.colors.surface : theme.colors.text }
                  ]}>
                    {t('settings.dark')}
                  </ThemedText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.option,
                    { backgroundColor: theme.currentTheme === 'system' ? theme.colors.primary : theme.colors.surfaceVariant }
                  ]}
                  onPress={() => setTheme('system')}
                >
                  <ThemedText style={[
                    styles.optionText,
                    { color: theme.currentTheme === 'system' ? theme.colors.surface : theme.colors.text }
                  ]}>
                    {t('settings.system')}
                  </ThemedText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 8,
    marginLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 12,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  options: {
    flexDirection: 'row',
    gap: 12,
  },
  option: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  text: {
    marginLeft: 8,
  },
});

export default SettingsButton; 