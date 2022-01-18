import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  Box,
  Pressable,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
} from 'native-base';
import {getUser} from '../../API/User';
import UserIcon from '../../utils/svg/userIcon';
import ThemeClass from '../../utils/ThemeClass';
import {useEffect} from 'react';
import {BackHandler} from 'react-native';
import GoBackIcon from '../../utils/svg/goBackIcon';
import AdminIcon from '../../utils/svg/adminIcon';
import RightArrowIcon from '../../utils/svg/rightArrowIcon';
import SecurityIcon from '../../utils/svg/securityIcon';
import DisconnectScreen from '../DisconnectScreen/DisconnectScreen';
import DisconnectIcon from '../../utils/svg/disconnectIcon';
import QrIcon from '../../utils/svg/qrIcon';
import UsersIcon from '../../utils/svg/usersIcon';
import GenerateIcon from '../../utils/svg/generateIcon';
import ManageKeyIcon from '../../utils/svg/manageKeyIcon';
import GlobalInfoIcon from '../../utils/svg/globalInfoIcon';
import TrendingIcon from '../../utils/svg/trendingIcon';
import WatchedIcon from '../../utils/svg/watchedIcon';
import SearchIcon from '../../utils/svg/searchIcon';
import Trending from '../Trending/Trending';
import Search from '../Search/Search';
import DisplayAnimeScreen from '../DisplayAnimeScreen/DisplayAnimeScreen';
import Watched from "../Watched/Watched";
const Drawer = createDrawerNavigator();
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

let selectedMenu = 'Trending';
let filtre = [];
const AdminPanelString = [
  'Users',
  'Generate Key',
  'Manage Keys',
  'Global Infos',
];
const AccountString = ['Security', 'QR Login', 'Disconnect'];
const Home = () => {
  const [user, setUser] = React.useState(null);
  const [filter, setFilter] = React.useState([]);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => true,
    );
    return () => backHandler.remove();
  }, []);

  React.useEffect(() => {
    getUser().then(user => {
      setTimeout(() => {
        getUser().then(userRefreshed => {
          setUser(JSON.parse(userRefreshed));
        });
      }, 2000);
    });
  }, []);
  React.useEffect(() => {
    setInterval(() => {
      if (filter[0] !== filtre[0]) {
        setFilter(filtre);
      }
    }, 100);
  }, [filter]);

  return (
    <NavigationContainer independent={true}>
      <MyDrawer user={user} filtre={filter} />
    </NavigationContainer>
  );
};
function setSelected(selected) {
  selectedMenu = selected;
}
function setFilter(name = null) {
  if (!name) {
    filtre = [];
  } else {
    filtre = [`${name}`];
  }
}
function Component(props) {
  return (
    <Center>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </Center>
  );
}
function doNothing() {
  console.log('Do nothing');
}
function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView
      {...props}
      safeArea
      style={theme.drawerScreen.container}>
      {props.user !== null ? drawerItem(props) : doNothing()}
    </DrawerContentScrollView>
  );
}

