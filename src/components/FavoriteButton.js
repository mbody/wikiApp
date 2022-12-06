import React from 'react';
import {Animated, StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {IconButton} from 'react-native-paper';
import {Colors} from '../Theme';

export default class FavoriteButton extends React.Component {
  state = {
    animValue: new Animated.Value(1), // Initial value for color: 0
  };

  render() {
    let {animValue} = this.state;
    let {isFavorite} = this.props;

    const animatedColor = animValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['rgba(255, 0, 0, 1)', 'rgba(255, 0, 0, 0)'],
    });

    return (
      <Animatable.View animation={isFavorite ? 'pulse' : ''} iterationCount={3}>
        <Animated.View style={[styles.bg, {backgroundColor: animatedColor}]}>
          <IconButton
            accessible={true}
            accessibilityLabel="Bouton favoris"
            accessibilityHint={`${
              isFavorite ? 'Retirer' : 'Ajouter'
            } cette page ${isFavorite ? 'de' : 'à'}  vos favoris`}
            icon={isFavorite ? 'heart' : 'heart-outline'}
            color={isFavorite ? Colors.red : Colors.gray}
            size={30}
            onPress={this.onButtonPressed}
          />
        </Animated.View>
      </Animatable.View>
    );
  }

  onButtonPressed = () => {
    this.state.animValue = new Animated.Value(0);
    Animated.spring(this.state.animValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    this.props.onPress();
  };
}

const styles = StyleSheet.create({
  bg: {
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
