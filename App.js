import { Button, FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React , {useState} from 'react'

const App = () => {
  const [data, setData] = useState([]);
  const [isShowButtonAdd, setIsShowButtonAdd] = useState(false);
  const [dataName, setDataName] = useState("");

  const handleButtonAdd = () => {
    if(dataName.length<=0){
      setIsShowButtonAdd(!isShowButtonAdd);
      return;
    }
    const n = {name:dataName,complete:false};
    const newData = [...data,n];
    setData(newData);
    setDataName("");
    setIsShowButtonAdd(!isShowButtonAdd);
  }

  const renderItem = ({item}) => {
    return(
      <TouchableOpacity>
        <Text>{item.name}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ghi Chú</Text>
      <View style={styles.bottomLine}></View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item,index)=>index.toString()}
      />
      <TouchableOpacity style={styles.buttonAddContainer} onPress={()=>setIsShowButtonAdd(!isShowButtonAdd)}>
        <Text style={styles.buttonAddContent}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={isShowButtonAdd}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.title,{color: "#343640",fontSize: 40}]}>Thêm Ghi Chú</Text>
            <View style={[styles.bottomLine,{borderColor: "#343640"}]}></View>
            <TextInput value={dataName} placeholder='Vui lòng nhập ghi chú.....' style={styles.write} onChangeText={text=>setDataName(text)}/>
            <Button title='Thêm' onPress={()=>handleButtonAdd()}/>
          </View>
        </View>
      </Modal>
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
    fontWeight: "bold",
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
  modalContainer:{
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent:{
    borderRadius: 20,
    padding: 16,
    width: 300,
    backgroundColor: "#ffffff",
    position: 'absolute',
  },
  write:{
    marginBottom: 8,
    borderRadius: 10,
    borderColor: "#343640",
    paddingHorizontal: 10,
    borderWidth: 2,
    color: "#343640",
  }
})