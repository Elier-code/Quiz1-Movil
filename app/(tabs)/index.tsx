import {
  StyleSheet,
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function HomeScreen() {
  type Dispositivo = {
    id: number;
    nombre: string;
    tipo: string;
  };

  const text = "No hay dispositivos Registrados";

  const [mensaje, setMensaje] = useState(text);
  const [dispositivo, setDispositivo] = useState("");
  const [tipoDis, setTipoDis] = useState("");
  const [lista, setLista] = useState<Dispositivo[]>([]);
  const [contador, setContador] = useState(1);
  const [loading, setLoading] = useState(false);
  const [mostrar, setMostrar] = useState(false);
  const [texto, setTexto] = useState("Ver Tabla");

  const registrar = () => {
    if (dispositivo === "" || tipoDis === "") {
      alert("Complete todos los campos");
    } else {
      const n = lista.length + 1;
      iniciarProceso();

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
    setContador(contador + 1);
  };

  const eliminar = (id: number) => {
    const nuevaLista = lista.filter((item: Dispositivo) => item.id !== id);

    if (nuevaLista.length !== 0) {
      setMensaje("Hay " + nuevaLista.length + " dispositivos registrados");
    } else {
      setMensaje(text);
    }

    setLista(nuevaLista);
  };

  const iniciarProceso = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      alert("Fue guardado correctamente");
    }, 2000);
  };

  return (
    <View style={styles.body}>
      <ScrollView
        style={{ width: "100%", height: "100%" }}
        contentContainerStyle={{
          alignItems: "center",
          gap: 16,
          paddingHorizontal: 16,
          paddingBottom: 24,
          flexDirection: "column",
          width: "100%",
        }}
      >
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
              onValueChange={(itemValue: string) => setTipoDis(itemValue)}
            >
              <Picker.Item label="Seleccione tipo de dispositivo" value="" />
              <Picker.Item label="Portatil" value="Portatil" />
              <Picker.Item label="Celular" value="Celular" />
              <Picker.Item label="Tablet" value="Tablet" />
            </Picker>
          </View>

          <TouchableOpacity onPress={registrar} style={styles.button}>
            <Text>Registrar</Text>
          </TouchableOpacity>
          {loading && (
            <ActivityIndicator
              size="large"
              color="#6200EE"
              style={{ marginTop: 20 }}
            />
          )}
        </View>

        <Text style={styles.mensaje}>{mensaje}</Text>
        <TouchableOpacity
          onPress={() => {
            if (lista.length === 0 && mostrar === false) {
              alert("No hay datos que mostrar");
              setTexto("Ver Tabla");
            } else {
              const nuevoEstado = !mostrar;
              setMostrar(!mostrar);
              setTexto(nuevoEstado ? "Ocultar Tabla" : "Ver Tabla");
            }
          }}
          style={styles.button}
        >
          <Text>{texto}</Text>
        </TouchableOpacity>

        <View style={[styles.tabla, { display: mostrar ? "flex" : "none" }]}>
          <Text style={[styles.titulo, { margin: 10 }]}>Registro</Text>

          <View style={styles.fila}>
            <Text style={styles.encabezado}>Id</Text>
            <Text style={styles.encabezado}>Nombre</Text>
            <Text style={styles.encabezado}>Tipo</Text>
            <Text style={styles.encabezado}>Eliminar</Text>
          </View>

          <FlatList<Dispositivo>
            data={lista}
            keyExtractor={(item: Dispositivo) => item.id.toString()}
            renderItem={({ item }: { item: Dispositivo }) => (
              <View style={styles.fila}>
                <Text style={styles.columna}>{item.id}</Text>
                <Text style={styles.columna}>{item.nombre}</Text>
                <Text style={styles.columna}>{item.tipo}</Text>

                <TouchableOpacity
                  style={{ flex: 1, alignItems: "center" }}
                  onPress={() => eliminar(item.id)}
                >
                  <Text style={styles.eliminar}>{"\u{1F5D1}"}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#0b1f12",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingHorizontal: 16,
    paddingTop: 32,
    gap: 16,
  },

  button: {
    backgroundColor: "#fef9c3",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
  },

  imagen: {
    width: 260,
    height: 70,
    resizeMode: "contain",
    marginBottom: 8,
  },

  contenedor: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "#14532d",
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 6,
  },

  titulo: {
    color: "#fef9c3",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },

  contRegistro: {
    width: "100%",
    gap: 10,
  },

  input: {
    backgroundColor: "#e5f4df",
    color: "#052e16",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    fontSize: 14,
  },

  picker: {
    backgroundColor: "#e5f4df",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#bbf7d0",
    height: 44,
  },

  mensaje: {
    marginTop: 8,
    color: "#e5f4df",
    fontSize: 14,
  },

  tabla: {
    width: "95%",
    maxWidth: 420,
    backgroundColor: "#14532d",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 18,
    elevation: 5,
  },

  fila: {
    flexDirection: "row",
    alignItems: "center",
    width: 250,
    borderBottomWidth: 1,
    borderColor: "rgba(229, 244, 223, 0.25)",
    justifyContent: "space-between",
  },

  encabezado: {
    flex: 1,
    fontWeight: "bold",
    color: "#fef9c3",
    textAlign: "center",
    paddingVertical: 10,
    fontSize: 13,
  },

  columna: {
    flex: 1,
    textAlign: "center",
    paddingVertical: 8,
    fontSize: 12,
    color: "#f9fafb",
  },

  eliminar: {
    fontSize: 26,
    color: "#ef4444",
  },
});
