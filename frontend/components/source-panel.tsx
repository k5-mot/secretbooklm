import { Box, Container, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import { Button, ChoiceBox, Divider, List, ListItem } from "@serendie/ui";

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
      <HStack gap={4} px={8} py={4} textAlign="left" w="100%">
        <Box whiteSpace="nowrap">
          <h2>ソース</h2>
        </Box>

        <Spacer />

        <VStack justify="right" w="fit-content" maxW="50%">
          <Box whiteSpace="normal" textAlign="right">
            <p>ドキュメントを追加して分析</p>
          </Box>
        </VStack>
      </HStack>

      <Divider />

      <VStack gap={4} py={4} w="100%">
        <HStack>
          <Button leftIcon={<SerendieSymbol name="file-upload" variant="outlined" />}>
            アップロード
          </Button>
        </HStack>
      </VStack>

      <Divider />

      <VStack w="100%">
        <List style={{ width: "95%" }}>
          {mockFiles.map((file) => (
            <HStack key={file.id}>
              <ListItem
                title={file.filename}
                description={file.size + "・" + file.total_pages}
                leftIcon={<SerendieSymbol name="file" variant="outlined" />}
              />
              <Spacer />
              <ChoiceBox type="checkbox" value={String(file.id)} />
            </HStack>
          ))}
        </List>
      </VStack>
    </Container>
  );
}
