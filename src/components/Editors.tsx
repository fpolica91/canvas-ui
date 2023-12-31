import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-terraform";
import "ace-builds/src-noconflict/theme-dracula";
import useStore from "../context/canvas";
import { InfraCanvaState } from "../context/store/types";

import {
  TerraformSchemaType,
  getEditorString,
} from "../types/terraform/schema";

const selector = (state: InfraCanvaState) => ({
  terraformConfig: state.terraformString,
  terraform: state.terraform,
});

export function Editors() {
  const { terraform } = useStore(selector);
  const editors = ["provider", "main", "variables"] as const;

  return (
    <>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          {editors.map((name) => {
            return <Tab>{name}</Tab>;
          })}
        </TabList>
        <TabPanels>
          {editors.map((name) => {
            return <Editor terraform={terraform} name={name} />;
          })}
        </TabPanels>
      </Tabs>
    </>
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
        width="100%"
        height="90vh"
      />
    </TabPanel>
  );
}
