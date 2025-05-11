import { Box, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import { Button, Divider, List, ListItem, Search } from "@serendie/ui";
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
      name: "Item 1aaaaaaaaaaaaaaaaaaaaaaa",
      description: "Description 1"
    },
    {
      id: 1,
      name: "Item 2",
      description: "Description 2"
    }
  ];

  return (
    <VStack w={"100%"} h={"100%"}>
      {/* Header */}
      <HStack w="95%" py={8} textAlign="left">
        <Box whiteSpace="nowrap" style={{ maxWidth: "40%" }}>
          <h3>Studio</h3>
        </Box>

        <Spacer />

        <Box whiteSpace="normal" textAlign="right" style={{ maxWidth: "60%" }}>
          <p>アイテムを選択してください</p>
        </Box>
      </HStack>

      <Divider />

      {/* Toolbar */}
      <HStack w="95%" py={4}>
        <Button>
          <SerendieSymbol name="file-upload" variant="outlined" />
        </Button>
        <Search items={[""]}></Search>
      </HStack>

      <Divider />

      {/* Content */}
      <VStack w="95%">
        <List style={{ width: "100%" }}>
          {mockStudioItems.map((item) => (
            <ListItem
              key={item.id}
              title={item.name}
              description={item.description}
              leftIcon={<SerendieSymbol name="file" variant="outlined" />}
            />
          ))}
        </List>
      </VStack>
    </VStack>
  );
}
