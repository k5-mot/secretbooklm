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

export default function SourcePanel() {
  const mockFiles = [
    {
      id: 0,
      filename: "プロジェクト計画書.pdf",
      size: "2MB",
      total_pages: 10,
      date: "2024/4/22"
    },
    {
      id: 1,
      filename: "研究論文.pdf",
      size: "1.5MB",
      total_pages: 8,
      date: "2024/4/20"
    },
    {
      id: 2,
      filename: "データ分析.xlsx",
      size: "500KB",
      total_pages: 3,
      date: "2024/4/18"
    }
  ];

  return (
    <Container>
      <VStack>
        <h2>ソース</h2>
        <p>ドキュメントを追加して分析</p>
        <HStack>
          <Button>
            <SerendieSymbol name="file-upload" variant="outlined" />
          </Button>
          <Search items={[""]}></Search>
        </HStack>
      </VStack>

      <VStack>
        <List>
          {mockFiles.map((file) => (
            <ListItem
              key={file.id}
              title={file.filename}
              description={file.size + "・" + file.total_pages}
              leftIcon={<SerendieSymbol name="file" variant="outlined" />}
            ></ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
}
