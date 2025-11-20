import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/Customlnput";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState('');

  const {login, isAllowed}= useAuth();
  

  const handleLogin = () => {
    try {
      const allowed = login(email);
      if(allowed){
        console.log(isAllowed);
        console.log("allowed en login if:" + allowed)
        navigation.navigate('Tabs');  
      }
      console.log("allowed en login:" + allowed)
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{i18n.t('signIn')}</Text>
        <CustomInput
          value={email}
          type='email'
          placeholder={'Correo'}
          onChange={setEmail}
        />
        <CustomInput
          value={'123456'}
          type='password'
          placeholder={'Correo'}
          onChange={() => { }}
        />
        <CustomButton title={i18n.t('signIn')}
          onPress={handleLogin}>


        </CustomButton>
        <CustomButton
          title={i18n.t('signUp')}
          variant="secondary"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //habilita uso de flexbox para distribucion de espacio
    flex: 1,
    //distribucion en eje horizontal
    alignItems: 'center',
    //alineacion en eje vertical
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 30,
    width: '85%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    justifyContent: 'space-between'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 20,
    color: '#393434ff',
  }
});