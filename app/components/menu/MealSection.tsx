import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { ChevronDown, ChevronUp, Coffee, Utensils, Clock, Star } from 'lucide-react-native';
import { ThemedText } from '@/app/components/ui/ThemedText';
import { useTheme } from '@/contexts/ThemeContext';
import { MEAL_TYPE_LABELS, PLAT_ICON_KEYWORDS } from '@/utils/constants';

interface Plat {
  code: number;
  libelle: string;
  ordre: number;
}

interface Categorie {
  code: number;
  libelle: string;
  ordre: number;
  plats: Plat[];
}

interface Repas {
  code: number;
  type: string;
  categories: Categorie[];
}

interface MealSectionProps {
  repas: Repas;
  isCollapsed: boolean;
  isCafeteria: boolean;
  onToggleCollapse: (code: number) => void;
}

function getRepasIcon(type: string, color: string) {
  const iconMap: Record<string, React.ReactNode> = {
    matin: <Coffee size={20} color={color} />,
    midi: <Utensils size={20} color={color} />,
    soir: <Clock size={20} color={color} />,
  };
  return iconMap[type] || <Utensils size={20} color={color} />;
}

function getPlatIcon(libelle: string, isCafeteria: boolean, color: string) {
  const lower = libelle.toLowerCase();

  if (isCafeteria) {
    if (PLAT_ICON_KEYWORDS.COFFEE.some((kw) => lower.includes(kw))) {
      return <Coffee size={16} color={color} />;
    }
    if (PLAT_ICON_KEYWORDS.BAKERY.some((kw) => lower.includes(kw))) {
      return <Star size={16} color={color} />;
    }
  }

  return <Utensils size={16} color={color} />;
}

export default function MealSection({
  repas,
  isCollapsed,
  isCafeteria,
  onToggleCollapse,
}: MealSectionProps) {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => onToggleCollapse(repas.code)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          {getRepasIcon(repas.type, theme.colors.primary)}
          <ThemedText
            style={[styles.title, { color: theme.colors.text, borderBottomColor: theme.colors.primary }]}
          >
            {MEAL_TYPE_LABELS[repas.type as keyof typeof MEAL_TYPE_LABELS] || repas.type}
          </ThemedText>
        </View>
        <TouchableOpacity
          style={[styles.collapseButton, { backgroundColor: theme.colors.surfaceVariant }]}
          onPress={() => onToggleCollapse(repas.code)}
        >
          {isCollapsed ? (
            <ChevronDown size={20} color={theme.colors.text} />
          ) : (
            <ChevronUp size={20} color={theme.colors.text} />
          )}
        </TouchableOpacity>
      </TouchableOpacity>

      {!isCollapsed && (
        <>
          {repas.categories.map((categorie) => (
            <View key={categorie.code} style={styles.categorieContainer}>
              <ThemedText
                style={[
                  styles.categorieTitle,
                  { color: theme.colors.text, borderLeftColor: theme.colors.primary },
                ]}
              >
                {categorie.libelle}
              </ThemedText>
              {categorie.plats.map((plat) => (
                <View key={plat.code} style={styles.platContainer}>
                  {isCafeteria ? (
                    plat.libelle.split(',').map((item, index) => (
                      <View key={`${plat.code}-${index}`} style={styles.platItem}>
                        {getPlatIcon(item.trim(), isCafeteria, theme.colors.primary)}
                        <ThemedText style={[styles.platText, { color: theme.colors.text }]}>
                          {item.trim()}
                        </ThemedText>
                      </View>
                    ))
                  ) : (
                    <View style={styles.platItem}>
                      {getPlatIcon(plat.libelle, isCafeteria, theme.colors.primary)}
                      <ThemedText style={[styles.platText, { color: theme.colors.text }]}>
                        {plat.libelle}
                      </ThemedText>
                    </View>
                  )}
                </View>
              ))}
            </View>
          ))}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    paddingTop: 12,
    paddingLeft: 8,
    borderBottomWidth: 2,
  },
  collapseButton: {
    padding: 8,
    borderRadius: 8,
  },
  categorieContainer: {
    marginBottom: 16,
  },
  categorieTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    paddingLeft: 8,
    borderLeftWidth: 4,
  },
  platContainer: {
    marginBottom: 8,
    paddingLeft: 8,
  },
  platItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  platText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 4,
    paddingLeft: 4,
  },
});
