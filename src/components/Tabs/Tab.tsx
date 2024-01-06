import { Box, Tab } from "@chakra-ui/react";
import { SingleCanvas } from "../../context/store/types";

import { ToolBar } from "./Toolbar";
import { useState } from "react";

type CustomTabProps = {
  canvas: SingleCanvas;
  setCurrentCanvas: (id: string) => void;
};

export function CustomTab({ canvas, setCurrentCanvas }: CustomTabProps) {
  const [show, setShow] = useState(false);

  return (
    <Box pos="relative">
      {show && <ToolBar canvas={canvas} />}
      <Tab
        onContextMenu={() => setShow(!show)}
        // onBlur={() => setShow(false)}
        onClick={() => setCurrentCanvas(canvas.id)}
        bg="gray.700"
        fontSize="medium"
        key={canvas.id}
        fontWeight="semibold"
        color="gray.200"
      >
        {canvas.name}
      </Tab>
    </Box>
  );
}