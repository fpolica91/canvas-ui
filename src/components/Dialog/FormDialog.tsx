import { IconButton, useDisclosure } from "@chakra-ui/react";
import { FormDialog } from "@saas-ui/forms/zod";
import { FiSettings } from "react-icons/fi";
import { bucketSchemaFormValidator } from "../../constants/aws/types/storage/bucket";
import { BucketFormFields } from "./types/aws/s3";
import useStore from "../../context/canvas";
import { Node } from "reactflow";

export function FormModal({ data }: { data: Node }) {
  const onNodeDataChange = useStore.use.onNodeDataChange();
  const disclosure = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Configuration"
        icon={<FiSettings />}
        onClick={() => disclosure.onOpen()}
      />

      <FormDialog
        title="Bucket Configuration"
        schema={bucketSchemaFormValidator}
        {...disclosure}
        fields={BucketFormFields as never}
        onSubmit={async (d) => {
          await onNodeDataChange(data, d);
          disclosure.onClose();
        }}
      />
    </>
  );
}
