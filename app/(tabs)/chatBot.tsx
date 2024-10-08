// Importing useState
import { SignedIn, useUser } from "@clerk/clerk-expo";
import OpenAI from "openai";
import { useCallback, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import {OPENAI_API_KEY} from '@env'
import { heightPercentageToDP } from "react-native-responsive-screen";
//import "./App.css";

export default function ChatBot() {
    // Your OpenAI API key
    const API_KEY = OPENAI_API_KEY;
    // Setting the primary prompt as the initial state
    const [messages, setMessages] = useState([{}]);
    let id = 1;
    let id2 = 2;

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello, I am the fitness tracker bot',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Bot',
              avatar: require('@/assets/images/profileimages/robotExercising.png'),
            },
          },
        ])
      }, []);

    const [isTyping, setIsTyping] = useState(false);
    const {user} = useUser();

    const chatData = async (userMessage) => {
        try {
            const client = new OpenAI({apiKey: `${API_KEY}`});

            const responsey = await client.chat.completions.create({
                messages: [{ role: 'user', content: userMessage }],
                model: 'gpt-4o-mini'
            }).asResponse();
      
          if (!responsey.ok) {
            console.log(responsey.status)
            console.log("I AM RUNNING THIS")
            throw new Error("Oops! Something went wrong while processing your request.");
          }

          id++;
          id2++;
          const responseData = await responsey.json();
          //setIsTyping(false);
          const mess = [{
            _id: id,
            text: responseData.choices[0].message.content,
            createdAt: new Date(),
            user: {
              _id: id2,
              name: 'Bot',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }];

          console.log(id)

          setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, mess)
          );          
        } catch (error) {
          console.error("Error while fetching chat data:", error);
          setIsTyping(false);
        }
    };

    const onSend = useCallback((messagesy = []) => {
        const messageSent = messagesy[0]["text"]
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messagesy)
        );

        chatData(messageSent);

    }, []); 

    const len = user?.id.length

    return (
        <SignedIn>
            <View style={styles.header}>
              <Text style={styles.heading}>Chat with AI</Text>
            </View>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: len,
                }}
            />
        </SignedIn>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: heightPercentageToDP(7),
    flexDirection: "row",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingVertical: 8,
    backgroundColor: "#f2f8fc",
  },
  heading: {
    fontWeight: "500",
    paddingLeft: 16,
    fontSize: 20,
  },
});