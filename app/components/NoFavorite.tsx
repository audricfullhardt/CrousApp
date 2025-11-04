import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemedText } from './ui/ThemedText';
import { useLanguage } from '@/contexts/LanguageContext';

const NoFavorite = () => {
    const { t } = useLanguage();
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <ThemedText style={styles.message}>
                    {t("SettingsPage.favourites.nofavouritesTitle")}
                </ThemedText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    message: {
        fontSize: 20,
        textAlign: 'center',
    },
});

export default NoFavorite;