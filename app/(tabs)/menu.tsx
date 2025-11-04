import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MapPin, CreditCard, Heart, Check, X, Utensils, Coffee, Clock, Star, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react-native';

import { ThemedText } from '@/app/components/ui/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useTheme } from '@/contexts/ThemeContext';
import { api, Restaurant, MenuResponse } from '@/constants/api';
import { checkIfRestaurantOpen, formatDateForAPI } from '@/utils/restaurantUtils';
import { MEAL_TYPE_LABELS, WEEK_DAYS, SERVICE_TYPES, PLAT_ICON_KEYWORDS } from '@/utils/constants';
import { trackPageView } from '@/utils/umami';
import { useFavorites } from '@/contexts/FavoritesContext';

export default function MenuScreen() {
  // Hooks d'état
  const { restaurantId } = useLocalSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [collapsedRepas, setCollapsedRepas] = useState<Set<number>>(new Set());
  const [activeTab, setActiveTab] = useState<"calendrier" | "informations">("calendrier");
  const { favoriteRestaurants, addFavoriteRestaurant, removeFavoriteRestaurant, isFavorite } = useFavorites();
  
  // Hooks de contexte
  const colorScheme = useColorScheme();
  const theme = useTheme();
  const colors = Colors[colorScheme ?? "light"];

  // Styles mémorisés
  const styles = useMemo(() => StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    content: {
      flex: 1,
    },
    contentContainer: {
      padding: 16,
      paddingBottom: Platform.OS === 'ios' ? 150 : 100,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    menuImageContainer: {
      width: '100%',
      marginBottom: 20,
      borderRadius: 12,
      overflow: 'hidden',
      backgroundColor: theme.colors.surfaceVariant,
    },
    menuImage: {
      width: '100%',
      height: 400,
    },
    messageContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 24,
      marginBottom: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.error,
    },
    messageTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 8,
      color: theme.colors.text,
    },
    messageText: {
      fontSize: 16,
      marginBottom: 8,
      color: theme.colors.text,
    },
    messageNote: {
      fontSize: 14,
      fontStyle: "italic",
      opacity: 0.7,
      color: theme.colors.text,
    },
    tabContainer: {
      flexDirection: "row",
      marginBottom: 20,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
      padding: 4,
    },
    tab: {
      flex: 1,
      paddingVertical: 8,
      alignItems: "center",
      borderRadius: 6,
    },
    activeTab: {
      backgroundColor: theme.colors.surface,
    },
    openingHoursContainer: {
      marginBottom: 20,
    },
    openingHoursHeader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    openingHoursTitle: {
      fontSize: 18,
      fontWeight: "bold",
      color: theme.colors.text,
    },
    openStatus: {
      backgroundColor: isOpen ? theme.colors.success : theme.colors.error,
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 16,
    },
    openStatusText: {
      color: theme.colors.surface,
      fontSize: 12,
      fontWeight: "bold",
    },
    openingHoursSubtitle: {
      fontSize: 14,
      fontStyle: "italic",
      marginBottom: 16,
      color: theme.colors.text,
    },
    tableContainer: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      overflow: "hidden",
    },
    tableHeader: {
      flexDirection: "row",
      backgroundColor: theme.colors.surfaceVariant,
      padding: 12,
    },
    tableHeaderCell: {
      flex: 1,
      textAlign: "center",
      fontWeight: "bold",
      color: theme.colors.text,
    },
    tableRow: {
      flexDirection: "row",
      borderTopWidth: 1,
      borderColor: theme.colors.border,
      padding: 12,
    },
    tableCell: {
      flex: 1,
      alignItems: "center",
    },
    addressContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
      gap: 8,
    },
    address: {
      fontSize: 16,
      color: theme.colors.text,
    },
    paymentContainer: {
      flexDirection: "row",
      gap: 12,
      marginBottom: 20,
    },
    paymentButton: {
      padding: 8,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 8,
    },
    crousInfo: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    crousLabel: {
      fontSize: 16,
      color: theme.colors.text,
    },
    crousLink: {
      fontSize: 16,
      color: theme.colors.link,
      textDecorationLine: "underline",
    },
    infoContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 20,
    },
    locationContainer: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    location: {
      fontSize: 16,
    },
    payment: {
      fontSize: 16,
    },
    menuContainer: {
      marginBottom: 20,
    },
    repasContainer: {
      marginBottom: 24,
      backgroundColor: theme.colors.surface,
      borderRadius: 16,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
    },
    repasTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 16,
      color: theme.colors.text,
      textAlign: "center",
      paddingTop: 12,
      paddingLeft: 8,
      borderBottomWidth: 2,
      borderBottomColor: theme.colors.primary,
    },
    categorieContainer: {
      marginBottom: 16,
    },
    categorieTitle: {
      fontSize: 18,
      fontWeight: "600",
      marginBottom: 12,
      color: theme.colors.text,
      paddingLeft: 8,
      borderLeftWidth: 4,
      borderLeftColor: theme.colors.primary,
    },
    platContainer: {
      marginBottom: 8,
      paddingLeft: 8,
    },
    platText: {
      fontSize: 15,
      color: theme.colors.text,
      lineHeight: 22,
      marginBottom: 4,
      paddingLeft: 4,
    },
    platItem: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 6,
    },
    platIcon: {
      marginRight: 8,
    },
    repasHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 16,
    },
    repasHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
    },
    collapseButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surfaceVariant,
    },
    backButtonHeader: {
      padding: 12,
      marginRight: 16,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 2,
    },
  }), [theme.colors]);

  // Utilitaire pour vérifier si un restaurant est ouvert (utilise maintenant la fonction importée)
  const checkIfOpen = useCallback((restaurant: Restaurant): boolean => {
    return checkIfRestaurantOpen(restaurant);
  }, []);

  // Fonction optimisée pour récupérer les données du menu
  const fetchMenuData = useCallback(async (formattedDate: string) => {
    try {
      const data = await api.getRestaurantMenu(restaurantId as string, formattedDate);
      setMenuData(data);
    } catch (error) {
      setMenuData(null);
    }
  }, [restaurantId]);

  // Actions optimisées avec useCallback
  const toggleFavorite = useCallback((restaurant: Restaurant) => {
      const restaurantId = restaurant.code.toString();
      if (isFavorite(restaurantId)) {
        removeFavoriteRestaurant(restaurantId);
      } else {
        addFavoriteRestaurant({
          id: restaurantId,
          name: restaurant.nom,
          city: restaurant.zone
        });
      }
    }, [isFavorite, removeFavoriteRestaurant, addFavoriteRestaurant]);

  const toggleRepasCollapse = useCallback((repasCode: number) => {
    setCollapsedRepas(prev => {
      const newCollapsed = new Set(prev);
      if (newCollapsed.has(repasCode)) {
        newCollapsed.delete(repasCode);
      } else {
        newCollapsed.add(repasCode);
      }
      return newCollapsed;
    });
  }, []);

  // Effet principal pour charger les données du restaurant
  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.getRestaurant(restaurantId as string);
        const formattedDate = formatDateForAPI(new Date());
        
        if (response.success) {
          setRestaurant(response.data);
          setIsOpen(checkIfOpen(response.data));
          await fetchMenuData(formattedDate);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId, checkIfOpen, fetchMenuData]);

  useEffect(() => {
      trackPageView('Menus', '/menu');
    }, []);

  // Initialiser tous les repas comme collapsés par défaut
  useEffect(() => {
    if (menuData?.data.repas) {
      const allRepasCodes = new Set(menuData.data.repas.map(repas => repas.code));
      setCollapsedRepas(allRepasCodes);
    }
  }, [menuData]);

  // Fonctions utilitaires mémorisées
  const getPlatIcon = useCallback((platLibelle: string, isCafeteria: boolean) => {
    const libelle = platLibelle.toLowerCase();
    
    if (isCafeteria) {
      if (PLAT_ICON_KEYWORDS.COFFEE.some(keyword => libelle.includes(keyword))) {
        return <Coffee size={16} color={theme.colors.primary} />;
      }
      if (PLAT_ICON_KEYWORDS.BAKERY.some(keyword => libelle.includes(keyword))) {
        return <Star size={16} color={theme.colors.primary} />;
      }
    }
    
    return <Utensils size={16} color={theme.colors.primary} />;
  }, [theme.colors.primary]);

  const getRepasIcon = useCallback((type: string) => {
    const iconMap = {
      matin: <Coffee size={20} color={theme.colors.primary} />,
      midi: <Utensils size={20} color={theme.colors.primary} />,
      soir: <Clock size={20} color={theme.colors.primary} />,
    };
    
    return iconMap[type as keyof typeof iconMap] || <Utensils size={20} color={theme.colors.primary} />;
  }, [theme.colors.primary]);

  // Fonction de rendu des horaires optimisée avec useMemo
  const renderOpeningHours = useMemo(() => {
    
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <ThemedText style={styles.tableHeaderCell}>Jour</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Petit-déjeuner</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Déjeuner</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Dîner</ThemedText>
        </View>
        {WEEK_DAYS.map((day, index) => (
          <View key={day} style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>{day}</ThemedText>
            {SERVICE_TYPES.map((service) => {
              const isOpen = restaurant?.jours_ouvert?.[index]?.ouverture[service];
              return (
                <View key={service} style={styles.tableCell}>
                  {isOpen ? (
                    <Check size={20} color="#4CAF50" />
                  ) : (
                    <X size={20} color="#F44336" />
                  )}
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  }, [restaurant?.jours_ouvert]);

  // Fonction de rendu du menu optimisée avec useMemo
  const renderMenu = useMemo(() => {
    if (!menuData?.data.repas) {
      return (
        <View style={styles.messageContainer}>
          <ThemedText style={styles.messageTitle}>
            Aucun plat disponible pour ce restaurant 😕
          </ThemedText>
          <ThemedText style={styles.messageText}>
            Le restaurant ne propose actuellement aucun plat. Veuillez réessayer
            plus tard.
          </ThemedText>
          <ThemedText style={styles.messageNote}>
            Le menu doit être manuellement mis à jour par le restaurant. Si le
            menu n'est jamais disponible, vous pouvez contacter le restaurant
            pour leur faire part de votre problème.
          </ThemedText>
        </View>
      );
    }

    const isCafeteria = restaurant?.type?.libelle === "Cafeteria";

    return (
      <View style={styles.menuContainer}>
        {menuData.data.repas.map((repas) => {
          const isCollapsed = collapsedRepas.has(repas.code);
          
          return (
            <View key={repas.code} style={styles.repasContainer}>
              <TouchableOpacity 
                style={styles.repasHeader}
                onPress={() => toggleRepasCollapse(repas.code)}
                activeOpacity={0.7}
              >
                <View style={styles.repasHeaderLeft}>
                  {getRepasIcon(repas.type)}
                  <ThemedText style={styles.repasTitle}>
                    {MEAL_TYPE_LABELS[repas.type as keyof typeof MEAL_TYPE_LABELS] || repas.type}
                  </ThemedText>
                </View>
                <TouchableOpacity style={styles.collapseButton} onPress={() => toggleRepasCollapse(repas.code)}>
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
                      <ThemedText style={styles.categorieTitle}>
                        {categorie.libelle}
                      </ThemedText>
                      {categorie.plats.map((plat) => (
                        <View key={plat.code} style={styles.platContainer}>
                          {isCafeteria ? (
                            // Pour les cafétérias, séparer les éléments par virgule
                            plat.libelle.split(',').map((item, index) => (
                              <View key={`${plat.code}-${index}`} style={styles.platItem}>
                                {getPlatIcon(item.trim(), isCafeteria)}
                                <ThemedText style={styles.platText}>
                                  {item.trim()}
                                </ThemedText>
                              </View>
                            ))
                          ) : (
                            // Pour les restaurants, afficher le plat tel quel
                            <View style={styles.platItem}>
                              {getPlatIcon(plat.libelle, isCafeteria)}
                              <ThemedText style={styles.platText}>
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
        })}
      </View>
    );
  }, [menuData, restaurant?.type?.libelle, collapsedRepas, getRepasIcon, getPlatIcon, toggleRepasCollapse, theme.colors.text]);

  if (loading || !restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButtonHeader}
            onPress={() => router.push('/restaurants')}
            activeOpacity={0.7}
          >
            <ArrowLeft size={20} color={theme.colors.text} />
          </TouchableOpacity>
          <View style={{ flex: 1 }}>
            <ThemedText style={styles.title}>{restaurant.nom}</ThemedText>
            {restaurant.type && (
              <ThemedText style={{ 
                fontSize: 14, 
                color: theme.colors.primary, 
                fontWeight: '600',
                marginTop: 4 
              }}>
                {restaurant.type.libelle}
              </ThemedText>
            )}
          </View>
          <TouchableOpacity onPress={()=>toggleFavorite(restaurant)}>
            {isFavorite(restaurant.code.toString()) ? <Heart size={24} color={colors.tint} /> : <Heart size={24} color={theme.colors.text} />}
          </TouchableOpacity>
        </View>

        {renderMenu}

        <View style={styles.openingHoursContainer}>
          <View style={styles.openingHoursHeader}>
            <ThemedText style={styles.openingHoursTitle}>
              Horaires d'ouverture
            </ThemedText>
            <View style={styles.openStatus}>
              <ThemedText style={styles.openStatusText}>{isOpen ? "Ouvert" : "Fermé"}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.openingHoursSubtitle}>
            Le restaurant est ouvert, du Lundi au Vendredi : de 11h30 à 14h00
          </ThemedText>
          {renderOpeningHours}
        </View>

        <View style={styles.addressContainer}>
          <MapPin size={20} color={colors.text} />
          <ThemedText style={styles.address}>{restaurant.adresse}</ThemedText>
        </View>

        <View style={styles.paymentContainer}>
          {restaurant.paiement?.includes("Carte bancaire") && (
            <TouchableOpacity style={styles.paymentButton}>
              <CreditCard size={20} color={colors.text} />
            </TouchableOpacity>
          )}
          {restaurant.paiement?.includes("IZLY") && (
            <TouchableOpacity style={styles.paymentButton}>
              <Image
                source={require("@/assets/images/izly.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.crousInfo}>
          <ThemedText style={styles.crousLabel}>CROUS: </ThemedText>
          <TouchableOpacity>
            <ThemedText style={styles.crousLink}>{restaurant.zone}</ThemedText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
