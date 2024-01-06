import { Tabs, TabList, TabPanels, Tab, TabPanel, Box } from "@chakra-ui/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-terraform";
import "ace-builds/src-noconflict/theme-dracula";
import useStore from "../context/canvas";

import {
  TerraformSchemaType,
  getEditorString,
} from "../types/terraform/schema";
import { SingleCanvas } from "../context/store/types";

export function Editors() {
  const currentCanvasId = useStore.use.currentCanvas();
  const currentStore = useStore.use
    .canvases()!
    .find((canvas: SingleCanvas) => canvas.id === currentCanvasId);
  const terraform = currentStore!.terraform;
  const editors = ["provider", "main", "variables"] as const;

  return (
    <Box>
      <Tabs isFitted>
        <TabList border="none">
          {editors.map((name) => {
            return (
              <Tab
                fontSize="medium"
                border="none"
                key={name}
                fontWeight="semibold"
                color="gray.200"
              >
                {name}
              </Tab>
            );
          })}
        </TabList>
        <TabPanels>
          {editors.map((name) => {
            return <Editor terraform={terraform} name={name} key={name} />;
          })}
        </TabPanels>
      </Tabs>
    </Box>
  );
}

function Editor({
  terraform,
  name,
}: {
  terraform: TerraformSchemaType;
  name: "provider" | "main" | "variables";
}) {
  const terraformString = getEditorString(name, terraform);

  return (
    <TabPanel key={name}>
      <AceEditor
        mode="terraform"
        theme="dracula"
        name={`${name}.tf`}
        value={terraformString}
        readOnly={true}
        width="100%"
        tabSize={2}
        focus={true}
        height="100vh"
      />
    </TabPanel>
  );
}
