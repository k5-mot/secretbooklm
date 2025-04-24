import { Container, VStack } from "@/styled-system/jsx";
import { List, ListItem } from "@serendie/ui";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { File, FileText, Plus, Trash2, Upload } from "lucide-react";

export default function ChatPanel() {
  const mockChats = [
    {
      id: 0,
      message: "Hello, how can I help you?",
      sender: "user"
    },
    {
      id: 1,
      message: "I have a question about the project.",
      sender: "bot"
    }
  ];

  return (
    <Container>
      <VStack>
        <h2>チャット</h2>
        <p>質問を入力してください</p>
      </VStack>

      <VStack>
        <List>
          {mockChats.map((chat) => (
            <ListItem
              key={chat.id}
              title={chat.message}
              description={chat.sender}
            ></ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
}
