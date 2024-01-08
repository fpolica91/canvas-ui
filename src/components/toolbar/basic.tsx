import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiLock, FiCopy, FiTrash, FiUnlock } from "react-icons/fi";
import { FormModal } from "../Dialog/FormDialog";
import { Node } from "reactflow";

interface BaseToolbarProps {
  onDeleteAction?: () => unknown;
  data: Node;
  deattachNodeFromParent: () => void;
}

export function BaseToolbar({
  onDeleteAction,
  deattachNodeFromParent,
  data,
}: BaseToolbarProps) {
  const bg = useColorModeValue("gray.100", "gray.700"); // Adjust the color mode based on the theme

  const handleRemove = () => {
    onDeleteAction && onDeleteAction();
  };

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
        onClick={deattachNodeFromParent}
      />
      <IconButton aria-label="Lock" icon={<FiLock />} />
      <IconButton aria-label="Copy" icon={<FiCopy />} />

      <FormModal data={data} />

      <IconButton
        aria-label="delete"
        icon={<FiTrash />}
        color={"red"}
        onClick={() => handleRemove()}
      />
    </Box>
  );
}
