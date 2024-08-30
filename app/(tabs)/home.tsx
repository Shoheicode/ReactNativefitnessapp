import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home(){
    return (
        <SafeAreaView>
            <StatusBar style="dark" />
            {/* punchline and avatar*/}
            <View
                style={
                    {
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginLeft: 20,
                        marginRight: 20,
                    }
                }
            >
                <View
                    style={
                        {
                            marginTop: 0.5,
                        }
                    }
                >
                    <Text
                        style={{
                            fontSize: heightPercentageToDP(4.5),
                            fontWeight: "bold",
                            color: "grey",
                            letterSpacing: 1,
                            marginTop: 0.5,
                        }}
                    >
                        READY TO
                    </Text>
                    <Text
                        style={{
                            fontSize: heightPercentageToDP(4.5),
                            fontWeight: "bold",
                            color: "red",
                            letterSpacing: 1,
                            marginTop: 0.5,
                        }}
                    >
                        WORKOUT
                    </Text>

                </View>
                <View
                    style={
                        {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }
                    }
                >
                    <Image source={require('@/assets/images/exerciseImages/avatar.png')}
                        style={
                            {
                                height: heightPercentageToDP(6),
                                width: heightPercentageToDP(6),
                                borderRadius: 9999,
                            }
                        }
                    />
                    <View>
                        
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}