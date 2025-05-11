import { Box, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import { Button, ChoiceBox, Divider, List, ListItem, ModalDialog } from "@serendie/ui";
import { useState } from "react";

type Document = {
  id: number;
  filename: string;
  size: string;
  total_pages: number;
  date: string;
};

export default function SourcePanel() {
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [selectDocumentId, setSelectDocumentId] = useState<number>(-1);
  const [selectDocument, setSelectDocument] = useState<Document>({
    id: -1,
    filename: "",
    size: "0MB",
    total_pages: 0,
    date: ""
  });

  const mockFiles: Document[] = [
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
    <VStack w="100%" h="100%">
      {/* Header */}
      <HStack w="95%" py={8} textAlign="left">
        <Box whiteSpace="nowrap" style={{ maxWidth: "40%" }}>
          <h3>ソース</h3>
        </Box>

        <Spacer />

        <Box whiteSpace="normal" textAlign="right" style={{ maxWidth: "60%" }}>
          <p>ドキュメントを追加して分析</p>
        </Box>
      </HStack>

      <Divider />

      {/* Toolbar */}
      <VStack w="95%" py={4}>
        <HStack>
          <Button leftIcon={<SerendieSymbol name="file-upload" variant="outlined" />}>
            アップロード
          </Button>
        </HStack>
      </VStack>

      <Divider />

      {/* List */}
      <VStack w="95%">
        <List style={{ width: "100%" }}>
          {mockFiles.map((file) => (
            <HStack key={file.id}>
              <ListItem
                title={file.filename}
                description={file.size + "・" + file.total_pages}
                leftIcon={<SerendieSymbol name="file" variant="outlined" />}
                onClick={() => setSelectDocument(file)}
              />
              <Spacer />
              <ChoiceBox type="checkbox" value={String(file.id)} />
            </HStack>
          ))}
        </List>
      </VStack>

      <ModalDialog
        isOpen={selectDocumentId != -1}
        cancelButtonLabel="Close"
        onButtonClick={() => alert("A")}
        onOpenChange={() => setSelectDocumentId(-1)}
        submitButtonLabel="Button"
        title="Dialog Title"
      >
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
      </ModalDialog>
    </VStack>
  );
}
