// Importing useState
import { useState } from "react";
import { Text, View } from "react-native";
import { GiftedChat } from 'react-native-gifted-chat';
//import "./App.css";

export default function ChatBot() {
    // Your OpenAI API key
    const API_KEY = process.env.OPENAI_API_KEY;
    // Setting the primary prompt as the initial state
    const [messages, setMessages] = useState([
    {
    role: "system",
    content:
    "You're like a grammar-checking wizard, helping users fix grammar bloopers and jazz up their sentence structures.",
    },
    ]);

    const [isTyping, setIsTyping] = useState(false);



    const chatData = async (userMessage) => {
        try {
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
      
          if (!response.ok) {
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

    const handleSendMessage = (messageContent) => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: "user", content: messageContent },
        ]);

        chatData(messageContent);

        setIsTyping(true);
    };


    return (
        <GiftedChat
            messages={messages}
            onSend={newMessages => handleSendMessage(newMessages)}
            user={{
            _id: 1,
            }}
        />
    );
}