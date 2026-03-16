import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function HomeScreen() {
  type Dispositivo = {
    id: number;
    nombre: string;
    tipo: string;
  };
  const text ="No hay dispositivos Registrados"
  const [mensaje, setMensaje] = useState(text);
  const [dispositivo, setDispositivo] = useState("");
  const [tipoDis, setTipoDis] = useState("");
  const [lista, setLista] = useState<Dispositivo[]>([]);
  const [contador,setContador] = useState(1)

  const registrar = () => {
    if (dispositivo === "" && tipoDis === "") {
      alert("Complete todos los campos");
    } else {
      const n = lista.length + 1
      const newDisp = {
        id: contador,
        nombre: dispositivo,
        tipo: tipoDis,
      };
      setLista([...lista, newDisp]);
      
      setMensaje("Hay " + n + " dispositivos registrados");
    }
    setDispositivo("");
    setTipoDis("");
    setContador(contador + 1)
  };

  const eliminar = (id: number) => {
    const nuevaLista = lista.filter((item) => item.id !== id);
    if(nuevaLista.length !== 0){
      setMensaje("Hay " + (nuevaLista.length) + " dispositivos registrados");
    }else{
      setMensaje(text)
    }
    setLista(nuevaLista);
  };

  return (
    <View style={styles.body}>
      <Image
        source={require("../../assets/images/cecar.png")}
        style={styles.imagen}
      />
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Registro de dispositivos</Text>
        <View style={styles.contRegistro}>
          <TextInput
            placeholder="Nombre Dispositivo"
            value={dispositivo}
            onChangeText={setDispositivo}
            style={styles.input}
          />
          <Picker
            selectedValue={tipoDis}
            onValueChange={(itemValue) => setTipoDis(itemValue)}
            
          >
            <Picker.Item label="Seleccione tipo de dispositivo" value="" />
            <Picker.Item label="Portatil" value="Portatil" />
            <Picker.Item label="Celular" value="Celular" />
            <Picker.Item label="Tablet" value="Tablet" />
          </Picker>
        </View>
        <TouchableOpacity onPress={registrar}>
          <Text>Registrar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.mensaje}>{mensaje}</Text>
      <View style={styles.tabla}>
        <Text style={[styles.titulo,{margin:10}]}>Registro</Text>
        <View style={styles.fila}>
          <Text style={styles.encabezado}>Id</Text>
          <Text style={styles.encabezado}>Nombre</Text>
          <Text style={styles.encabezado}>Tipo</Text>
          <Text style={styles.encabezado}>Eliminar</Text>
        </View>
        <FlatList
          data={lista}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.fila}>
              <Text style={styles.columna}>{item.id}</Text>
              <Text style={styles.columna}>{item.nombre}</Text>
              <Text style={styles.columna}>{item.tipo}</Text>
              <TouchableOpacity
                style={{ flex: 1, alignItems: "center" }}
                onPress={() => {
                  eliminar(item.id);
                }}
              >
                <Text style={styles.eliminar}>{"\u{1F5D1}"}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    backgroundColor: "#000",
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    padding: 20,
  },
  imagen: {
    width: 400,
    height: 90,
    resizeMode: "contain",
  },
  contenedor: {
    backgroundColor: "#164f1e",
    width: 300,
    alignItems: "center",
    marginTop: 40,
    gap: 10,
    padding: 17,
    borderRadius:30
  },
  titulo: {
    color: "#f1f2d2",
    fontSize: 23,
    fontStyle: "italic",
    fontWeight: "bold",
  },
  contRegistro: {
    gap: 7,
    width:'80%'
  },
  input: {
    backgroundColor: "#daecbb",
    color: "#000",
    padding: 3,
    
  },
  picker:{
    backgroundColor: "#daecbb",
    height:40,
    padding:0
  },
  mensaje: {
    color: "#fff",
  },
  tabla: {
    backgroundColor: "#497f23",
    padding: 5,
    width: 300,
    alignItems: "center",
    paddingBottom:20,
    borderRadius:30
  },
  fila: {
    flexDirection: "row",
    margin: 0,
    alignItems: "center",
    width: 250,
    borderWidth: 1,
  },
  encabezado: {
    width: "25%",
    fontWeight: "bold",
    color: "#f1f2d2",
    textAlign: "center",

    paddingVertical: 8,
  },
  columna: {
    width: "25%",
    textAlign: "center",
    paddingVertical: 8,
  },
  eliminar: {
    fontSize: 28,
    color: "#ff0000",
  },
});
