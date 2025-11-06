import { View, Text } from "react-native";
import CustomButton from "../components/CustomButton";
import { navigationRef } from "../navigation/NavigationService";

export default function ProfileScreen({navigation}: any){

const handleLogout = () =>{
    if (navigationRef.isReady()){
        navigationRef.reset({
            //indice del arreglo, que indica la vista actual al momento de reiniciar el stack de navegacion
            index: 0,
            //es un array de objetos, cada uno de estos representa cada ruta que conformara el nuevo stack de navegacion 
            routes: [{name: 'Login'}],
        })
    }
}
    return(
    <View>
        {/* implementacion correcta de redefinicion de navegacion desde un componente externo  */}
        <Text>Pantalla de Perfil</Text>
        <CustomButton title="Cerrar Sesion"
        onPress={handleLogout}/>

        {/* //intento fallido de redefinicion de stack de navegacion  */}
     <CustomButton title="Ir a login"
        onPress={()=>{
            navigation.navigate('Login');
        }}/>

    </View>)
}