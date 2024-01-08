import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiLock, FiCopy, FiTrash, FiUnlock } from "react-icons/fi";
import { FormModal } from "../Dialog/FormDialog";
import { Node } from "reactflow";
import useStore from "../../context/canvas";

interface BaseToolbarProps {
  data: Node;
}

export function BaseToolbar({ data }: BaseToolbarProps) {
  const bg = useColorModeValue("gray.100", "gray.700"); // Adjust the color mode based on the theme
  const deattachNodeFromParent = useStore.use.onDeattachFromParent();
  const deleteNode = useStore.use.deleteNode();

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      gap={2}
      alignItems="center"
      bg={bg}
      px={2}
      py={0.5}
      borderRadius="md"
    >
      <IconButton
        aria-label="Unlock"
        icon={<FiUnlock />}
        onClick={() => deattachNodeFromParent(data.id)}
      />
      <IconButton aria-label="Lock" icon={<FiLock />} />
      <IconButton aria-label="Copy" icon={<FiCopy />} />

      <FormModal data={data} />

      <IconButton
        aria-label="delete"
        icon={<FiTrash />}
        color={"red"}
        onClick={() => deleteNode(data.id)}
      />
    </Box>
  );
}
