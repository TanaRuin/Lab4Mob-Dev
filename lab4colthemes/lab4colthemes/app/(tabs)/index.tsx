import { Text, View, StyleSheet, useColorScheme } from 'react-native';

export default function App() {

  const theme = useColorScheme();

  const isDark = theme === "dark";

  return (
    <View style={[styles.container, isDark ? styles.dark : styles.light]}>
      <Text style={isDark ? styles.darkText : styles.lightText}>
        Current Theme: {theme}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center"
  },

  light:{
    backgroundColor:"#ffffff"
  },

  dark:{
    backgroundColor:"#222222"
  },

  lightText:{
    color:"#000"
  },

  darkText:{
    color:"#fff"
  }
});