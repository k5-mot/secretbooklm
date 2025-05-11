import { Box, HStack } from "@/styled-system/jsx";
import ChatPanel from "./chat-panel";
import SourcePanel from "./source-panel";
import StudioPanel from "./studio-panel";

export default function Notebook() {
  return (
    <Box w="100%" h="100vh" overflow="hidden">
      <HStack w="100%" h="100%" px="4" py="4">
        {/* Left column - Source Panel (1/4 width) */}
        <Box
          w="25%"
          h="100%"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          <SourcePanel />
        </Box>

        {/* Middle column - Chat Panel (1/2 width) */}
        <Box
          w="50%"
          h="100%"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          <ChatPanel />
        </Box>

        {/* Right column - Studio Panel (1/4 width) */}
        <Box
          w="25%"
          h="100%"
          style={{ border: "1px solid black", borderRadius: "10px" }}
        >
          <StudioPanel />
        </Box>
      </HStack>
    </Box>
  );
}
