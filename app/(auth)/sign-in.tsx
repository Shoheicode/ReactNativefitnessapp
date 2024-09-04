import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { Text, TextInput, Button, View,StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'
//import { TouchableOpacity } from 'react-native-gesture-handler'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
      //console.log("hi")
    }
  }, [isLoaded, emailAddress, password])

  return (
    <ScrollView style={styles.container}>
      <View
        style={styles.inputContainer}
      >
      <TextInput
        style={
          {
            fontSize: widthPercentageToDP("4%")
          }
        }
        autoCapitalize="none"
        value={emailAddress}
        placeholder="Email..."
        onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
      />
      <TextInput
        style={
          {
            fontSize: widthPercentageToDP("4%")
          }
        }
        value={password}
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={(password) => setPassword(password)}
        
      />
      <TouchableOpacity style={styles.button}
          onPress={onSignInPress}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        {/* <Button title="Sign In" onPress={onSignInPress} /> */}
        <View
          style={{
            marginTop:widthPercentageToDP(5),
          }}
        >
          <Text
            style={
              {
                fontSize: heightPercentageToDP("3")
              }
            }
          >Don't have an account?</Text>
          {/* <Link href="/sign-up">
            <Text>Sign up</Text>
          </Link> */}
          <TouchableOpacity style={styles.button}
          onPress={()=>router.push('/sign-up')}
          >
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    //alignItems: "center",
    //justifyContent: "space-around",
    padding: widthPercentageToDP("5%"),
    backgroundColor: "#fff",
  },
  inputContainer:{
    width: "100%",
    height: heightPercentageToDP(100),
    marginTop: heightPercentageToDP(8)
  },
  button: {
    backgroundColor: "#01a5fc",
    borderRadius: 25,
    padding: widthPercentageToDP("1%"),
    alignItems: "center",
    marginTop: heightPercentageToDP("2.5%"),
    //width: '100%',
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: heightPercentageToDP("3%"),
  }
})