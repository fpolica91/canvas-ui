export const LambdaFormFields = {
  "configuration.name": {
    type: "text",
    placeholder: "Lambda Name",
  },
  "configuration.function_name": {
    type: "text",
    placeholder: "Lambda Function Name",
  },
  "configuration.runtime": {
    type: "text",
    placeholder: "Lambda Runtime",
  },
  "configuration.tags": {
    columns: 2,
    type: "array",
    placeholder: "Lambda Tags",
    min: 0,
    max: 5,
  },
};
