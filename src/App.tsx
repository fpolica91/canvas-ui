import { SideBarDrawer } from "./components/Drawer";
import Flow from "./components/Flow";
import { ChakraProvider, Box } from "@chakra-ui/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-terraform";
import "ace-builds/src-noconflict/theme-monokai";
import { State } from "./types/store";
import useStore from "./context/Canvas";

const selector = (state: State) => ({
  terraformConfig: state.terraformString,
});
function App() {
  const { terraformConfig } = useStore(selector);
  return (
    <ChakraProvider>
      <Box className="App" height="100vh" position="relative">
        <Box position="absolute" top="0" left="0" zIndex="overlay">
          <SideBarDrawer />
        </Box>
        <Flow />
        <Box position="absolute" top={0} right={0} width="33%" height="100%">
          <AceEditor
            mode="terraform"
            theme="monokai"
            name="ace-editor"
            readOnly={true}
            width="100%"
            height="100%"
            value={terraformConfig}
          />
        </Box>
      </Box>
    </ChakraProvider>
  );
}

export default App;
