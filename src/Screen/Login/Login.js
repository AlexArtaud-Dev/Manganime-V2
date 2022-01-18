import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Link,
  Text,
  useToast,
  View,
  VStack,
  WarningOutlineIcon,
} from 'native-base';
import {removeToken, setToken} from '../../API/Token';

import ThemeClass from '../../utils/ThemeClass';
import EmailIcon from '../../utils/svg/emailIcon';
import PasswordIcon from '../../utils/svg/passwordIcon';
import {login} from '../../API/Auth';
import {getUserData} from '../../API/Request';
import {setUser} from '../../API/User';
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

const Login = ({navigation}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  const toast = useToast();
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});

  const validate = () => {
    if (formData.email === undefined) {
      setErrors({
        ...errors,
        email: 'Email is required',
      });
      return false;
    } else if (
      !formData.email
        .toLowerCase()
        .toString()
        .match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
    ) {
      setErrors({
        ...errors,
        email: 'Your email format is invalid',
      });
      return false;
    }
    if (formData.password === undefined) {
      setErrors({
        ...errors,
        password: 'Password is required',
      });
      return false;
    }
    return true;
  };
  const onSubmit = () => {
    validate() ? loginRequest() : notValid();
  };
  const notValid = () => {
    toast.show({
      title: 'Invalid email address or password',
      status: 'warning',
      description: 'Please enter a valid email address or password',
    });
  };
  const loginRequest = async () => {
    // console.log('Requesting Login Endpoint');
    const data = {
      email: formData.email,
      password: formData.password,
    };
    login(data).then(data => {
      if (!data.status) {
        toast.show({
          title: 'Invalid email address or password',
          status: 'warning',
          description: 'Please enter a valid email address or password',
        });
      } else {
        setToken(data.accessToken);
        toast.show({
          title: 'Login Successful',
          status: 'success',
          description: 'You have successfully logged in, redirecting...',
        });
        getUserData(data.accessToken).then(res => {
          if (res.status) {
            setUser(JSON.stringify(res.data));
            setTimeout(() => {
              navigation.navigate('Home');
            }, 2000);
          } else {
            toast.show({
              title: 'Login Error',
              status: 'error',
              description:
                'You have successfully logged in, but an error occured while retrieving your data, please try again later',
            });
          }
        });
      }
    });
  };

  // removeToken()
  // setToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGM3ZDg0MjdmMDdmYTRkYzRmYzQ3YzciLCJpYXQiOjE2NDA4MTEwODh9.TLSFqxISvMzcRDWrd2m_sp4zWDpt-mROGx7x5zzfYoU");

  return (
    <View style={theme.loginScreen.container}>
      <Box safeArea p="2" py="8" w="90%" maxW="290">
        <Heading size="lg" textAlign="center" style={theme.loginScreen.heading}>
          {' '}
          Login{' '}
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired isInvalid={'email' in errors}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              w={{
                base: '100%',
                md: '25%',
              }}
              InputRightElement={EmailIcon()}
              _focus={theme.loginScreen.hoveredInput}
              onChangeText={value => setData({...formData, email: value})}
            />
            {'email' in errors ? (
              <FormControl.ErrorMessage
                _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>
                Your email is invalid
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
          </FormControl>

          <FormControl isRequired isInvalid={'password' in errors}>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              type="password"
              w={{
                base: '100%',
                md: '25%',
              }}
              InputRightElement={PasswordIcon()}
              _focus={theme.loginScreen.hoveredInput}
              onChangeText={value => setData({...formData, password: value})}
            />
            {'password' in errors ? (
              <FormControl.ErrorMessage
                _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>
                Incorrect Password
              </FormControl.ErrorMessage>
            ) : (
              ''
            )}
          </FormControl>
          <Button
            mt="2"
            colorScheme="rgb(126,25,84)"
            _pressed={theme.loginScreen.activeButton}
            onPress={onSubmit}>
            Sign in
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}>
              You're a new user ?{' '}
            </Text>
            <Link
              _text={{
                color: 'rgb(160,38,105)',
              }}
              style={theme.loginScreen.link}
              onPress={() => navigation.navigate('Register')}>
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </View>
  );
};

export default Login;
