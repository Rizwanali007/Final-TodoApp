import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"

const TodoModal = (props) => {
    // console.log("TODOMODAL PROPS", props)
    // const [name, setName] = useState(props.list.name)
    // const [color, setColor] = useState(props.list.color)
    // const [todos, setTodos] = useState(props.list.todos)
    const [newTodo, setNewTodo] = useState('')
    const [subTaskData, setSubTaskData] = useState()
    const [reload, setReload] = useState(0)
    const [data, setData] = useState()
    const [flagSelectAll, setFlagSelectAll] = useState()

    // console.log("props.todos.title", props.list.todos)

    const list = props.list
    // const taskCount = list.subTodos.length
    // const completedCount = list && list.subTodos ? list.subTodos.filter(todo => todo.completed).length : 0

    // console.log("PROPS.ITEMID", props.itemId);

    const getData = async () => {
        await firestore()
            .collection('Todo')
            .onSnapshot(data => {
                // console.log("data.docs Todo Modal", data.docs)
                // setData(data.docs)
                displayData(data.docs)
            })
    };
    // console.log("DATA TODO MODAL", data)
    const displayData = (item) => {
        const taskId = props.itemId
        // console.log("taskID", taskId)
        let itemTemp = item.filter(x => x._data.todoId == taskId)
        // console.log("itemTemp", itemTemp)
        setFlagSelectAll(itemTemp[0]._data.select_all)
        setSubTaskData(itemTemp)
    }
    // console.log("subTaskData DAATAAAA", subTaskData)

    useEffect(() => {
        getData();
        // selectAll();
        // setTodosTemp([
        //     { completed: false, heading: "L2" },
        //     { completed: false, heading: "L3" },
        //     { completed: false, heading: "L4" }
        // ])
    }, [])

    async function addTodo() {
        if (flagSelectAll == false) {
            const todoRef = await firestore().collection('Todo').doc(props.itemId);
            // console.log("DATA ARHA HY YA NI ", subTaskData[0]._data)
            todoRef.set({
                ...subTaskData[0]._data,
                subTodos: [
                    ...subTaskData[0]._data.subTodos,
                    {
                        heading: newTodo,
                        completed: false,
                    }],
                select_all: flagSelectAll,
            })
        }
        else {
            alert("you cannot add subTodo here because this todo is completed!")
        }

        setNewTodo('')
        Keyboard.dismiss()
    }

    function renderTodo(todo, index) {
        // console.log("todo", todo.subTodos)
        // console.log("TODODODOD", todo.subTodos)
        // const title = todo.subTodos.map(x => x.heading)
        // console.log("TITLE", title)

        return (
            <View style={styles.todoContainer}>
                <FlatList
                    data={todo.subTodos}
                    extraData={todo.subTodos}
                    // keyExtractor={item => item.title}
                    renderItem={({ item, index }) => {
                        // console.log("ITEM", item)
                        return (<View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => TodoCompleted(item, index)}>
                                <Ionicons name={item.completed ? "ios-square" : "ios-square-outline"}
                                    size={24} color="#A4A4A4"
                                    style={{ width: 32 }}
                                />
                            </TouchableOpacity>

                            <Text style={[styles.todo,
                            {
                                textDecorationLine: item.completed ? 'line-through' : "none",
                                color: item.completed ? "#A4A4A4" : "#2D3436"
                            }]}>{item.heading}  </Text>
                            <TouchableOpacity style={{ marginLeft: 70 }} onPress={() => deleteSubTodo(item, index)}>
                                <AntDesign name="delete" size={20} color={"#24A6D9"} />
                            </TouchableOpacity>
                        </View>
                        )
                    }}
                    contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    const deleteSubTodo = async (item, index) => {
        let itemTemp = subTaskData[0]._data.subTodos.filter(x => x.heading !== item.heading)
        console.log("itemTemp", itemTemp)
        // setSubTodoDelete(itemTemp)
        const todoRef = await firestore().collection('Todo').doc(props.itemId);
        todoRef.set({
            ...subTaskData[0]._data,
            subTodos: itemTemp
        })
    }

    async function TodoCompleted(item, index) {
        // let list = props.list
        // console.log("ITEMMMMM COMPETED", item)

        let todosTemp1 = subTaskData[0]._data.subTodos
        todosTemp1[index].completed = !todosTemp1[index].completed

        // console.log("todosTemp1", todosTemp1)
        let tempsFlag = todosTemp1.find(ele => ele.completed == false)

        console.log("TEMPFLAG?>>>>>>>>>>>>   ", tempsFlag)
        if (tempsFlag === undefined) {
            setFlagSelectAll(true)
            // console.log("TEMPFLAG inside if block>>>>>>>>>>>>   ", tempsFlag)
        }
        else {
            setFlagSelectAll(false)
        }
        // setTodosTemp(todosTemp1)
        setReload(reload + 1)
        const todoRef = await firestore().collection('Todo').doc(props.itemId);
        todoRef.update({
            ...subTaskData[0]._data,
            subTodos: todosTemp1
        })

        // list.subTodos[index].completed = !list.subTodos[index].completed
        // props.updateList(list)
    }

    const selectAll = async () => {
        setFlagSelectAll(!flagSelectAll)
        const tempArr = subTaskData[0]._data.subTodos
        tempArr.map(x => {
            // x.completed = !x.completed

            if (flagSelectAll == false) {
                console.log("IF ACCESSIBLE")
                return x.completed = true

                // return x.completed
            }
            else {
                console.log(" ELSE ACCESSIBLE")
                return x.completed = false
                // return x.completed
            }
        })


        console.log("SELECTALL", tempArr)
        const todoRef = await firestore().collection('Todo').doc(props.itemId);
        todoRef.update({
            ...subTaskData[0]._data,
            subTodos: tempArr,
            select_all: !flagSelectAll
        })

    }

    return (

        <View style={{ marginTop: 50, height: "90%" }}>
            {/* <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding"> */}
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    style={{ position: "absolute", top: 5, right: 32, zIndex: 10 }}
                    onPress={() => props.closeModal()}
                >
                    <AntDesign name="close" size={24} color={"#2D3436"} />
                </TouchableOpacity>
                <View style={[styles.section, styles.header, { borderBottomColor: list.color }]}>
                    <View style={{ marginLeft: 60 }}>
                        <TouchableOpacity
                            // style={{ backgroundColor: "yellow", borderRadius: 1, height: 25, marginTop: 40 }}
                            onPress={() => selectAll()}>
                            <Ionicons name={
                                flagSelectAll ? "ios-square"
                                    :
                                    "ios-square-outline"
                            }
                                size={24} color="#A4A4A4"
                                style={{ width: 32, marginTop: 0, marginLeft: 30 }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.title}>{list.heading}</Text>
                        {/* <Text style={styles.taskCount}>
                            {completedCount} of {taskCount}
                        </Text> */}
                    </View>
                </View>
                <View style={[styles.section, { flex: 3 }]}>
                    <FlatList
                        data={subTaskData}
                        extraData={subTaskData}
                        // keyExtractor={item => item.title}
                        renderItem={({ item, index }) => renderTodo(item._data, index)}
                        contentContainerStyle={{ paddingHorizontal: 32, paddingVertical: 64 }}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
                <View style={[styles.section, styles.footer]} >
                    <TextInput style={[styles.input, { borderColor: list.color }]}
                        value={newTodo}
                        onChangeText={text => setNewTodo(text)}
                    />
                    <TouchableOpacity style={[styles.addTodo, { backgroundColor: list.color }]}
                        onPress={() => addTodo()}
                    // addTodo()}
                    >
                        <AntDesign name="plus" size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            {/* </KeyboardAvoidingView> */}
        </View>

    )
}

export default TodoModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    section: {
        flex: 1,
        alignSelf: "stretch"
    },

    header: {
        justifyContent: 'center',
        marginLeft: 64,
        borderBottomWidth: 3
    },
    footer: {
        paddingHorizontal: 32,
        flexDirection: "row",
        alignItems: "center"
    },
    title: {
        fontSize: 30,
        fontWeight: "800",
        color: "#2D3436",
    },
    taskCount: {
        marginTop: 4,
        marginBottom: 16,
        fontWeight: "600",
        color: "#A4A4A4"
    },
    input: {
        flex: 1,
        height: 48,
        width: "75%",
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 6,
        marginRight: 8,
        paddingHorizontal: 8
    },
    addTodo: {
        borderRadius: 4,
        padding: 16,
        alignItems: "center",
        justifyContent: "center"
    },
    todoContainer: {
        paddingVertical: 16,
        flexDirection: "row",
        alignItems: "center"
    },
    todo: {
        color: "#2D3436",
        fontWeight: "700",
        fontSize: 16
    }
})