import React, {useEffect} from 'react';
import { BackHandler } from 'react-native';
import {Box, Button, FormControl, Heading, HStack, Input, Link, Text, useToast, View, VStack,} from "native-base";
import ThemeClass from "../../utils/ThemeClass"
import EmailIcon from "../../utils/svg/emailIcon";
import PasswordIcon from "../../utils/svg/passwordIcon";
import UserIcon from "../../utils/svg/userIcon";
import KeyIcon from "../../utils/svg/keyIcon";
import { register } from "../../API/Auth";
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

const Register = ({ navigation }) => {
    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove()
    }, [])

    const toast = useToast()
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});


    const validate = () => {

        if (formData.username === undefined){
            setErrors({
                ...errors,
                username: 'Username is required',
            });
            return false;
        }else {
            delete errors.username;
        }
        if (formData.username.length < 6) {
            setErrors({
                ...errors,
                username: 'Username must be 6 characters or more',
            });
            return false;
        }else {
            delete errors.username;
        }
        if (formData.email === undefined) {
            setErrors({
                ...errors,
                email: 'Email is required',
            });
            return false;
        }else {
            delete errors.email;
        }
        if (!formData.email.toLowerCase().toString().match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
            setErrors({
                ...errors,
                email: 'Your email format is invalid',
            });
            return false;
        }else {
            delete errors.email;
        }
        if (formData.password === undefined) {
            setErrors({
                ...errors,
                password: 'Password is required',
            });
            return false;
        }else {
            delete errors.password;
        }
        if (formData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            setErrors({
                ...errors,
                password: 'Password must contain 1 capital letter, 1 number, 1 special character and 8 characters or more',
            });
            return false;
        }else {
            delete errors.password;
        }
        if (formData.confirmPassword === undefined) {
            setErrors({
                ...errors,
                confirmPassword: 'Confirm Password is required',
            });
            return false;
        }else {
            delete errors.confirmPassword;
        }
        if (formData.confirmPassword.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
            setErrors({
                ...errors,
                confirmPassword: 'Confirm Password must contain 1 capital letter, 1 number, 1 special character and 8 characters or more',
            });
            return false;
        }else {
            delete errors.confirmPassword;
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors({
                ...errors,
                confirmPassword: 'Passwords do not match',
            });
            return false;
        }else {
            delete errors.confirmPassword;
        }
        if (formData.key === undefined) {
            setErrors({
                ...errors,
                key: 'Key is required',
            });
            return false;
        }else {
            delete errors.key;
        }
        if (!formData.key.match(/[a-zA-Z0-9_.-]+-[a-zA-Z0-9_.-]+-[a-zA-Z0-9_.-]+-[a-zA-Z0-9_.-]+/i)){
            setErrors({
                ...errors,
                key: 'Key is wrong format',
            });
            return false;
        }else {
            delete errors.key;
        }
        return true;
    };
    const onSubmit = () => {
        validate() ? registerRequest() : "";
    };
    const registerRequest = async () => {
        console.log('Requesting Login Endpoint');
        const data = {
            key: formData.key,
            nickname: formData.username,
            email: formData.email,
            password: formData.password,
            passwordConfirmation: formData.confirmPassword
        };
        register(data).then(data => {
             if (!data.status){
                 toast.show({
                     title: "Error while registering",
                     status: "warning",
                     description: data.body.message,
                 })
             }else{
                 toast.show({
                     title: "Successfully registered",
                     status: "success",
                     description: "Redirecting you to login page",
                 })
                 setTimeout(() => {
                     navigation.navigate('Login');
                 }, 2000);
             }
        })
    }

    // removeToken()
    // setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3ZDg0MjdmMDdmYTRkYzRmYzQ3YzciLCJpYXQiOjE2NDA4MTEwODh9.TLSFqxISvMzcRDWrd2m_sp4zWDpt-mROGx7x5zzfYoU");

    return (
        <View style={theme.registerScreen.container} >
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" textAlign="center" style={theme.registerScreen.heading}> Register </Heading>

                <VStack space={1} mt="1">
                    <FormControl isRequired isInvalid={'username' in errors}>
                        <FormControl.Label>Username</FormControl.Label>
                        <Input
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputRightElement={UserIcon()}
                            _focus={theme.registerScreen.hoveredInput}
                            onChangeText={(value) => {
                                setData({...formData, username: value});
                            }}
                        />
                        {'username' in errors ?
                            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.username}</FormControl.ErrorMessage>
                            :
                            ""
                        }
                    </FormControl>

                    <FormControl isRequired isInvalid={'email' in errors}>
                        <FormControl.Label>Email</FormControl.Label>
                        <Input
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputRightElement={EmailIcon()}
                            _focus={theme.registerScreen.hoveredInput}
                            onChangeText={(value) => setData({ ...formData, email: value })}
                        />
                        {'email' in errors ?
                                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.email}</FormControl.ErrorMessage>
                                :
                                ""
                        }
                    </FormControl>

                    <FormControl isRequired isInvalid={'password' in errors}>
                        <FormControl.Label>Password</FormControl.Label>
                        <Input
                            type="password"
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputRightElement={PasswordIcon()}
                            _focus={theme.registerScreen.hoveredInput}
                            onChangeText={(value) => setData({ ...formData, password: value })}
                        />
                        {'password' in errors ?
                            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.password}</FormControl.ErrorMessage>
                            :
                            ""
                        }
                    </FormControl>

                    <FormControl isRequired isInvalid={'confirmPassword' in errors}>
                        <FormControl.Label>Password Confirmation</FormControl.Label>
                        <Input
                            type="password"
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputRightElement={PasswordIcon()}
                            _focus={theme.registerScreen.hoveredInput}
                            onChangeText={(value) => setData({ ...formData, confirmPassword: value })}
                        />
                        {'confirmPassword' in errors ?
                            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.confirmPassword}</FormControl.ErrorMessage>
                            :
                            ""
                        }
                    </FormControl>

                    <FormControl isRequired isInvalid={'key' in errors}>
                        <FormControl.Label>Invitation Key</FormControl.Label>
                        <Input
                            w={{
                                base: "100%",
                                md: "25%",
                            }}
                            InputRightElement={KeyIcon()}
                            placeholder="XXXX-XXXX-XXXX-XXXX"
                            _focus={theme.registerScreen.hoveredInput}
                            onChangeText={(value) => setData({ ...formData, key: value })}
                        />
                        {'key' in errors ?
                            <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.key}</FormControl.ErrorMessage>
                            :
                            ""
                        }
                    </FormControl>

                    <Button mt="2" colorScheme="rgb(126,25,84)"  _pressed={theme.registerScreen.activeButton} onPress={onSubmit}>
                        Sign up
                    </Button>

                    <HStack mt="6" justifyContent="center">
                        <Text
                            fontSize="sm"
                            color="coolGray.600"
                            _dark={{
                                color: "warmGray.200",
                            }}
                        >
                            You already have an account ?{" "}
                        </Text>
                        <Link
                            _text={{
                                color: "rgb(160,38,105)",
                            }}
                            style={theme.registerScreen.link}
                            onPress={() => navigation.navigate('Login')}
                        >
                            Log In
                        </Link>
                    </HStack>
                </VStack>
            </Box>
        </View>


    );
}
export default Register;
