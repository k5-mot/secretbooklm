import { VStack } from "@/styled-system/jsx";
import { ProgressIndicator } from "@serendie/ui";

export default function LoadingLayout() {
  return (
    <VStack h="100vh" w="100%" justifyContent="center" alignItems="center">
      <ProgressIndicator size="large" />
      <h1>Loading ...</h1>
    </VStack>
  );
}
