import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FormDialog } from "@saas-ui/forms/zod";
import { FiSettings } from "react-icons/fi";
import useStore from "../../context/canvas";
import { getNodeFormConfiguration } from "../../utils/getFormConfiguration";
import { z } from "zod";

export function FormModal({ data }: { data: z.infer<z.ZodAny> }) {
  const onNodeDataChange = useStore.use.onNodeDataChange();
  const disclosure = useDisclosure();

  const formData = getNodeFormConfiguration(
    data.serviceInfo.provider,
    data.serviceInfo.type
  );

  return (
    <>
      <IconButton
        aria-label="Configuration"
        icon={<FiSettings />}
        onClick={() => disclosure.onOpen()}
      />

      <FormDialog
        title="Bucket Configuration"
        schema={formData.schema}
        {...disclosure}
        fields={formData.fields}
        onSubmit={async (d) => {
          await onNodeDataChange(data, d);
          disclosure.onClose();
        }}
      />
    </>
  );
}
