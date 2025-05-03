import { Box, Container, Flex, HStack, Spacer, VStack } from "@/styled-system/jsx";
import { SerendieSymbol } from "@serendie/symbols";
import {
  // Button,
  Divider,
  IconButton,
  ProgressIndicator,
  TextField
} from "@serendie/ui";

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
      <VStack gap={4} px={8} py={4} textAlign="left" w="100%" h="95vh">
        <HStack gap={4} px={8} py={4} textAlign="left" w="100%">
          <Box whiteSpace="nowrap">
            <h2>チャット</h2>
          </Box>

          <Spacer />

          <VStack justify="right" w="fit-content" maxW="50%">
            <Box whiteSpace="normal" textAlign="right">
              <p>質問を入力してください</p>
            </Box>
          </VStack>
        </HStack>

        <Divider />

        <VStack flex={1} overflowY="auto">
          <VStack h="100vh" w="100%" justifyContent="center" alignItems="center">
            <ProgressIndicator size="large" />
            <h1>対話ログ</h1>
          </VStack>
        </VStack>

        <Divider />

        <HStack w="100%" gap={4} py={4} bgColor="blue">
          <Flex direction="row" align="center" style={{ width: "100%" }}>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Ask a question about your documents..."
              style={{ backgroundColor: "red", width: "100%" }}
            />
            {/* <TextField
              placeholder="プレースホルダー"
              width="100%"
              style={{ width: "100%" }}
            /> */}
          </Flex>

          <Box>
            <IconButton
              icon={<SerendieSymbol name="send" variant="filled" />}
              shape="rectangle"
              styleType="filled"
            />
          </Box>
        </HStack>

        <HStack w="100%" gap={4} py={4} bgColor="blue">
          <Flex direction="row" align="center" style={{ width: "100%" }}>
            <TextField
              placeholder="プレースホルダー"
              width="100%"
              style={{ width: "100%" }}
            />
          </Flex>
          <Box>
            <IconButton
              icon={<SerendieSymbol name="send" variant="filled" />}
              shape="rectangle"
              styleType="filled"
            />
          </Box>
        </HStack>
      </VStack>
      {/* <ScrollArea className="flex-1 p-4 h-[calc(100vh-280px)]">
        <div className="space-y-4 pb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex gap-3 max-w-[80%] ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <Avatar className="h-8 w-8">
                  {message.role === "user" ? (
                    <User className="h-5 w-5" />
                  ) : (
                    <Bot className="h-5 w-5" />
                  )}
                </Avatar>

                <div>
                  <Card
                    className={`p-3 ${message.role === "user" ? "bg-primary text-primary-foreground" : ""}`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </Card>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <span>{formatTime(message.timestamp)}</span>

                    {message.role === "assistant" && (
                      <div className="flex items-center gap-1 ml-2">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="h-8 w-8">
                  <Bot className="h-5 w-5" />
                </Avatar>

                <Card className="p-3">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <p className="text-sm">Thinking...</p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex gap-2"
        >
          <Input
            placeholder="Ask a question about your documents..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={!input.trim() || isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div> */}
    </Container>
  );
}
