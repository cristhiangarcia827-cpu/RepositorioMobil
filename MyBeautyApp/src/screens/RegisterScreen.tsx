import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomButton from "../components/CustomButton";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomInput from "../components/Customlnput";

export default function RegisterScreen({ navigation }: any) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleRegister = () => {
    if (!fullName || !email || !password || !confirmPassword || !phone) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden");
      return;
    }

    navigation.navigate("Tabs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Registro</Text>

        <CustomInput
          value={fullName}
          placeholder="Nombre completo"
          onChange={setFullName}
        />

        <CustomInput
          value={email}
          type="email"
          placeholder="Correo electrónico"
          onChange={setEmail}
        />

        <CustomInput
          value={password}
          type="password"
          placeholder="Contraseña"
          onChange={setPassword}
        />

        <CustomInput
          value={confirmPassword}
          type="password"
          placeholder="Confirmar contraseña"
          onChange={setConfirmPassword}
        />

        <CustomInput
          value={phone}
          type="phone"
          placeholder="Teléfono"
          onChange={setPhone}
        />

        <CustomButton
          title={`Fecha de nacimiento: ${birthDate.toLocaleDateString()}`}
          variant="secondary"
          onPress={() => setShowDatePicker(true)}
        />

        {showDatePicker && (
          <DateTimePicker
            value={birthDate}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) setBirthDate(selectedDate);
            }}
          />
        )}

        <CustomButton title="Registrarme" onPress={handleRegister} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 25,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});