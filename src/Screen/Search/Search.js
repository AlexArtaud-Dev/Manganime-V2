import React from 'react';
import {
  HStack,
  Input,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useToast,
  View,
} from 'native-base';

import ThemeClass from '../../utils/ThemeClass';
import {searchAnime} from '../../API/Request';
import AnimeCard from '../../components/AnimeCard';
import SmallSearchIcon from '../../utils/svg/smallSearchIcon';
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

const Search = ({navigation}) => {
  const toast = useToast();
  const [research, setSearch] = React.useState({
    searched: false,
    search: '',
  });
  const [anime, setAnime] = React.useState({
    loading: false,
    data: [],
  });

  const search = async () => {
    setAnime({
      loading: true,
      data: [],
    });
    setSearch({
      searched: true,
      search: research.search,
    });
    searchAnime(research.search.toString()).then(res => {
      if (res.status) {
        setSearch({
          searched: true,
          search: research.search,
        });
        setAnime({
          loading: false,
          data: res.data,
        });
      } else {
        toast.show({
          title: 'An error occured',
          status: 'error',
          description: 'The server might be down, try again later',
        });
      }
    });
  };

  return (
    <View style={theme.searchScreen.container}>
      <Input
        placeholder="Search an anime by name"
        variant="outline"
        width="100%"
        height={60}
        marginBottom={5}
        bg="#140028"
        size="lg"
        color="#fff"
        py="1"
        px="2"
        placeholderTextColor="gray.500"
        _hover={{bg: 'gray.200', borderWidth: 0}}
        borderWidth="0"
        onChangeText={text => {
          setSearch({searched: false, search: text});
        }}
        InputRightElement={
          <Pressable
            style={{
              paddingRight: '7%',
              paddingLeft: '6%',
              paddingTop: '4%',
              backgroundColor: '#7e1954',
              width: '20%',
              height: '100%',
            }}
            onPress={event => {
              search();
            }}>
            <SmallSearchIcon onPress={search} />
          </Pressable>
        }
      />
      {research.length === 0 ? (
        <Text
          fontSize="2xl"
          style={{color: '#a02669', textAlign: 'center', marginTop: '70%'}}>
          Start Searching
        </Text>
      ) : (
        <>
          {anime.loading ? (
            <Spinner
              size="lg"
              color="#a02669"
              accessibilityLabel="Loading posts"
            />
          ) : (
            <>
              {anime.data.length !== 0 ? (
                <ScrollView style={{width: '100%'}}>
                  <HStack
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                    alignItems="center">
                    {anime.data.map(item => (
                      <AnimeCard item={item} navigator={navigation} />
                    ))}
                  </HStack>
                </ScrollView>
              ) : (
                <>
                  {!anime.loading && research.searched ? (
                    <Text
                      fontSize="2xl"
                      style={{
                        color: '#a02669',
                        textAlign: 'center',
                        marginTop: '70%',
                      }}>
                      No anime found with your search!
                    </Text>
                  ) : null}
                </>
              )}
            </>
          )}
        </>
      )}
    </View>
  );
};

export default Search;
