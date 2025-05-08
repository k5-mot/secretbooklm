import ChatPanel from "@/components/chat-panel";
import SourcePanel from "@/components/source-panel";
import StudioPanel from "@/components/studio-panel";
import { Grid, GridItem } from "../styled-system/jsx";

export default function NotebookLayout() {
  return (
    <Grid columns={4} px={4} py={4} gap={8} w="100%" h={"100vh"}>
      <GridItem colSpan={1} style={{ border: "1px solid black", borderRadius: "10px" }}>
        <SourcePanel />
      </GridItem>
      <GridItem colSpan={2} style={{ border: "1px solid black", borderRadius: "10px" }}>
        <ChatPanel />
      </GridItem>
      <GridItem colSpan={1} style={{ border: "1px solid black", borderRadius: "10px" }}>
        <StudioPanel />
      </GridItem>
    </Grid>
  );
}
