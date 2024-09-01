import { StatusBar } from "expo-status-bar";
import { Button, Image, Text, View, StyleSheet } from "react-native";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import ImageSlider from "@/components/ImageSlider";
import { SignedIn, useUser, SignedOut, useAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import CoolSignInButton from "@/components/CoolSignInButton";
import GridSections from "@/components/GridSections"
import { Avatar } from '@rneui/themed';

export default function Home(){
    const size = 40

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
                    <SignedOut>
                        <CoolSignInButton
                        onPress={()=>router.push('/(auth)/sign-in')}
                        
                        />
                        <CoolSignInButton
                            onPress={()=>router.push('/(auth)/sign-in')}
                            title="Sign Up"
                        />
                    </SignedOut>
                    <SignedIn>
                        <Text
                            style={
                                {
                                    marginBottom: 10,
                                    fontSize:heightPercentageToDP(2)
                                }
                            }
                        >Welcome {user?.fullName}</Text>

                        <CoolSignInButton 
                            onPress={handleLogout}
                            title="Log Out"    
                        />
                    </SignedIn>
                </View>
            </View>

            {/*Image Slider */}
            <View
                style={
                    {
                        marginTop: 20,
                        height: widthPercentageToDP(70)
                    }
                }
            >
                <ImageSlider/>
            </View>

            <View
                style={
                    {
                        flex:1,
                        height: heightPercentageToDP(70)
                    }
                }
            >
                <GridSections/>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    placeholder: {
      backgroundColor: '#e1e1e1',
      borderRadius: 20,
    },
    iconContainer: {
      backgroundColor: '#4a90e2',
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  })

