// Importing useState
import { SignedIn, useUser } from "@clerk/clerk-expo";
import OpenAI from "openai";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
import {OPENAI_API_KEY} from '@env'
//import "./App.css";

export default function ChatBot() {
    // Your OpenAI API key
    const API_KEY = OPENAI_API_KEY;
    // Setting the primary prompt as the initial state
    const [messages, setMessages] = useState([{}]);

    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello, I am the fitness tracker bot',
            createdAt: new Date(),
            user: {
              _id: 3,
              name: 'Bot',
              avatar: 'https://placeimg.com/140/140/any',
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
      
          const responseData = await responsey.json();
          //setIsTyping(false);
          const mess = [{
            _id: 4,
            text: responseData.choices[0].message.content,
            createdAt: new Date(),
            user: {
              _id: 5,
              name: 'User',
              avatar: 'https://placeimg.com/140/140/any',
            },
          }];

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


    return (
        <SignedIn>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: 2,
                }}
            />
        </SignedIn>
    );
}