import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

interface FavoriteButtonProps {
  isFavorite: boolean;
  onPress: () => void;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  isFavorite,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.icon} onPress={onPress}>
      <Image
        source={require('../assets/favorite.png')}
        style={{
          tintColor: isFavorite ? '#DE0000' : undefined,
        }}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
});

export default FavoriteButton;
