import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true}/>
      <Text style={styles.title}>Ghi Chú</Text>
      <View style={styles.bottomLine}></View>
      <TouchableOpacity style={styles.buttonAddContainer}>
        <Text style={styles.buttonAddContent}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#343640",
    padding: 8,
  },
  title:{
    color: "#ffffff",
    textAlign: "center",
    fontSize: 50,
    fontStyle: "italic",    
  },
  bottomLine:{
    borderWidth: 1,
    borderColor: "#ffffff",
    marginBottom: 8,

  },
  buttonAddContainer:{
    position: "absolute",
    right: 20,
    bottom: 20,
    width: 70,
    height: 70,
    backgroundColor: "#ffffff",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonAddContent:{
    color: "#343640",
    fontSize: 50,
  },
})