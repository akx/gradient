import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import { HelpModal } from "./HelpModal";
import React from "react";
import { useColorStopsAPI } from "../hooks/useColorStopsAPI";
import { getRandomGradient } from "../examplePalettes";
import { reverseColorStops } from "../gradients/utils";

export function MainToolbar() {
  const helpDisco = useDisclosure();
  const csApi = useColorStopsAPI();
  const loadExample = React.useCallback(() => {
    csApi.replace(getRandomGradient());
  }, [csApi]);
  const reversePalette = React.useCallback(() => {
    csApi.replace(reverseColorStops(csApi.objects));
  }, [csApi]);
  return (
    <>
      <Box p={3}>
        <Flex>
          <ButtonGroup spacing={3}>
            <Button onClick={loadExample}>Random</Button>
            <Button onClick={reversePalette}>Reverse</Button>
          </ButtonGroup>
          <Spacer />
          <ButtonGroup spacing={3}>
            <Button onClick={helpDisco.onOpen}>Help</Button>
          </ButtonGroup>
        </Flex>
      </Box>
      <HelpModal open={helpDisco.isOpen} onClose={helpDisco.onClose} />
    </>
  );
}
