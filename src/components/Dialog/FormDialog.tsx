/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, useDisclosure } from "@chakra-ui/react";
import {
  FormDialog,
  FormLayout,
  ArrayFieldRowContainer,
  ArrayFieldRowFields,
  ArrayFieldContainer,
  ArrayFieldRows,
  ArrayFieldAddButton,
  ArrayFieldRemoveButton,
} from "@saas-ui/react";
import useStore from "../../context/canvas";
import { Heading } from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import { getNodeFormConfiguration } from "../../utils/getFormConfiguration";
import { z } from "zod";

export function FormModal({ data }: { data: z.infer<z.ZodAny> }) {
  const onNodeDataChange = useStore.use.onNodeDataChange();
  const formData = getNodeFormConfiguration(
    data.serviceInfo.provider,
    data.serviceInfo.type
  );

  const fields = Array.from(Object.keys(formData.fields)).map((key) => {
    const field = formData.fields[key];
    return {
      ...field,
      name: key,
    };
  });

  const switchFields = fields.filter((field) => field.type === "switch");
  const selectFields = fields.filter((field) => field.type === "select");
  const textFields = fields.filter((field) => field.type === "text");
  const arrayFields = fields.filter((field) => field.type === "array");

  const disclosure = useDisclosure();
  const onSubmit = async (nodeData: any) => {
    console.log(JSON.stringify(nodeData, null, 2));
    await onNodeDataChange(data, nodeData);

    disclosure.onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Configuration"
        icon={<FiSettings />}
        onClick={() => disclosure.onOpen()}
      />
      <FormDialog
        schema={formData.schema}
        fields={formData.fields}
        title="Configure your service"
        {...disclosure}
        onSubmit={onSubmit}
      >
        {({ Field }) => (
          <>
            <FormLayout my={4}>
              {textFields.map((field, i) => {
                return (
                  <Field
                    name={field.name}
                    label={field.label}
                    key={String(i)}
                  />
                );
              })}
              {selectFields.map((field, i) => {
                return (
                  <Field
                    key={String(i)}
                    name={field.name}
                    label={field.label}
                    options={field.options}
                  />
                );
              })}

              {switchFields.map((field, i) => {
                return (
                  <Field
                    name={field.name}
                    label={field.label}
                    key={String(i)}
                  />
                );
              })}
            </FormLayout>
            {arrayFields.map((arrayField, i) => {
              return (
                <>
                  <Heading size="md" mt="4" key={String(i)}>
                    {arrayField.title}
                  </Heading>

                  <FormLayout my={6} key={arrayField.name}>
                    <ArrayFieldContainer
                      name={arrayField.name}
                      label={arrayField.label}
                      key={arrayField.name}
                      min={2}
                      max={4}
                    >
                      <ArrayFieldRows>
                        {(fields) => (
                          <>
                            {fields.map((field, i) => {
                              return (
                                <ArrayFieldRowContainer
                                  key={field.id}
                                  index={i}
                                >
                                  <ArrayFieldRowFields
                                    columns={arrayField.columns}
                                    spacing={2}
                                  >
                                    {arrayField.properties !== undefined && (
                                      <>
                                        <Field
                                          name={`${arrayField.name}.${i}.key`}
                                          placeholder="Key"
                                        />
                                        <Field
                                          name={`${arrayField.name}.${i}.value`}
                                          placeholder="Value"
                                        />
                                      </>
                                    )}
                                    {arrayField.properties === undefined &&
                                      arrayField.items === undefined && (
                                        <Field
                                          name={`${arrayField.name}.`}
                                          placeholder="Value"
                                        />
                                      )}

                                    {arrayField.items?.map((item: any) => {
                                      if (item && item.type === "array") {
                                        return (
                                          <Field
                                            key={item.name}
                                            name={item.name}
                                            placeholder={item.label}
                                          />
                                        );
                                      }
                                    })}
                                  </ArrayFieldRowFields>
                                  <ArrayFieldRemoveButton />
                                </ArrayFieldRowContainer>
                              );
                            })}
                          </>
                        )}
                      </ArrayFieldRows>
                      <ArrayFieldAddButton />
                    </ArrayFieldContainer>
                  </FormLayout>
                </>
              );
            })}
          </>
        )}
      </FormDialog>
    </>
  );
}
