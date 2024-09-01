import React, { useState } from "react";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { Text, View, Image, FlatList } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, { useAnimatedRef } from "react-native-reanimated";

export default function ImageSlider(){
    const sliderImages = [
        require('../assets/images/exerciseImages/slide1.png'),
        require('../assets/images/exerciseImages/slide2.png'),
        require('../assets/images/exerciseImages/slide3.png'),
        require('../assets/images/exerciseImages/slide4.png'),
        require('../assets/images/exerciseImages/slide5.png'),
    ]

    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    return (
        
        <Carousel
            width={widthPercentageToDP(100)}
            height={widthPercentageToDP(70)}
            loop={true}
            autoPlay={true}
            data={sliderImages}
            renderItem={SliderItem}
            autoPlayInterval={4000}
            mode="parallax"
            modeConfig={{
                parallaxScrollingScale: 0.9,
                parallaxScrollingOffset: 50,
            }}
        />
        // <FlatList
        //     ref={ref}
        //     data={sliderImages}
        //     renderItem={({item, index})=> <SliderItem item={item} index={index}/>}
        //     horizontal
        //     showsVerticalScrollIndicator={false}
        //     pagingEnabled
            
        // >

        // </FlatList>
        
    )
}

const SliderItem = ({item, index})=>{
    return (
        <View
            style={
                {
                    width: widthPercentageToDP(100),
                    height: widthPercentageToDP(70),
                    display:"flex",
                    alignItems:"center"
                }
            } 
        >
            
            <Image 
                source={item} 
                style={
                    {
                        width: widthPercentageToDP(100),
                        height: widthPercentageToDP(70),
                        borderRadius: 25
                    }
                }
                    
            />
        </View>
    )
}