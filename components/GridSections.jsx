import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { FlatList, Text, TouchableOpacity,Image } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";

const list = [
    {
        name: "Chat Bot",
        source: require("../assets/images/profileimages/robotExercising.png"),
        route: '/(tabs)/chatBot',
    },
    {
        name: "Saved Exercises",
        source: require("../assets/images/exerciseImages/back.png"),
        route: '/(tabs)/savedExercises',
    },
    {
        name: "Programs",
        source: require("../assets/images/exerciseImages/back.png"),
        route: '/(tabs)/savedExercises',
    },
    {
        name: "Sample Exercises",
        source: require("../assets/images/exerciseImages/back.png"),
        route: '/(tabs)/savedExercises',
    }
]

export default function GridSections(){
    return (
        <View
            style={
                {
                    height: heightPercentageToDP(50),
                    display: "flex",
                    //flex: auto,
                    //width: widthPercentageToDP(100)
                    marginLeft: widthPercentageToDP(3),
                    marginRight: widthPercentageToDP(3)
                }
            }
        >
            <Text
                style={
                    {
                        fontSize: heightPercentageToDP(3)
                    }
                }
            >
                Options:
            </Text>

            <FlatList
                data={list}
                numColumns={2}
                keyExtractor={item=>item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom:50, paddingTop: 20}}
                columnWrapperStyle={{
                    justifyContent:"space-between"
                }}
                renderItem={({item, index}) => <GridCard index = {index} item = {item}/>}
            />
        </View>
    )
}

const GridCard = ({index, item})=>{
    return (
        <View>
            <TouchableOpacity
                style={
                    {
                        width:widthPercentageToDP(44),
                        height: widthPercentageToDP(52),
                        display: "flex",
                        justifyContent: "flex-end",
                        marginTop: heightPercentageToDP(2)
                    }
                }
                onPress={()=> router.push(item.route)}
            >
                <Image
                    source={item.source}
                    style={
                        {
                            width:widthPercentageToDP(44),
                            height: widthPercentageToDP(52),
                            borderRadius: 40,
                            position:"absolute",
                        }
                    }
                    resizeMode="cover"
                />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    style={{
                        width: widthPercentageToDP(44), 
                        height: heightPercentageToDP(15),
                        position: "absolute",
                        bottom: 0,
                        borderRadius: 40
                    }}
                    start={{x: 0, y:0}}
                    end={{x: 0, y:1}}
                    
                />
                <Text
                    style={
                        {
                            color:"white",
                            fontSize:heightPercentageToDP(2.3),
                            fontWeight:"bold",
                            textAlign:"center"
                        }
                    }
                >
                    {item.name}
                </Text>
            </TouchableOpacity>
        </View>
    )
}