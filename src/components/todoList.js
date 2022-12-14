import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native'
import React, { useState } from 'react'
import TodoModal from './TodoModal';
import UpdateData from './updateTodo';
import AntDesign from "react-native-vector-icons/AntDesign"

const TodoList = ({ list, deleteTodo }) => {
    // console.log("list.todoId", list.todoId)
    // const completedCount = list && list.subTodos ? list.todos.filter(todo => todo.completed).length : 0
    // const remainingCount = list && list.subTodos ? list.todos.length - completedCount : 0
    // console.log("remainingCount", remainingCount)

    const [showListVisible, setShowListVisible] = useState(false)

    // const heading = list
    // console.log("LISTTT RETURN", list.heading)

    return (
        <View>
            <Modal
                animationType="slide" visible={showListVisible}
                onRequestClose={() => setShowListVisible(false)}
            >
                <View>
                    <TodoModal list={list} itemId={list.todoId} closeModal={() => setShowListVisible(false)} />
                </View>
            </Modal>

            <TouchableOpacity style={[styles.listContainer, { backgroundColor: list.color }]}
                onPress={() => setShowListVisible(true)}
            >
                <Text style={styles.listTitle} numberOfLines={1}>
                    {list.heading}
                </Text>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <TouchableOpacity onPress={() => deleteTodo(list.todoId)}>
                            <AntDesign name="delete" size={20} color={"#24A6D9"} />
                        </TouchableOpacity>
                        {/* <Text style={styles.count}>{remainingCount}</Text>
            <Text style={styles.subTitle}>Remaining </Text> */}
                    </View>
                    <View style={{ alignItems: "center" }}>
                        <UpdateData list={list} />
                        {/* <Text style={styles.count}>{completedCount}</Text>
            <Text style={styles.subTitle}>Completed </Text> */}
                    </View>
                </View>

            </TouchableOpacity>
        </View>
    )
}

export default TodoList;

const styles = StyleSheet.create({
    listContainer: {
        paddingHorizontal: 16,
        paddingVertical: 32,
        borderRadius: 6,
        marginHorizontal: 12,
        alignItems: "center",
        width: 200,
        height: 175
    },
    listTitle: {
        fontSize: 24,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 18,
    },
    count: {
        fontSize: 48,
        fontWeight: "200",
        color: "#FFFFFF",
    },
    subTitle: {
        fontSize: 12,
        fontWeight: "700",
        color: "#FFFFFF",
    },
})