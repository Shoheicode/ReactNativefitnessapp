import { Image, StyleSheet, Platform, View, Dimensions, Text, ViewBase, TouchableOpacity } from 'react-native';
import { useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { FadeIn, FadeOut } from 'react-native-reanimated';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {

  const styl = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-end"
    },
  });

  return (
      <View style={styl.container}
        
      >
        <StatusBar style='light'/>
        
        <Image style={styles.imageWelcome} source={require('@/assets/images/exerciseImages/welcome.png')}/>

        <LinearGradient

          colors={["transparent", "#18181b"]}
          style={{
            width: widthPercentageToDP(100),
            height: heightPercentageToDP(70),
            marginTop: "auto"
          }}
          start={{
            x:0.5,
            y:0
          }}
          end={{
            x:0.5,
            y:0.8
          }}
          
        >
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={
              {
                display:"flex",
                marginTop: "auto",
                alignItems: "center",
                marginBottom: heightPercentageToDP(3)
              }
            }
          >
            <Text style={
              {
                color:"white",
                fontWeight:"bold",
                letterSpacing: 1,
                fontSize: heightPercentageToDP(5)
              }
            }>
              Best <Text style={{color: "red"}}>Workouts</Text>
            </Text>
            <Text style={
              {
                color:"white",
                fontWeight:"bold",
                letterSpacing: 1,
                fontSize: heightPercentageToDP(5)
              }
            }>
              For you
            </Text>
          </Animated.View>
          <Animated.View
            entering={FadeInDown.delay(100).springify()}
            style={
              {
                marginBottom: heightPercentageToDP(4)
              }
            }
          >
            <TouchableOpacity
              onPress={()=>router.push('../home')}
              style={{
                height: heightPercentageToDP(7),
                width: widthPercentageToDP(80),
                backgroundColor: "red",
                display:"flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                borderRadius: 9999,
                borderWidth:2,
                borderColor:"white"
              }}
            >
              <Text 
                style={
                  {
                    color:"white",
                    fontWeight:"bold",
                    letterSpacing: 1,
                    fontSize: heightPercentageToDP(3)
                  }
                }
              >
                Get Started
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </LinearGradient>
      </View>
  );
}

const styles = StyleSheet.create({
  imageWelcome:{
    width: widthPercentageToDP(100),
    height:heightPercentageToDP(100),
    position: "absolute"
  },
  linearGrad: {
    display: "flex",
    justifyContent: "flex-end",
    paddingBottom: 12,
  },
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
