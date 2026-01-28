import axios from "axios";
import { Dimensions, Platform } from "react-native";
import Constants from "expo-constants";

const UMAMI_URL = process.env.EXPO_PUBLIC_UMAMI_URL;
const WEBSITE_ID = process.env.EXPO_PUBLIC_WEBSITE_ID;
const HOSTNAME = process.env.EXPO_PUBLIC_HOSTNAME;

// Génère un User-Agent pour React Native
function getUserAgent() {
  const appVersion = Constants.expoConfig?.version || "1.0.0";
  const appName = Constants.expoConfig?.name || "CrousApp";
  return `${appName}/${appVersion} (${Platform.OS} ${Platform.Version})`;
}

function buildPayload(eventName, url, isPageView = false, extra = {}) {
  const { width, height } = Dimensions.get("window");
  const payload = {
    website: WEBSITE_ID,
    hostname: HOSTNAME,
    language: "fr-FR",
    screen: `${Math.round(width)}x${Math.round(height)}`,
    url: url.startsWith('http') ? url : `https://${HOSTNAME}${url}`,
    name: eventName, // Umami v2+ utilise toujours 'name' pour les events et pageviews
  };

  // Ajouter referrer seulement si présent
  if (extra.referrer) {
    payload.referrer = extra.referrer;
  }

  // Pour les events custom, on peut ajouter des données supplémentaires
  if (!isPageView && extra.data) {
    payload.data = extra.data;
  }

  return {
    type: "event", // Umami v2+ utilise uniquement "event"
    payload,
  };
}

export async function trackEvent(eventName, url = "/", extra = {}) {
  try {
    const payload = buildPayload(eventName, url, false, extra);
    console.log("Umami sending event:", payload);
    await axios.post(UMAMI_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": getUserAgent(), // OBLIGATOIRE pour Umami
      },
    });
  } catch (err) {
    console.log("Umami event error:", err.message);
  }
}

export async function trackPageView(pageName, path = "/") {
  try {
    const payload = buildPayload(pageName, path, true);
    console.log("Umami sending pageview:", payload);
    await axios.post(UMAMI_URL, payload, {
      headers: {
        "Content-Type": "application/json",
        "User-Agent": getUserAgent(), // OBLIGATOIRE pour Umami
      },
    });
  } catch (err) {
    console.log("Umami pageview error:", err.message);
  }
}
