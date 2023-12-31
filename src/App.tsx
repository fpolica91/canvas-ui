import { SideBarDrawer } from "./components/Drawer";
import Flow from "./components/Flow";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Editors } from "./components/Editors";
import { useEffect } from "react";

import useStore from "./context/canvas";

function App() {
  const setInitialTerraformState = useStore.use.setInitialTerraformState();

  useEffect(() => {
    setInitialTerraformState();
  }, []);

  return (
    <ChakraProvider>
      <Box className="App" height="100vh" position="relative">
        <Box position="absolute" top="0" left="0" zIndex="overlay">
          <SideBarDrawer />
        </Box>
        <Flow />
        <Box position="absolute" top={0} right={0} width="33%" height="100%">
          <Editors />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
