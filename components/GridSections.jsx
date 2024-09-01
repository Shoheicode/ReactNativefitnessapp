import { FlatList, Text } from "react-native";
import { View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";

const list = [
    "Chat Bot",
    "Saved Exercises",
    "Programs",
    "Sample Exercises"
]

export default function GridSections(){
    return (
        <View
            style={
                {
                    height: heightPercentageToDP(70),
                    display: "flex",
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
                keyExtractor={item=>item}
            >

            </FlatList>
        </View>
    )
}