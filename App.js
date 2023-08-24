import { Button, FlatList, Keyboard, Modal, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React , {useState, useEffect} from 'react'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Swipeable } from 'react-native-gesture-handler';

const App = () => {
  const [data, setData] = useState([]);
  const [isShowButtonAdd, setIsShowButtonAdd] = useState(false);
  const [dataName, setDataName] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const savedData = await AsyncStorage.getItem("data");
      try {
        if(savedData!=null){
          setData(JSON.parse(savedData));
        }
      } catch (error) {
        setData([]);
        console.log("error is: ",error);
      }
    }
    loadData();
  }, []);
  
  useEffect(()=>{
    const saveData = () =>{
      try {
        AsyncStorage.setItem("data",JSON.stringify(data));
      } catch (error) {
        console.log("error is: ",error);
      }
    }
    saveData();
  }, [data]);

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
    Keyboard.dismiss();
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Thêm ghi chú thành công😁',
      visibilityTime: 3000,
    });
  }

  const renderItem = ({item,index}) => {
    const handleCompelete = () => {
      const update = [...data];
      update[index] = {name:item.name,complete:!item.complete};
      setData(update);
    }
    const handleDelete = () => {
      const update = [...data];
      update.splice(index,1);
      setData(update);
      Toast.show({
        type: 'success',
        text1: 'Thành công',
        text2: 'Xóa ghi chú thành công😁',
        visibilityTime: 3000,
      });
    }
    const renderRightActions = () => {
      return (
        <TouchableOpacity style={styles.deleteButton} onPress={()=>handleDelete()}>
          <Text style={styles.deleteButtonName}>Xóa</Text>
        </TouchableOpacity>
      );
    };
    return(
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableOpacity style={styles.itemBody} onPress={()=>handleCompelete()}>
          <Text style={item.complete ? styles.itemNameComplete : styles.itemNameNormal}>{item.name}</Text>
        </TouchableOpacity>
      </Swipeable>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ghi Chú</Text>
      <View style={styles.bottomLine}></View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index)=>index.toString()}
      />
      <TouchableOpacity style={styles.buttonAddContainer} onPress={()=>setIsShowButtonAdd(!isShowButtonAdd)}>
        <Text style={styles.buttonAddContent}>+</Text>
      </TouchableOpacity>
      <Modal
        visible={isShowButtonAdd}
        transparent={true}
      >
        {isShowButtonAdd && (
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={[styles.title,{color: "#343640",fontSize: 40}]}>Thêm Ghi Chú</Text>
              <View style={[styles.bottomLine,{borderColor: "#343640"}]}></View>
              <TextInput value={dataName} placeholder='Vui lòng nhập ghi chú.....' style={styles.write} onChangeText={text=>setDataName(text)}/>
              <Button title='Thêm' onPress={()=>handleButtonAdd()}/>
            </View>
          </View>
        )}
      </Modal>
      <Toast />
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
  },
  itemBody:{
    backgroundColor: "#444654",
    padding: 8,
    flexDirection: "row",
    maxHeight: 70,
    minHeight: 70,
    marginBottom: 8,
  },
  itemNameNormal:{
    width: "80%",
    marginRight: 20,
    textAlignVertical: "center",
    fontSize: 25,
    color: "#ffffff",
    textDecorationLine: "none",
  },
  itemNameComplete:{
    width: "80%",
    marginRight: 20,
    textAlignVertical: "center",
    fontSize: 25,
    color: "#ffffff",
    textDecorationLine: "line-through",
  },
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 70,
  },
  deleteButtonName:{
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "bold",
  }, 
})