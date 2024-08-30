import { Image, StyleSheet, Platform, View, Dimensions, Animated } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AnimatedGradientBackground from '@/components/Background';
import { useEffect, useRef } from 'react';

export default function ToDoScreen() {

  const { width, height } = Dimensions.get('window');

  const styl = StyleSheet.create({
    container: {
      flex: 1,
      width: width,
      height: height,
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
        <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: colorInterpolation }]} >
          <ThemedView style={styles.titleContainer}>
            <ThemedText type="title">Welcome!</ThemedText>
            <ThemedText>hihii</ThemedText>
            <HelloWave />
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 1: Try it</ThemedText>
            <ThemedText>
              Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
              Press{' '}
              <ThemedText type="defaultSemiBold">
                {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
              </ThemedText>{' '}
              to open developer tools.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            <ThemedText>
              Tap the Explore tab to learn more about what's included in this starter app.
            </ThemedText>
          </ThemedView>
          <ThemedView style={styles.stepContainer}>
            <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
            <ThemedText>
              When you're ready, run{' '}
              <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
              <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
              <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
              <ThemedText type="defaultSemiBold">app-example</ThemedText>.
            </ThemedText>
          </ThemedView>
        </Animated.View>
      </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
