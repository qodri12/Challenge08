import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import TouchID from 'react-native-touch-id';
import Home from '../DashboardScreen';
import { pokeball } from '../../assets/icon';

const Login = ({ navigation }) => {

    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '873113659672-10qnfui1em3ekj8hmss6at6t2tdks6s6.apps.googleusercontent.com',
        });
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }

    if (initializing) return null;

    const login = () => {

        const optionalConfigObject = {
            title: 'Authentication Required', // Android
            imageColor: '#e00606', // Android
            imageErrorColor: '#ff0000', // Android
            sensorDescription: 'Touch sensor', // Android
            sensorErrorDescription: 'Failed', // Android
            cancelText: 'Cancel', // Android
            fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
            unifiedErrors: false, // use unified error messages (default false)
            passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
        };

        auth()
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                TouchID.authenticate('to demo this react-native component', optionalConfigObject)
                    .then(success => {
                        console.log(success)
                        // navigation.replace('Home')
                        alert('Authenticated Successfully, Signed in with Fingerprint!');
                    })
                    .catch(error => {
                        console.log(error)
                        alert('Authentication Failed');
                    });
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                    console.log('That email address is invalid!');
                }
                console.error(error);
            });
    }

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    if (!user) {

        return (
            <View style={styles.container}>
                <View style={styles.applicationName}>
                    <ImageBackground source={pokeball} style={styles.logo}></ImageBackground>
                    <Text style={styles.appName}>My Pokemon</Text>
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput style={styles.input} placeholder="Email" onChangeText={text => setEmail(text)} value={email} placeholderTextColor={'black'} />
                    <TextInput style={styles.input} secureTextEntry={true} onChangeText={text => setPassword(text)} value={password} placeholder="Password" placeholderTextColor={'black'} />
                </View>
                <View style={styles.loginButton}>
                    <TouchableOpacity onPress={login}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.loginText}>Login</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.loginButton}>
                    <TouchableOpacity onPress={() => onGoogleButtonPress().then(() => alert('Signed in with Google!'))}>
                        <View style={styles.buttonContainer}>
                            <Text style={styles.loginText}>Login With Google</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container2}>
            {navigation.replace('Home')}
        </View >
    );
}

export default Login

const styles = StyleSheet.create({
    applicationName: {
        alignItems: 'center',
        fontSize: 24,
    },
    text: {
        color: 'black',
        fontSize: 22
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F5F2'
    },
    loginImageContainer: {
        alignItems: 'center',
    },
    loginImage: {
        width: 360,
        height: 230,
        marginTop: 80,
        borderRadius: 10,
    },
    textInputContainer: {
        marginTop: 20,
        alignItems: 'center',
        marginBottom: 10
    },
    input: {
        color: 'black',
        borderWidth: 1,
        width: 330,
        height: 40,
        borderRadius: 10,
        marginBottom: 10
    },
    buttonContainer: {
        backgroundColor: 'black',
        width: 280,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    loginButton: {
        alignItems: 'center',
        marginTop: 12
    },
    registerText: {
        alignItems: 'center',
        marginTop: 5
    },
    label: {
        color: 'black',
        fontSize: 11
    },
    register: {
        alignItems: 'center',
        marginTop: 5
    },
    loginText: {
        color: 'white'
    },
    // container2: {
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    //     flex: 1
    // },
    logoutButton: {
        alignItems: 'center',
        marginBottom: 150,
        justifyContent: 'center'
    },
    appName: {
        color: 'black',
        fontSize: 20,
        marginTop: 2
    },
    logo: {
        width: 100,
        height: 100,
        marginTop: 20
    }
})