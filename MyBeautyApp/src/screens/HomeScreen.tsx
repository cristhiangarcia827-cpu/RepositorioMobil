// src/screens/HomeScreen.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { i18n } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { getThemeColors } from "../utils/theme";
import CustomButton from "../components/CustomButton";

const HomeScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation<any>();
  const { theme } = useTheme();
  const colors = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Encabezado de bienvenida */}
      <View style={styles.header}>
        <Text style={[styles.greeting, { color: colors.text }]}>
          Agenda de salón
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          {user
            ? `Sesión iniciada como: ${user.email}`
            : "Inicia sesión para gestionar las citas del salón."}
        </Text>
      </View>

      {/* Card principal */}
      <View style={[styles.card, { backgroundColor: colors.card }]}>
        <Text>
        {client.name ? 'Cliente actual:' + client.name: "No hay perfil de cliente cargado"}
        </Text>
        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
          Desde aquí podrá consultar la información del cliente, actualizar
          sus preferencias y acceder a la configuración de la aplicación.
          Más adelante, este panel se integrará con Google Calendar para
          ver y sincronizar las citas del salón.
        </Text>

        <CustomButton
          title="Ver perfil del cliente"
          onPress={() =>
            navigation.navigate("Tabs", { screen: "Profile" })
          }
          variant="primary"
        />

        <CustomButton
          title="Ir a configuración"
          onPress={() =>
            navigation.navigate("Tabs", { screen: "Settings" })
          }
          variant="secondary"
        />

        <Text style={[styles.helperText, { color: colors.textSecondary }]}>
          Implementacion futura: se llamarán servicios serverless para crear, listar o
          cancelar citas en la nube.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  header: {
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 14,
    marginTop: 4,
  },
  card: {
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 18,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    marginBottom: 20,
    lineHeight: 20,
  },
  helperText: {
    marginTop: 16,
    fontSize: 12,
    lineHeight: 18,
  },
});

export default HomeScreen;