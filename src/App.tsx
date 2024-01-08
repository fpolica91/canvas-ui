import { SideBarDrawer } from "./components/Drawer";
import Flow from "./components/Flow";
import {
  Box,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  extendTheme,
} from "@chakra-ui/react";
import { Editors } from "./components/Editors";
import { useEffect } from "react";
import { v4 as uuid } from "uuid";
import { FiPlus } from "react-icons/fi";
import { SaasProvider, theme as baseTheme } from "@saas-ui/react";
import { ReactFlowProvider } from "reactflow";
import useStore from "./context/canvas";
import { SingleCanvas } from "./context/store/types";

function App() {
  const currentCanvas = useStore.use.currentCanvas();
  const canvases = useStore.use.canvases();
  const createCanvas = useStore.use.createCanvas();
  const setCurrentCanvas = useStore.use.setCurrentCanvas();

  useEffect(() => {
    if (!localStorage.getItem("canvasUserId")) {
      localStorage.setItem("canvasUserId", uuid());
    }
  }, []);

  const theme = extendTheme(
    {
      config: {
        initialColorMode: "dark",
        useSystemColorMode: true,
      },
    },
    baseTheme
  );

  return (
    <ReactFlowProvider>
      <SaasProvider theme={theme}>
        <Tabs variant="enclosed">
          <TabList>
            {canvases.map((canvas: SingleCanvas) => {
              return (
                <Tab
                  onClick={() => setCurrentCanvas(canvas.id)}
                  bg="gray.700"
                  fontSize="medium"
                  key={canvas.id}
                  fontWeight="semibold"
                  color="gray.200"
                >
                  {canvas.name}
                </Tab>
              );
            })}
            <Tab fontSize="medium" color="gray.200" onClick={createCanvas}>
              <FiPlus />
            </Tab>
          </TabList>
          <TabPanels>
            <Canvas key={currentCanvas} />
          </TabPanels>
        </Tabs>
      </SaasProvider>
    </ReactFlowProvider>
  );
}

function Canvas() {
  return (
    <ReactFlowProvider>
      <Box className="App" height="100vh">
        <Box position="relative" top="0" left="0" zIndex="overlay">
          <SideBarDrawer />
        </Box>
        <Flow />
        <Box position="absolute" top={0} right={0} width="33%" height="100%">
          <Editors />
        </Box>
      </Box>
    </ReactFlowProvider>
  );
}

export default App;
