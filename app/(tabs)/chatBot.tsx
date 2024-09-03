// Importing useState
import { SignedIn, useUser } from "@clerk/clerk-expo";
import { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
//import "./App.css";

export default function ChatBot() {
    // Your OpenAI API key
    const API_KEY = process.env.OPENAI_API_KEY;
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
            console.log(`${API_KEY}`)
          const response = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [...messages, { role: "user", content: userMessage }],
                temperature: 0.7,
              }),
            }
          );

          console.log("HIHIHIHI")
      
          if (!response.ok) {
            console.log("I AM RUNNING THIS")
            throw new Error("Oops! Something went wrong while processing your request.");
          }
      
          const responseData = await response.json();
          setIsTyping(false);
          setMessages((prevMessages) => [
            ...prevMessages,
            {
              role: "assistant",
              content: responseData.choices[0].message.content,
            },
          ]);
        } catch (error) {
          console.error("Error while fetching chat data:", error);
          setIsTyping(false);
        }
    };

    const handleSendMessage = (messageContent =[]) => {
        console.log(messageContent)
        setMessages((previousMessages) =>
            GiftedChat.append(previousMessages, messages)
        );
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   { 
        //     _id: user?.id,
        //     text: messageContent["text"],
        //     createdAt: new Date(),
        //     user: {
        //       _id: user?.id,
        //       name: 'Hello',
        //       avatar: 'https://placeimg.com/140/140/any',
        //     },
        //     },
        // ]);

        //chatData(messageContent);
    };

    const onSend = useCallback((messages = []) => {
        const messageSent = messages[0]["text"]
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );

        chatData(messageSent);

    }, []); 


    return (
        <SignedIn>
            <GiftedChat
                messages={messages}
                onSend={newMessages => onSend(newMessages)}
                user={{
                    _id: 1,
                }}
            />
        </SignedIn>
    );
}