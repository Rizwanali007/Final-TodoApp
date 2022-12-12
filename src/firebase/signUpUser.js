import app from './firebaseInitialize'
import auth from '@react-native-firebase/auth'

export const SignUpUser = async (email, Password) => {
    // console.log("Email,Password", Password, email);

    try {
        return auth().createUserWithEmailAndPassword(email, Password);
    } catch (error) {
        console.log("NNNNNN", error);

        return error;
    }
}
