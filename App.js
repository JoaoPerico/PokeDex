import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [busca, setBusca] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Pokémon</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={busca}
        onChangeText={setBusca}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
}