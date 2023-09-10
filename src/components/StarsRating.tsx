import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const StarRating: React.FC<{stars: number}> = ({stars}) => {
  const filledStars = Math.min(5, Math.max(0, stars)); // Ограничиваем звезды от 0 до 5
  const emptyStars = 5 - filledStars;

  const starIcons = [];
  for (let i = 0; i < filledStars + emptyStars; i++) {
    const starColor = i < filledStars ? '#F3DB00' : 'black';
    starIcons.push(
      <Text key={i} style={{fontSize: 20, color: starColor}}>
        ★
      </Text>,
    );
  }

  return (
    <View style={styles.starRating}>
      {starIcons.map((star, index) => (
        <View key={index}>{star}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  starRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default StarRating;
