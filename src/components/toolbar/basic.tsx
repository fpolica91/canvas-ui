import { Box, IconButton, useColorModeValue } from "@chakra-ui/react";
import { FiLock, FiCopy, FiCloud, FiTrash } from "react-icons/fi";


interface BaseToolbarProps {
  onDeleteAction?: () => unknown;
}

export function BaseToolbar({ onDeleteAction }: BaseToolbarProps) {
  const bg = useColorModeValue("gray.100", "gray.700"); // Adjust the color mode based on the theme

  const handleRemove = () => {
    onDeleteAction && onDeleteAction()
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
      <IconButton aria-label="Lock" icon={<FiLock />} />
      <IconButton aria-label="Copy" icon={<FiCopy />} />
      <IconButton aria-label="Configuration" icon={<FiCloud />} />
      <IconButton aria-label="delete" icon={<FiTrash />} color={'red'} onClick={() => handleRemove()} />
    </Box>
  );
}
