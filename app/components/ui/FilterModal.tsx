import React from 'react';
import { Modal, StyleSheet, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { BlurView } from 'expo-blur';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from './ThemedText';
import { ThemedView } from './ThemedView';
import { Check, X } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';

type FilterOption = {
  key: string;
  value: boolean;
  onToggle: () => void;
};

type FilterModalProps = {
  visible: boolean;
  onClose: () => void;
  filters: {
    alphabeticalOrder: FilterOption;
    reverseAlphabeticalOrder: FilterOption;
    cityAlphabeticalOrder: FilterOption;
    cityReverseAlphabeticalOrder: FilterOption;
    cardPayment: FilterOption;
    izlyPayment: FilterOption;
    openNow: FilterOption;
    accessible: FilterOption;
  };
};

export default function FilterModal({ visible, onClose, filters }: FilterModalProps) {
  const { t } = useLanguage();
  const colorScheme = useColorScheme();
  const theme = useTheme();

  const FilterSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <View style={styles.section}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </View>
  );

  const FilterCheckbox = ({ label, checked, onToggle }: { label: string; checked: boolean; onToggle: () => void }) => (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
      <Pressable
        style={[styles.checkbox, checked && { backgroundColor: theme.colors.primary }]}
      >
        {checked && <Check size={16} color="#fff" />}
      </Pressable>
      <ThemedText style={styles.checkboxLabel}>{label}</ThemedText>
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <BlurView intensity={10} style={styles.overlay}>
        <ThemedView style={styles.modalContent}>
          <View style={styles.header}>
            <ThemedText style={styles.title}>{t('restaurants.filters')}</ThemedText>
            <Pressable style={styles.closeButton} onPress={onClose}>
              <X size={24} color={Colors[colorScheme ?? 'light'].text} />
            </Pressable>
          </View>

          <ScrollView style={styles.content}>
            <FilterSection title={t('restaurants.filters.restaurant_name')}>
              <FilterCheckbox
                label={t('restaurants.filters.alphabetical_order')}
                checked={filters.alphabeticalOrder.value}
                onToggle={filters.alphabeticalOrder.onToggle}
              />
              <FilterCheckbox
                label={t('restaurants.filters.reverse_alphabetical')}
                checked={filters.reverseAlphabeticalOrder.value}
                onToggle={filters.reverseAlphabeticalOrder.onToggle}
              />
            </FilterSection>

            <FilterSection title={t('restaurants.filters.city')}>
              <FilterCheckbox
                label={t('restaurants.filters.city_alphabetical_order')}
                checked={filters.cityAlphabeticalOrder.value}
                onToggle={filters.cityAlphabeticalOrder.onToggle}
              />
              <FilterCheckbox
                label={t('restaurants.filters.city_reverse_alphabetical')}
                checked={filters.cityReverseAlphabeticalOrder.value}
                onToggle={filters.cityReverseAlphabeticalOrder.onToggle}
              />
            </FilterSection>

            <FilterSection title={t('restaurants.filters.payment')}>
              <FilterCheckbox
                label={t('restaurants.filters.card_payment')}
                checked={filters.cardPayment.value}
                onToggle={filters.cardPayment.onToggle}
              />
              <FilterCheckbox
                label={t('restaurants.filters.izly_payment')}
                checked={filters.izlyPayment.value}
                onToggle={filters.izlyPayment.onToggle}
              />
            </FilterSection>

            <FilterSection title={t('restaurants.filters.additional')}>
              <FilterCheckbox
                label={t('restaurants.filters.open_now')}
                checked={filters.openNow.value}
                onToggle={filters.openNow.onToggle}
              />
              <FilterCheckbox
                label={t('restaurants.filters.accessible')}
                checked={filters.accessible.value}
                onToggle={filters.accessible.onToggle}
              />
            </FilterSection>
          </ScrollView>

          <TouchableOpacity style={styles.closeModalButton} onPress={onClose}>
            <ThemedText style={styles.closeModalText}>{t('restaurants.filters.close')}</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </BlurView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ccc',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: Colors.light.tint,
    borderColor: Colors.light.tint,
  },
  checkboxLabel: {
    fontSize: 16,
  },
  closeModalButton: {
    backgroundColor: Colors.light.tint,
    padding: 16,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  closeModalText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 