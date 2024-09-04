import * as React from 'react'
import { TextInput, Button, View, ScrollView, StyleSheet, Text,TouchableOpacity } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen'


export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    console.log("HIHIHII")
    if (!isLoaded) {
      return
    }

    console.log("HIHIHII")
    
    try {
        const completeSignUp = await signUp.create(
        {
            firstName,
            lastName,
            emailAddress: emailAddress,
            password
        }
      )

      signUp.firstName = firstName;

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View>
      {!pendingVerification && (
        <ScrollView style={styles.container}>
          <View
            style={styles.inputContainer}
          >
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              onChangeText={(first) => setFirstName(first)}
              style={
                {
                  fontSize: widthPercentageToDP("4%")
                }
              }
            />
            <TextInput
              value={lastName}
              placeholder="Last Name..."
              onChangeText={(last) => setLastName(last)}
              style={
                {
                  fontSize: widthPercentageToDP("4%")
                }
              }
            />
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              onChangeText={(email) => setEmailAddress(email)}
              style={
                {
                  fontSize: widthPercentageToDP("4%")
                }
              }
            />
            <TextInput
              value={password}
              placeholder="Password..."
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={
                {
                  fontSize: widthPercentageToDP("4%")
                }
              }
            />
            <TouchableOpacity style={styles.button}
              onPress={onSignUpPress}
              >
                <Text style={styles.buttonText}>Sign up</Text>
              </TouchableOpacity>
          </View>
        </ScrollView>
      )}
      {pendingVerification && (
        <>
          <TextInput value={code} placeholder="Code..." onChangeText={(code) => setCode(code)} 
            style={
              {
                fontSize: widthPercentageToDP("4%")
              }
            }
            />
            <TouchableOpacity style={styles.button}
              onPress={onPressVerify}
              >
                <Text style={styles.buttonText}>Sign up</Text>
            </TouchableOpacity>
          {/* <Button title="Verify Email" onPress={onPressVerify} /> */}
        </>
      )}
    </View>
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