import React from 'react';
import {Image, Tooltip, useToast} from 'native-base';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const AnimeCard = ({item, navigator}) => {
  const toast = useToast();

  const onPress = () => {
    navigator.navigate('DisplayAnime', {
      anime: item,
    });
  };
  const onLongPress = () => {
    toast.show({
      title: 'Anime Title',
      status: 'info',
      description: item.title,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={onPress} onLongPress={onLongPress}>
      <Image
        source={{
          uri: `${item.image}`,
        }}
        alt={item.title}
        width={170}
        height={240}
        style={{margin: '2%'}}
      />
    </TouchableWithoutFeedback>
  );
};

export default AnimeCard;
