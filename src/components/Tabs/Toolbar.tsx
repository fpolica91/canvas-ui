import { Box, IconButton } from "@chakra-ui/react";
import { FiTrash, FiSave } from "react-icons/fi";
import useStore from "../../context/canvas";
import { SingleCanvas } from "../../context/store/types";

export function ToolBar({ canvas }: { canvas: SingleCanvas }) {
  const deleteCanvas = useStore.use.deleteCanvas();
  const saveCanvas = useStore.use.saveCanvas();

  return (
    <Box
      border="1px solid"
      borderColor="gray.600"
      right={0}
      zIndex={1}
      top={10}
      display="flex"
      justifyContent="space-around"
      gap={2}
      pos="absolute"
      alignItems="center"
      p={2}
      borderRadius="md"
    >
      <IconButton
        variant="outline"
        aria-label="save"
        fontWeight="bold"
        onClick={saveCanvas}
        icon={<FiSave size={20} />}
      />
      <IconButton
        variant="outline"
        aria-label="delete"
        onClick={() => deleteCanvas(canvas.id)}
        icon={<FiTrash size={20} />}
      />
    </Box>
  );
}
