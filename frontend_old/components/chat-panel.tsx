import { Box, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import {
  // Button,
  Divider,
  IconButton
} from "@serendie/ui";
import { useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

export default function ChatPanel() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm your AI assistant. I can help you analyze your documents and answer questions. How can I help you today?",
      timestamp: new Date()
    },
    {
      id: "2",
      role: "user",
      content: "佐賀県の特産品は？",
      timestamp: new Date()
    },
    {
      id: "3",
      role: "assistant",
      content:
        "佐賀県の特産品には、佐賀牛、いちご（さがほのか）、有明海のり、唐津焼、佐賀の酒などがあります。特に佐賀牛は高級和牛として有名です。",
      timestamp: new Date()
    },
    {
      id: "4",
      role: "user",
      content: "佐賀牛の特徴は？",
      timestamp: new Date()
    },
    {
      id: "5",
      role: "assistant",
      content: "A",
      timestamp: new Date()
    },
    {
      id: "6",
      role: "user",
      content: "U",
      timestamp: new Date()
    },
    {
      id: "7",
      role: "assistant",
      content: "A",
      timestamp: new Date()
    },
    {
      id: "8",
      role: "user",
      content: "U",
      timestamp: new Date()
    },
    {
      id: "9",
      role: "assistant",
      content: "A",
      timestamp: new Date()
    },
    {
      id: "10",
      role: "user",
      content: "U",
      timestamp: new Date()
    },
    {
      id: "11",
      role: "assistant",
      content: "A",
      timestamp: new Date()
    },
    {
      id: "12",
      role: "user",
      content: "U",
      timestamp: new Date()
    }
    // {
    //   id: "13",
    //   role: "assistant",
    //   content: "A",
    //   timestamp: new Date()
    // },
    // {
    //   id: "14",
    //   role: "user",
    //   content: "U",
    //   timestamp: new Date()
    // }
  ]);

  return (
    <VStack w="100%" h="100%">
      {/* Header */}
      <HStack w="95%" py={8} textAlign="left">
        <Box whiteSpace="nowrap" style={{ maxWidth: "40%" }}>
          <h3>チャット</h3>
        </Box>

        <Spacer />

        <Box whiteSpace="normal" textAlign="right" style={{ maxWidth: "60%" }}>
          <p>質問を入力してください</p>
        </Box>
      </HStack>

      <Divider />

      {/* Chat history */}
      <Box
        w="100%"
        minH={"0"}
        flex="1"
        overflowY="auto"
        display="flex"
        flexDirection="column"
        flexGrow={1}
        position="relative"
        // maxH="50vh"
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "0" // これが重要: flexコンテナでスクロールするには必要
        }}
      >
        <VStack w="100%">
          {messages.map((message) => (
            <HStack
              key={message.id}
              w="90%"
              justifyContent={message.role === "user" ? "flex-end" : "flex-start"}
              py={2}
            >
              <Box
                bg={message.role === "user" ? "#E0F7FA" : "#FFEBEE"}
                borderRadius="8px"
                p={4}
                maxW="70%"
              >
                <p>{message.content}</p>
              </Box>
            </HStack>
          ))}
        </VStack>
      </Box>

      <Divider />

      {/* Chat Input */}
      <HStack w="95%" py={8}>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ask a question about your documents..."
          style={{
            height: 48,
            backgroundColor: "white",
            width: "100%",
            outlineStyle: "solid",
            outlineWidth: "1px",
            outlineColor: "#C8C7C2",
            borderRadius: "8px",
            placeContent: "center",
            padding: "0 16px"
          }}
        />
        <IconButton
          icon={<SerendieSymbol name="send" variant="filled" />}
          shape="rectangle"
          styleType="filled"
        />
      </HStack>
    </VStack>
  );
}
