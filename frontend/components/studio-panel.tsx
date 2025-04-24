import { Container, HStack, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import { Button, List, ListItem, Search } from "@serendie/ui";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle
// } from "@/components/ui/card";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { File, FileText, Plus, Trash2, Upload } from "lucide-react";

export default function StudioPanel() {
  const mockStudioItems = [
    {
      id: 0,
      name: "Item 1",
      description: "Description 1"
    },
    {
      id: 1,
      name: "Item 2",
      description: "Description 2"
    }
  ];

  return (
    <Container>
      <VStack>
        <h2>Studio</h2>
        <p>アイテムを選択してください</p>
        <HStack>
          <Button>
            <SerendieSymbol name="file-upload" variant="outlined" />
          </Button>
          <Search items={[""]}></Search>
        </HStack>
      </VStack>

      <VStack>
        <List>
          {mockStudioItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.name}
              description={item.description}
            ></ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
}
