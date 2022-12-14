import React, { useEffect, useState, } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import auth from '@react-native-firebase/auth'
import Icon from 'react-native-vector-icons/AntDesign';
import { SetToken } from '../asyncStorage/asyncStorage';
import { showToast, validateUserEmail } from '../helpers/utils';
import screenNames from '../helpers/screenNames'

const LoginScreen = ({ navigation }) => {

    const [Password, setPassword] = useState('')
    const [eMail, setEMail] = useState('')

    const loginEmailAndPassword = async () => {

        auth().signInWithEmailAndPassword(eMail.trim(), Password)
            .then(async (user) => {
                console.log('>>>  user ', user);
                await SetToken(user.user.uid)
                setEMail('')
                setPassword('')
                console.log('>>>  user.uid ', user.user.uid);
                navigation.navigate(screenNames.Home)
            })
            .catch(error => {
                console.log('>>> error login ', error);
                if (error.code === 'auth/user-not-found') {
                    showToast('That email address does not exists!')
                }
                else if (error.code === 'auth/wrong-password') {
                    showToast('Wrong Password!')
                }
                else if (error.code === 'auth/network-request-failed') {
                    showToast('Network Error')
                }

            });
    }




    const btnActionSignIn = () => {
        console.log('>>> Sign In click ', eMail);
        if (eMail === '') {
            showToast('Email is required!')
        }
        else if (!validateUserEmail(eMail.trim())) {
            showToast('Enter Valid Email!')
        }
        else if (Password === '') {
            showToast('Password is required!')
        }
        else if (Password.length < 8) {
            showToast('Password should be at least 8 characters ')
        }
        else {
            loginEmailAndPassword()
        }
    }


    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: '#eee', marginTop: 20, }}>
            <View style={{ marginTop: 160, }}>
                <ScrollView>
                    <Text style={{ marginTop: 10, fontWeight: 'bold' }} >
                        Email
                    </Text>
                    <View style={{
                        shadowColor: "#FFA500",
                        shadowOffset: {
                            width: 3,
                            height: 2,
                        },
                        shadowOpacity: 0.50,
                        shadowRadius: 3.84,
                    }}>
                        <TextInput
                            placeholder='Email'
                            value={eMail}
                            style={{
                                width: '98%', borderWidth: 1, borderRadius: 10,
                                marginTop: 10, paddingStart: 20, height: 50,
                            }}
                            onChangeText={(text) => setEMail(text)}
                        />
                        <Icon name="mail" size={30} style={{ color: 'black', marginLeft: 320, marginTop: -40, }} />
                    </View>
                    <View>
                        <Text style={{ marginTop: 20, fontWeight: 'bold' }} >

                            Password
                        </Text>
                        <TextInput
                            placeholder='**********'
                            secureTextEntry={true}
                            value={Password}
                            style={{
                                width: '98%', borderWidth: 1, borderRadius: 10,
                                marginTop: 10, paddingStart: 20
                            }}
                            onChangeText={(text) => setPassword(text)}
                        />
                        <Icon name="lock" size={30} style={{ color: 'black', marginLeft: 320, marginTop: -40, }} />
                    </View>

                    <TouchableOpacity
                        style={{
                            width: '98%', borderWidth: 1, paddingHorizontal: 20, borderRadius: 10,
                            marginTop: 40, paddingStart: 10, backgroundColor: 'black', marginLeft: 10,
                        }}
                        onPress={() => {
                            btnActionSignIn()
                            // navigation.navigate(screenNames.Home)
                        }}

                    >
                        <Text style={{ textAlign: 'center', padding: 5, color: 'white', fontSize: 20, fontWeight: 'bold', marginLeft: 10, }} >Log In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{ width: '40%', marginTop: 40, paddingStart: 6, marginLeft: 100, }}
                        onPress={() => {

                            // navigation.navigate(screenNames.Login)
                        }}

                    >
                        <Text style={{ textAlign: 'center', padding: 5, fontWeight: 'bold', fontSize: 15, }} >Forgot Passward?</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ width: '98%', borderWidth: 1, paddingHorizontal: 20, borderRadius: 10, marginTop: 40, paddingStart: 10, backgroundColor: 'black', marginLeft: 10, }}
                        onPress={() => {
                            navigation.navigate(screenNames.SignUp)
                        }}

                    >
                        <Text style={{ textAlign: 'center', padding: 5, color: 'white', fontWeight: 'bold', fontSize: 20, }} >Sign Up Here</Text>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        </View>
    )
}

export default LoginScreen;