function drawerItem(props) {
  return (
    <VStack space="6">
      <Box px="4" style={theme.drawerScreen.header}>
        <Text bold>
          {props.user.nickname}{' '}
          {props.user.authority.level === 10 ? '(ADMIN)' : ''}
        </Text>
        <Text fontSize="14" mt="1" fontWeight="500">
          {props.user.email}
        </Text>
      </Box>
      {props.filtre.length !== 0 ? (
        <>
          {props.filtre[0] === 'Admin' ? adminSubPanel(props) : null}
          {props.filtre[0] === 'User' ? accountSubPanel(props) : null}
        </>
      ) : (
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames
              .filter(
                name =>
                  !AccountString.includes(name) &&
                  !AdminPanelString.includes(name) &&
                  name !== 'DisplayAnime',
              )
              .map((name, index) => (
                <Pressable
                  px="5"
                  py="3"
                  rounded="md"
                  bg={name === selectedMenu ? '#a02669' : 'transparent'}
                  onPress={event => {
                    setSelected(name);
                    props.navigation.navigate(name);
                  }}>
                  <HStack space="7" alignItems="center">
                    {name === 'Trending' ? (
                      <Icon size="5" as={<TrendingIcon />} />
                    ) : null}
                    {name === 'Search' ? (
                      <Icon size="5" as={<SearchIcon />} />
                    ) : null}
                    {name === 'Watched' ? (
                      <Icon size="5" as={<WatchedIcon />} />
                    ) : null}
                    <Text fontWeight="500">{name}</Text>
                  </HStack>
                </Pressable>
              ))}
          </VStack>
          {props.user.authority.level === 10 ? AdminPanel(props) : doNothing()}

          <VStack space="5">
            <Pressable
              px="5"
              py="3"
              onPress={event => {
                setFilter('User');
              }}>
              <HStack space="7" alignItems="center">
                <Icon size="5" as={<UserIcon />} />
                <Text fontWeight="500" style={{marginRight: '12%'}}>
                  Account
                </Text>
                <Icon size="2" as={<RightArrowIcon />} />
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
function AdminPanel(props) {
  return (
    <VStack space="5">
      <Pressable
        px="5"
        py="3"
        onPress={event => {
          setFilter('Admin');
        }}>
        <HStack space="7" alignItems="center">
          <Icon size="5" as={<AdminIcon />} />
          <Text fontWeight="500">Admin Panel</Text>
          <Icon size="2" as={<RightArrowIcon />} />
        </HStack>
      </Pressable>
    </VStack>
  );
}

function adminSubPanel(props) {
  return (
    <VStack space="3">
      <Pressable
        px="5"
        py="3"
        rounded="md"
        bg={'transparent'}
        onPress={event => {
          setFilter(null);
        }}>
        <HStack space="7" alignItems="center">
          <Icon size="5" as={<GoBackIcon />} />
          <Text fontWeight="500">Go Back</Text>
        </HStack>
      </Pressable>
      {props.state.routeNames
        .filter(name => AdminPanelString.includes(name))
        .map((name, index) => (
          <Pressable
            px="5"
            py="3"
            rounded="md"
            bg={name === selectedMenu ? '#a02669' : 'transparent'}
            onPress={event => {
              setSelected(name);
              props.navigation.navigate(name);
            }}>
            <HStack space="7" alignItems="center">
              {name === 'Users' ? <Icon size="5" as={<UsersIcon />} /> : null}
              {name === 'Generate Key' ? (
                <Icon size="5" as={<GenerateIcon />} />
              ) : null}
              {name === 'Manage Keys' ? (
                <Icon size="5" as={<ManageKeyIcon />} />
              ) : null}
              {name === 'Global Infos' ? (
                <Icon size="5" as={<GlobalInfoIcon />} />
              ) : null}
              <Text fontWeight="500">{name}</Text>
            </HStack>
          </Pressable>
        ))}
    </VStack>
  );
}
function accountSubPanel(props) {
  return (
    <VStack space="3">
      <Pressable
        px="5"
        py="3"
        rounded="md"
        bg={'transparent'}
        onPress={event => {
          setFilter(null);
        }}>
        <HStack space="7" alignItems="center">
          <Icon size="5" as={<GoBackIcon />} />
          <Text fontWeight="500">Go Back</Text>
        </HStack>
      </Pressable>
      {props.state.routeNames
        .filter(name => AccountString.includes(name))
        .map((name, index) => (
          <Pressable
            px="5"
            py="3"
            rounded="md"
            bg={name === selectedMenu ? '#a02669' : 'transparent'}
            onPress={event => {
              setSelected(name);
              props.navigation.navigate(name);
            }}>
            <HStack space="7" alignItems="center">
              {name === 'Security' ? (
                <Icon size="5" as={<SecurityIcon />} />
              ) : null}
              {name === 'QR Login' ? <Icon size="5" as={<QrIcon />} /> : null}
              {name === 'Disconnect' ? (
                <Icon size="5" as={<DisconnectIcon />} />
              ) : null}

              <Text fontWeight="500">{name}</Text>
            </HStack>
          </Pressable>
        ))}
    </VStack>
  );
}
function MyDrawer({user, filtre}) {
  return (
    <Box safeArea flex={1}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#25014f',
          },
          headerTintColor: '#fff',
        }}
        drawerContent={props => (
          <CustomDrawerContent
            {...props}
            user={user}
            filtre={filtre}
            style={theme.drawerScreen.drawer}
          />
        )}>
        <Drawer.Screen name="DisplayAnime" component={DisplayAnimeScreen} />
        <Drawer.Screen name="Trending" component={Trending} />
        <Drawer.Screen name="Search" component={Search} />
        <Drawer.Screen name="Watched" component={Watched} />

        <Drawer.Screen name="Users" component={Component} />
        <Drawer.Screen name="Generate Key" component={Component} />
        <Drawer.Screen name="Manage Keys" component={Component} />
        <Drawer.Screen name="Global Infos" component={Component} />

        <Drawer.Screen name="Security" component={Component} />
        <Drawer.Screen name="QR Login" component={Component} />
        <Drawer.Screen name="Disconnect" component={DisconnectScreen} />
      </Drawer.Navigator>
    </Box>
  );
}

export default Home;
