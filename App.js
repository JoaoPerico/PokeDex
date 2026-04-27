import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [busca, setBusca] = useState("");
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");

  async function buscarPokemon() {
    if (!busca.trim()) return;

    setLoading(true);
    setErro("");
    setPokemon(null);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${busca.toLowerCase().trim()}`
      );

      if (!response.ok) {
        setErro("Pokémon não encontrado. Tente outro nome!");
        return;
      }

      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      setErro("Erro ao buscar. Verifique sua conexão.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Pokédex 🔥</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do Pokémon..."
          value={busca}
          onChangeText={setBusca}
          onSubmitEditing={buscarPokemon}
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.botao} onPress={buscarPokemon}>
          <Text style={styles.botaoTexto}>Buscar</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.centro}>
          <ActivityIndicator size="large" color="#E3350D" />
          <Text>Buscando...</Text>
        </View>
      )}

      {erro !== "" && (
        <Text style={styles.erro}>{erro}</Text>
      )}

      {pokemon && (
        <View style={styles.card}>
          <Text style={styles.numero}>#{String(pokemon.id).padStart(3, "0")}</Text>
          <Image
            source={{ uri: pokemon.sprites.front_default }}
            style={styles.img}
          />
          <Text style={styles.nome}>{pokemon.name}</Text>

          <View style={styles.tiposContainer}>
            {pokemon.types.map((t) => (
              <View
                key={t.type.name}
                style={[styles.tipoBadge, { backgroundColor: cores[t.type.name] ?? "#aaa" }]}
              >
                <Text style={styles.tipoTexto}>{t.type.name}</Text>
              </View>
            ))}
          </View>

          <View style={styles.stats}>
            <Text style={styles.statTexto}>⚖️ Peso: {pokemon.weight / 10} kg</Text>
            <Text style={styles.statTexto}>📏 Altura: {pokemon.height / 10} m</Text>
            <Text style={styles.statTexto}>
              ❤️ HP: {pokemon.stats.find((s) => s.stat.name === "hp")?.base_stat}
            </Text>
            <Text style={styles.statTexto}>
              ⚔️ Ataque: {pokemon.stats.find((s) => s.stat.name === "attack")?.base_stat}
            </Text>
            <Text style={styles.statTexto}>
              🛡️ Defesa: {pokemon.stats.find((s) => s.stat.name === "defense")?.base_stat}
            </Text>
          </View>
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const cores = {
  fire: "#F08030",
  water: "#6890F0",
  grass: "#78C850",
  electric: "#F8D030",
  psychic: "#F85888",
  ice: "#98D8D8",
  dragon: "#7038F8",
  dark: "#705848",
  fairy: "#EE99AC",
  normal: "#A8A878",
  fighting: "#C03028",
  flying: "#A890F0",
  poison: "#A040A0",
  ground: "#E0C068",
  rock: "#B8A038",
  bug: "#A8B820",
  ghost: "#705898",
  steel: "#B8B8D0",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    marginBottom: 20,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
  },
  botao: {
    backgroundColor: "#E3350D",
    borderRadius: 10,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  centro: {
    alignItems: "center",
    marginTop: 20,
  },
  erro: {
    color: "#E3350D",
    fontSize: 16,
    marginTop: 10,
  },
  card: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    marginTop: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  numero: {
    fontSize: 14,
    color: "#999",
    marginBottom: 4,
  },
  img: {
    width: 120,
    height: 120,
  },
  nome: {
    fontSize: 26,
    fontWeight: "bold",
    textTransform: "capitalize",
    marginTop: 8,
  },
  tiposContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 10,
  },
  tipoBadge: {
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tipoTexto: {
    color: "#fff",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  stats: {
    marginTop: 16,
    width: "100%",
    gap: 6,
  },
  statTexto: {
    fontSize: 16,
    color: "#333",
  },
});