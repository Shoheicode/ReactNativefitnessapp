import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AnimatedGradientBackground = () => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animateGradient = () => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: false,
      }).start(() => {
        animation.setValue(0);
        animateGradient();
      });
    };

    animateGradient();
  }, []);

  const colorInterpolation = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['rgba(131,58,180,1)', 'rgba(253,29,29,1)', 'rgba(252,176,69,1)'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colorInterpolation }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
});

export default AnimatedGradientBackground;