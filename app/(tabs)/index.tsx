import { Image, StyleSheet, Platform, View, Dimensions, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AnimatedGradientBackground from '@/components/Background';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {

  const { width, height } = Dimensions.get('window');

  const styl = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
      justifyContent: "flex-end"
    },
  });

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
      <View style={styl.container}>
        <StatusBar style='light'/>
      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
