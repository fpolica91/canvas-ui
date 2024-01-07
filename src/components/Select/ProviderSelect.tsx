import { Image, HStack } from "@chakra-ui/react";
import { Select, SelectButton, SelectList, SelectOption } from "@saas-ui/react";
import { useMemo } from "react";
import { ProviderType } from "../../context/store/types";

export default function ProviderSelect({
  onProviderChange,
  defaultSelectValue,
}: {
  onProviderChange: (provider: ProviderType) => void;
  defaultSelectValue: ProviderType | null;
}) {
  const options = useMemo(() => {
    return [
      { provider: "aws", logo: "/aws_logo.svg" },
      { provider: "azure", logo: "/azure_ad.svg" },
    ];
  }, []);
  return (
    <Select
      name="provider"
      placeholder="Select a cloud provider"
      defaultValue={defaultSelectValue}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onChange={(value: ProviderType) => onProviderChange(value)}
    >
      <SelectButton />
      <SelectList>
        {options.map((option) => (
          <SelectOption value={option.provider} key={option.provider}>
            <HStack>
              <Image
                boxSize="2rem"
                borderRadius="full"
                src={option.logo}
                alt={option.provider}
                mr="12px"
              />
              <span>{option.provider}</span>
            </HStack>
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
}
