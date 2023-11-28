import { StatusBar } from "expo-status-bar";
import { Box, NativeBaseProvider, TextArea } from "native-base";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const KEY = "AIzaSyDrRLUpJ0XdrKlQh63CdmAGKisF0vbIqKk";
const URL = `https://translation.googleapis.com/language/translate/v2?key=${KEY}`;

export default function App() {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [textTranslated, setTextTranslated] = useState("");

  useEffect(() => {
      makeTranslate();
  }, [textToTranslate]);

  function makeTranslate() {
    axios
      .post(URL, {
        q: textToTranslate,
        source: "en",
        target: "pt-br",
        format: "text",
      })
      .then((response) => setTextTranslated(response.data.data.translations[0].translatedText))
      .catch((err) => setTextTranslated(err));
  }

  function handleChange(value: string) {
    setTextToTranslate(value);

  }

  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <SafeAreaView edges={["top", "bottom"]}>
          <View style={styles.inputContainer}>
            <TextArea
              autoCompleteType={""}
              h={20}
              placeholder="Digite seu texto"
              w="100%"
              value={textToTranslate}
              onChangeText={(value: string) => handleChange(value)}
              style={{ fontSize: 15 }}
            />
          </View>

          <View style={styles.textTranslatedContent}>
            <Text style={{ fontSize: 15 }}>{textTranslated}</Text>
          </View>
        </SafeAreaView>
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#f7f7f8",
  },
  inputContainer: {
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 15,
  },
  textTranslatedContent: {
    display: "flex",
    flexGrow: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
});
