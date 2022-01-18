import React, {useEffect, useState} from 'react';
import {getAnimeInfos, getStreamingLinks} from '../../API/Request';
import ThemeClass from '../../utils/ThemeClass';
import {
  Button,
  HStack,
  Image,
  Modal,
  ScrollView,
  Select,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import {Dimensions, Linking} from 'react-native';
import UpVoteIcon from '../../utils/svg/upvoteIcon';
import {colors} from '../../utils/theme';
const ThemeProvider = new ThemeClass();
const theme = ThemeProvider.getTheme();
import {Picker} from '@react-native-picker/picker';
import GetLinksIcon from '../../utils/svg/getLinksIcon';

const DisplayAnimeScreen = ({route, navigation}) => {
  if (!route.params) {
    navigation.navigate('Trending');
    return null;
  }
  const width = Dimensions.get('window').width;
  const [anime, setAnime] = useState({
    loading: false,
    data: [],
  });
  let [episodeChoice, setEpisodeChoice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [streamingLink, setStreamingLink] = useState(null);

  useEffect(() => {
    getAnimeInfos(route.params.anime).then(data => {
      if (data.status) {
        setAnime({loading: false, data: data.data});
      } else {
        setAnime({loading: false, data: []});
      }
    });
  }, [route]);
  const episodes = [];
  const select = (episode, index) => {
    return (
      <Picker.Item
        color="#ffffff"
        label={`Episode ${index + 1}`}
        value={episode}
      />
    );
  };
  if (anime.data.episodes) {
    anime.data.episodes.forEach((episode, index) => {
      episodes.push(select(episode, index));
    });
  }

  const openInBrowser = url => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + url);
      }
    });
  };

  const linkButton = object => {
    return (
      <Button  backgroundColor="#a02669" style={{marginBottom:"2%"}} onPress={() => openInBrowser(object.streaming)}>
        {object.index}
      </Button>
    );
  };

  const retrieveLinks = (anime, episodeChoice) => {
    setShowModal(true);
    const data = {
      title: anime.data.name,
      link: episodeChoice,
      image: anime.data.picture,
    };
    getStreamingLinks(data).then(res => {
      const temp = [];
      if (res.status) {
        res.data.forEach(object => {
          temp.push(linkButton(object));
        });
        setStreamingLink(temp);
      } else {
        setStreamingLink(<Text>No Link Found</Text>);
      }
    });
  };
  const clearLinks = () => {
    setStreamingLink(null);
    setShowModal(false);
  };
  // console.log(episodes);
  // console.log(anime);

  return (
    <View style={theme.displayScreen.container}>
      <Modal
        onClose={() => clearLinks()}
        isOpen={showModal}
        _backdrop={{
          bg: '#000000',
        }}>
        <Modal.Content maxWidth="350" maxH="220" borderColor="#a02669">
          <Modal.CloseButton />
          <Modal.Body backgroundColor="#22004a" py="10%">
            {streamingLink ? (
              streamingLink
            ) : (
              <Spinner
                size="lg"
                color="#a02669"
                accessibilityLabel="Loading links"
              />
            )}
          </Modal.Body>
          <Modal.Footer backgroundColor="#100024">
            <Button
              backgroundColor="#a02669"
              onPress={() => {
                clearLinks();
              }}>
              Close
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      {anime.loading ? (
        <Spinner size="lg" color="#a02669" accessibilityLabel="Loading posts" />
      ) : (
        <ScrollView
          nestedScrollEnabled={true}
          style={theme.displayScreen.containerLoaded}>
          <Text
            style={{
              fontSize: 0.07 * width,
              textAlign: 'center',
              fontWeight: 'bold',
              color: colors.link.color,
              paddingTop: 50,
              lineHeight: 0.07 * width,
            }}>
            {anime.data.name}
          </Text>
          <Text style={theme.displayScreen.smallText}>{anime.data.status}</Text>
          <HStack style={theme.displayScreen.horizontalContainer}>
            <VStack style={theme.displayScreen.verticalContainer}>
              <Image
                key={new Date()}
                source={{
                  uri: anime.data.picture,
                }}
                alt={anime.data.name}
                style={{marginLeft: '2%', width: 200, height: 300}}
              />
            </VStack>
            <VStack
              space={3}
              alignItems="center"
              style={theme.displayScreen.verticalContainer}>
              <Button
                ml="2"
                style={{width: '90%', textAlign: 'center'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                leftIcon={<UpVoteIcon />}>
                Upvote
              </Button>
              <Button
                ml="2"
                style={{width: '90%', textAlign: 'center'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                leftIcon={<UpVoteIcon />}>
                Trailer
              </Button>
              <Button
                ml="2"
                style={{width: '90%', textAlign: 'center'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                leftIcon={<UpVoteIcon />}>
                Gogoanime
              </Button>
              <Button
                ml="2"
                style={{width: '90%', textAlign: 'center'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                leftIcon={<UpVoteIcon />}>
                Staff
              </Button>
              <Button
                ml="2"
                style={{width: '90%', textAlign: 'center'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                leftIcon={<UpVoteIcon />}>
                Characters
              </Button>
            </VStack>
          </HStack>
          <VStack>
            <Text style={theme.displayScreen.subTitle}>Synopsis</Text>
            <ScrollView
              nestedScrollEnabled={true}
              px="20px"
              height="10%"
              children={
                <Text style={{flex: 1}}>
                  {anime.data.synopsis
                    ? anime.data.synopsis.replace(
                        '[Written by MAL Rewrite]',
                        '',
                      )
                    : anime.data.synopsis}
                </Text>
              }
            />
          </VStack>
          <VStack>
            <Text style={theme.displayScreen.subTitle}>Genres</Text>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              px="20px"
              height="2%"
              width="100%"
              children={
                <Text>
                  {anime.data.genres
                    ? anime.data.genres.join(', ')
                    : anime.data.genres}
                </Text>
              }
            />
          </VStack>
          <VStack>
            <Text style={theme.displayScreen.subTitle}>Episodes</Text>
            <Text px="20px">
              {anime.data.episodesNumber
                ? `${anime.data.episodesNumber} episodes (${
                    anime.data.episodeDuration.split('.')[0]
                  })`
                : anime.data.genres}
            </Text>
          </VStack>
          <VStack>
            <Text style={theme.displayScreen.subTitle}>Studios</Text>
            <ScrollView
              horizontal={true}
              nestedScrollEnabled={true}
              px="20px"
              height="2%"
              width="100%"
              children={
                <Text>
                  {anime.data.studios
                    ? anime.data.studios.join(', ')
                    : anime.data.studios}
                </Text>
              }
            />
          </VStack>
          <VStack>
            <Text
              style={{
                fontSize: 0.07 * width,
                textAlign: 'center',
                fontWeight: 'bold',
                color: colors.link.color,
                paddingTop: 50,
                lineHeight: 0.07 * width,
              }}>
              Streaming Links
            </Text>
          </VStack>
          {episodes.length > 0 ? (
            <VStack style={theme.displayScreen.containerPicker}>
              <Picker
                style={{
                  width: '75%',
                  backgroundColor: '#1d0040',
                }}
                placeholder="Select a server"
                enabled={episodes.length > 0}
                selectedValue={episodeChoice}
                dropdownIconColor={colors.link.color}
                dropdownIconRippleColor={colors.link.color}
                prompt="Select an episode to watch"
                onValueChange={(value, index) => setEpisodeChoice(value)}
                mode="dropdown">
                {episodes}
              </Picker>
              <Button
                style={{width: '75%', marginBottom:"30%", textAlign: 'center', marginTop: '10%'}}
                colorScheme="rgb(126,25,84)"
                _pressed={theme.loginScreen.activeButton}
                onPress={() => {
                  retrieveLinks(anime, episodeChoice);
                }}
                leftIcon={<GetLinksIcon />}>
                Get links
              </Button>
            </VStack>
          ) : (
            <Text>No episode were found</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default DisplayAnimeScreen;
