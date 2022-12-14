import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity, } from 'react-native'
import React, { useState, useEffect } from 'react'
import AddListModal from "../components/addListModal"
import TodoList from "../components/todoList"
import screenNames from '../helpers/screenNames'
import auth from '@react-native-firebase/auth';
import { GetToken } from '../asyncStorage/asyncStorage'
import firestore from '@react-native-firebase/firestore';
import AntDesign from "react-native-vector-icons/AntDesign"

const HomeScreen = ({ navigation }) => {
    const [addTodoVisible, setAddTodoVisible] = useState(false)
    const [lists, setLists] = useState([])
    const [data, setData] = useState()
    const [showData, setShowData] = useState()

    useEffect(() => {
        getData();
        // setLists(tempData)
    }, [])

    function renderList(list) {
        // console.log("LISSSTTTTTT", list)
        return (<TodoList list={list} deleteTodo={deleteTodo} />)
    }
    function addList(list) {
        setLists([...lists, { ...list, id: lists.length + 1, todos: [] }]);
    }

    const getData = async () => {
        await firestore()
            .collection('Todo')
            .onSnapshot(data => {
                // console.log("data.docs", data.docs)
                // setData(data.docs)
                filterData(data.docs)
            })
    };

    const filterData = async (idd) => {
        const userId = await GetToken()
        // console.log("PARTICULAR USER ID", idd.map((x => x._data.Userid)))
        let itemTemp = idd.filter(x => x._data.Userid == userId)
        setData(itemTemp)
        // console.log("itemTemp", itemTemp)
    }

    const deleteTodo = async (id) => {
        await firestore().collection("Todo")
            .doc(id).delete().then(() => {
                alert('Todo Deleted!!!!!')
            })
        deleted(id)
    }

    const deleted = (id) => {
        let itemTemp = data.filter(x => x._data.todoId !== id)
        setData(itemTemp)
    }

    const logOut = async () => {
        await auth()
            .signOut()
            .then(() => {
                console.log('User signed out!')
                navigation.navigate(screenNames.Login)
            }
            ).catch((error) => {
                console.log("ERROR LOGOUT", error)
            })

    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                    style={{
                        backgroundColor: "black", marginTop: -40,
                        marginLeft: 35, marginRight: 35, height: 25,
                        width: 160, borderRadius: 10
                    }}
                    onPress={() => logOut()}>
                    <Text style={{ color: "white", textAlign: 'center', fontSize: 18, fontWeight: "700" }}>Logout</Text>
                </TouchableOpacity>
            </View>
            <Modal animationType="slide" visible={addTodoVisible}
                onRequestClose={() => setAddTodoVisible(false)}
            >
                <View>
                    <AddListModal closeModal={() => setAddTodoVisible(false)} addList={addList} />
                </View>
            </Modal>
            <View style={{ flexDirection: "row" }}>
                <View style={styles.divider} />
                <Text style={styles.title}>
                    Todo<Text style={{ fontWeight: "300", color: "#24A6D9" }}>Lists</Text>
                </Text>
            </View>
            <View style={{ marginVertical: 48 }}>
                <TouchableOpacity style={styles.addList} onPress={() => setAddTodoVisible(true)}>
                    <AntDesign name="plus" size={16} color={"#24A6D9"} />
                </TouchableOpacity>
                <Text style={styles.add}>Add List </Text>
            </View>
            <View style={{ height: 275, paddingLeft: 32 }}>
                <View>
                    <FlatList
                        data={data}
                        // keyExtractor={item => item.name}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                        renderItem={({ item }) => renderList(item._data)}

                    />
                </View>
            </View>
        </View>


    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    },
    divider: {
        backgroundColor: "#A7CBD9",
        height: 1,
        flex: 1,
        alignSelf: "center",
    },
    title: {
        marginRight: 50,
        fontSize: 38,
        fontWeight: "800",
        color: "#2D3436",
        paddingHorizontal: 64
    },
    addList: {
        borderWidth: 2,
        borderColor: "#A7CBD9",
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    add: {
        color: "#24A6D9",
        fontWeight: "600",
        fontSize: 14,
        marginTop: 8,
    }
})