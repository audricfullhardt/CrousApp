import axios from "axios";
import { Dimensions } from "react-native";

const UMAMI_URL = process.env.EXPO_PUBLIC_UMAMI_URL;
const WEBSITE_ID = process.env.EXPO_PUBLIC_WEBSITE_ID;
const HOSTNAME = process.env.EXPO_PUBLIC_HOSTNAME;

function buildPayload(eventName, url, type = "event", extra = {}) {
  const { width, height } = Dimensions.get("window");
  return {
    type,
    payload: {
      website: WEBSITE_ID,
      hostname: HOSTNAME,
      language: "fr-FR",
      screen: `${width}x${height}`,
      title: eventName,
      url: encodeURI(url),
      referrer: extra.referrer ?? "",
    },
  };
}

export async function trackEvent(eventName, url = "/", extra = {}) {
  if(__DEV__) return; // Skip tracking in development mode
  try {
    const payload = buildPayload(eventName, url, "event", extra);
    console.log("Umami sending event:", payload);
    await axios.post(UMAMI_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("Umami event error:", err.message);
  }
}

export async function trackPageView(pageName, path = "/") {
  if(__DEV__) return; // Skip tracking in development mode
  try {
    const payload = buildPayload(pageName, path, "event");
    console.log("Umami sending pageview as event:", payload);
    await axios.post(UMAMI_URL, payload, {
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.log("Umami pageview error:", err.message);
  }
}
