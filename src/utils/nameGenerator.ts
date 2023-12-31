import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";

export function generateName() {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
  });
}
