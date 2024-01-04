import { SideBarDrawer } from "./components/Drawer";
import Flow from "./components/Flow";
import { Box, extendTheme } from "@chakra-ui/react";
import { Editors } from "./components/Editors";
import { useEffect } from "react";
import useStore from "./context/canvas";
import { SaasProvider, theme as baseTheme } from "@saas-ui/react";

function App() {
  const setInitialTerraformState = useStore.use.setInitialTerraformState();

  useEffect(() => {
    setInitialTerraformState();
  }, []);

  const theme = extendTheme(
    {
      initialColorMode: "dark",
    },
    baseTheme
  );

  return (
    <SaasProvider theme={theme}>
      <Box className="App" height="100vh">
        <Box position="relative" top="0" left="0" zIndex="overlay">
          <SideBarDrawer />
        </Box>
        <Flow />
        <Box position="absolute" top={0} right={0} width="33%" height="100%">
          <Editors />
        </Box>
      </Box>
    </SaasProvider>
  );
}

export default App;
