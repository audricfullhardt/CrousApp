import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Check, X } from 'lucide-react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { WEEK_DAYS, SERVICE_TYPES, STATUS_COLORS } from '@/utils/constants';
import { Restaurant } from '@/constants/api';

interface OpeningHoursTableProps {
  restaurant: Restaurant;
  isOpen: boolean;
}

export default function OpeningHoursTable({ restaurant, isOpen }: OpeningHoursTableProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <ThemedText style={[styles.headerTitle, { color: theme.colors.text }]}>
          Horaires d'ouverture
        </ThemedText>
        <View style={[styles.statusBadge, { backgroundColor: isOpen ? theme.colors.success : theme.colors.error }]}>
          <ThemedText style={[styles.statusText, { color: theme.colors.surface }]}>
            {isOpen ? "Ouvert" : "Fermé"}
          </ThemedText>
        </View>
      </View>
      <ThemedText style={[styles.subtitle, { color: theme.colors.text }]}>
        Le restaurant est ouvert, du Lundi au Vendredi : de 11h30 à 14h00
      </ThemedText>

      <View style={[styles.table, { borderColor: theme.colors.border }]}>
        <View style={[styles.tableHeader, { backgroundColor: theme.colors.surfaceVariant }]}>
          <ThemedText style={[styles.tableHeaderCell, { color: theme.colors.text }]}>Jour</ThemedText>
          <ThemedText style={[styles.tableHeaderCell, { color: theme.colors.text }]}>Petit-déjeuner</ThemedText>
          <ThemedText style={[styles.tableHeaderCell, { color: theme.colors.text }]}>Déjeuner</ThemedText>
          <ThemedText style={[styles.tableHeaderCell, { color: theme.colors.text }]}>Dîner</ThemedText>
        </View>
        {WEEK_DAYS.map((day, index) => (
          <View key={day} style={[styles.tableRow, { borderColor: theme.colors.border }]}>
            <ThemedText style={[styles.tableCell, { color: theme.colors.text }]}>{day}</ThemedText>
            {SERVICE_TYPES.map((service) => {
              const serviceOpen = restaurant.jours_ouvert?.[index]?.ouverture[service];
              return (
                <View key={service} style={styles.tableCellCenter}>
                  {serviceOpen ? (
                    <Check size={20} color={STATUS_COLORS.OPEN} />
                  ) : (
                    <X size={20} color={STATUS_COLORS.CLOSED} />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    padding: 12,
  },
  tableHeaderCell: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    padding: 12,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
  },
  tableCellCenter: {
    flex: 1,
    alignItems: 'center',
  },
});
