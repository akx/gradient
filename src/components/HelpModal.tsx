import {
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Box,
  Link,
} from "@chakra-ui/react";
import React from "react";

function HelpContent() {
  return (
    <ul>
      <li>Double-click on the stop slider to add new stops</li>
      <li>Stops can be dragged on the slider too</li>
      <li>
        <Link
          color="teal.500"
          isExternal
          href="https://github.com/akx/gradient"
        >
          Open source
        </Link>
      </li>
    </ul>
  );
}

export function HelpModal({
  onClose,
  open,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Help</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box p={4}>
            <HelpContent />
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
