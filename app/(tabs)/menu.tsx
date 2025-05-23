import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  SafeAreaView,
  Platform,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useLocalSearchParams } from "expo-router";
import { useState, useEffect } from "react";
import AppHeader from "../components/ui/AppHeader";
import { useTheme } from '@/contexts/ThemeContext';
import { MapPin, CreditCard, Heart, Check, X } from 'lucide-react-native';

interface Restaurant {
  nom: string;
  zone: string;
  adresse: string;
  actif: boolean;
  horaires: string[];
  paiement: string[];
  jours_ouvert: {
    jour: string;
    ouverture: {
      matin: boolean;
      midi: boolean;
      soir: boolean;
    };
  }[];
  isOpen: boolean;
}

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

interface MenuResponse {
  data: {
    code: number;
    date: string;
    repas: Repas[];
  };
  success: boolean;
}

export default function MenuScreen() {
  const { restaurantId } = useLocalSearchParams();
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuData, setMenuData] = useState<MenuResponse | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [activeTab, setActiveTab] = useState<"calendrier" | "informations">("calendrier");
  const theme = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: 12,
      padding: 16,
      marginBottom: 20,
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
      marginBottom: 20,
    },
    repasTitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginBottom: 10,
    },
    categorieContainer: {
      marginBottom: 10,
    },
    categorieTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },
    platContainer: {
      marginBottom: 10,
    },
    platText: {
      fontSize: 14,
    },
  });

  const checkIfOpen = (restaurant: Restaurant) => {
    const now = new Date();
    const currentDay = now.getDay();
    const currentHour = now.getHours();
    

    const dayIndex = currentDay === 0 ? 6 : currentDay - 1;
    
    const daySchedule = restaurant.jours_ouvert[dayIndex];
    if (!daySchedule) return false;


    if (currentHour >= 6 && currentHour < 11 && daySchedule.ouverture.matin) {
      return true;
    }
    if (currentHour >= 11 && currentHour < 15 && daySchedule.ouverture.midi) {
      return true;
    }
    if (currentHour >= 18 && currentHour < 22 && daySchedule.ouverture.soir) {
      return true;
    }

    return false;
  };

  const fetchMenuData = async () => {
    try {
      const response = await fetch(
        `https://api.croustillant.menu/v1/restaurants/${restaurantId}/menu`
      );
      
      if (response.ok) {
        const data = await response.json();
        setMenuData(data);
      } else {
        setMenuData(null);
      }
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setMenuData(null);
    }
  };

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await fetch(
          `https://api.croustillant.menu/v1/restaurants/${restaurantId}`
        );
        const data = await response.json();

        if (data.success) {
          setRestaurant(data.data);
          setIsOpen(checkIfOpen(data.data));
          fetchMenuData();
        }
      } catch (error) {
        console.error("Error fetching restaurant:", error);
      }
      setLoading(false);
    };

    fetchRestaurant();
  }, [restaurantId]);

  if (loading || !restaurant) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  const renderOpeningHours = () => {
    const days = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
    return (
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <ThemedText style={styles.tableHeaderCell}>Jour</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Petit-déjeuner</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Déjeuner</ThemedText>
          <ThemedText style={styles.tableHeaderCell}>Dîner</ThemedText>
        </View>
        {days.map((day, index) => (
          <View key={day} style={styles.tableRow}>
            <ThemedText style={styles.tableCell}>{day}</ThemedText>
            <View style={styles.tableCell}>
              {restaurant.jours_ouvert[index]?.ouverture.matin ? <Check size={20} color="#4CAF50" /> : <X size={20} color="#F44336" />}
            </View>
            <View style={styles.tableCell}>
              {restaurant.jours_ouvert[index]?.ouverture.midi ? <Check size={20} color="#4CAF50" /> : <X size={20} color="#F44336" />}
            </View>
            <View style={styles.tableCell}>
              {restaurant.jours_ouvert[index]?.ouverture.soir ? <Check size={20} color="#4CAF50" /> : <X size={20} color="#F44336" />}
            </View>
          </View>
        ))}
      </View>
    );
  };

  const renderMenu = () => {
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

    return (
      <View style={styles.menuContainer}>
        {menuData.data.repas.map((repas) => (
          <View key={repas.code} style={styles.repasContainer}>
            <ThemedText style={styles.repasTitle}>
              {repas.type === 'matin' ? 'Petit-déjeuner' : 
               repas.type === 'midi' ? 'Déjeuner' : 'Dîner'}
            </ThemedText>
            {repas.categories.map((categorie) => (
              <View key={categorie.code} style={styles.categorieContainer}>
                <ThemedText style={styles.categorieTitle}>
                  {categorie.libelle}
                </ThemedText>
                {categorie.plats.map((plat) => (
                  <View key={plat.code} style={styles.platContainer}>
                    <ThemedText style={styles.platText}>
                      {plat.libelle}
                    </ThemedText>
                  </View>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <AppHeader />
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>{restaurant.nom}</ThemedText>
          <TouchableOpacity onPress={toggleFavorite}>
            {isFavorite ? <Heart size={24} color={colors.tint} /> : <Heart size={24} color={colors.text} />}
          </TouchableOpacity>
        </View>

        {renderMenu()}

        <View style={styles.openingHoursContainer}>
          <View style={styles.openingHoursHeader}>
            <ThemedText style={styles.openingHoursTitle}>
              Horaires d'ouverture
            </ThemedText>
            <View style={styles.openStatus}>
              <ThemedText style={styles.openStatusText}>{restaurant.isOpen ? "Ouvert" : "Fermé"}</ThemedText>
            </View>
          </View>
          <ThemedText style={styles.openingHoursSubtitle}>
            Le restaurant est ouvert, du Lundi au Vendredi : de 11h30 à 14h00
          </ThemedText>
          {renderOpeningHours()}
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
