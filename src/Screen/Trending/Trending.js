import React, {useEffect} from 'react';
import {HStack, ScrollView, Spinner, Text, View} from 'native-base';

import ThemeClass from '../../utils/ThemeClass';
import {getTrendingAnime} from '../../API/Request';
import AnimeCard from '../../components/AnimeCard';
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();

const Trending = ({navigation}) => {

  const [anime, setAnime] = React.useState({
    loading: false,
    data: [],
  });
  useEffect(() => {
    getTrendingAnime().then(data => {
      if (data.status) {
        setAnime({loading: false, data: data.data});
      } else {
        setAnime({loading: false, data: []});
      }
    });
  }, []);

  return (
    <View style={theme.loginScreen.container}>
      {anime.loading ? (
        <Spinner size="lg" color="#a02669" accessibilityLabel="Loading posts" />
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
            <Text fontSize="2xl" style={{color: "#a02669"}}>No trending anime found !</Text>
          )}
        </>
      )}
    </View>
  );
};

export default Trending;
