import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View } from "react-native";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ImageSlider from "@/components/ImageSlider";
import { SignedIn, useUser, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function Home(){

    const { user } = useUser()
    const { signOut } = useAuth()

    const handleLogout = async () => {
        try {
          await signOut();
          // You can add additional logic here, such as navigation to a login screen
          console.log('User logged out successfully');
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

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
                            marginTop: 0.5,
                        }
                    }
                >
                    <Image source={require('@/assets/images/exerciseImages/avatar.png')}
                        style={
                            {
                                height: heightPercentageToDP(6),
                                width: heightPercentageToDP(6),
                                borderRadius: 9999,
                                marginTop: 0.5,
                            }
                        }
                    />

                    <View
                        style={
                            {
                                backgroundColor: "light-grey",
                                borderRadius: 9999,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderWidth:3,
                                borderColor: "#bababa",
                                marginTop: 5,
                                height:heightPercentageToDP(5.5),
                                width:heightPercentageToDP(5.5)
                            }
                        }
                    >
                        <Ionicons name="notifications" size={30} color="grey"/>
                    </View>
                </View>
            </View>

            {/*Image Slider */}
            <View
                style={
                    {
                        marginTop: 20,
                    }
                }
            >
                <ImageSlider/>
            </View>

            <View>
            <SignedIn>
                <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
                {/* <UserButton/> */}
                <Button 
                    onPress={handleLogout}
                    title="Log Out"    
                />
            </SignedIn>
            <SignedOut>
                <Link href="/(auth)/sign-in">
                <Text>Sign In</Text>
                </Link>
                <Link href="/(auth)/sign-up">
                <Text>Sign Up</Text>
                </Link>
            </SignedOut>
            </View>
        </SafeAreaView>
    )
}