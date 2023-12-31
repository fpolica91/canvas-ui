import {
  useDisclosure,
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Box,
  Image,
  Text,
  VStack,
  SimpleGrid,
  Select,
} from "@chakra-ui/react";
import { ProviderType, State } from "../types/store";
import useStore from "../context/Canvas";
import { BucketsSchema } from "../types/aws/storage/bucket";

const selector = (state: State) => ({
  createNode: state.createNode,
  handleProviderChange: state.onProviderChange,
  services: state.services,
  provider: state.provider,
});

export function SideBarDrawer() {
  const { createNode, services, handleProviderChange, provider } =
    useStore(selector);

  function handleCreateNode(type: string, name: string) {
    const bucket = {
      configuration: {
        bucket: "mybucktsito",
        tags: [
          { key: "Environment", value: "Dev" },
          { key: "Project", value: "ProjectX" },
        ],
      },
    };

    const data = {
      type: "buckets",
      buckets: [bucket],
    };

    const validatedData = BucketsSchema.safeParse(data);
    if (!validatedData.success) {
      console.log(validatedData.error, "error parsing data");
      return;
    }
    createNode(type, name, validatedData.data);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ServiceButton = ({
    service,
  }: {
    service: { name: string; icon: string; type: string };
  }) => (
    <Button
      w="100%"
      h="auto"
      p={2}
      borderWidth="1px"
      borderRadius="md"
      variant="outline"
      onClick={() => handleCreateNode(service.type, service.name)}
    >
      <VStack>
        <Image src={service.icon} boxSize="50px" alt={service.name} />
      </VStack>
    </Button>
  );

  const ServiceSection = ({
    title,
    items,
  }: {
    title: string;
    items: { name: string; icon: string; type: string }[];
  }) => (
    <Box my={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        {title}
      </Text>
      <SimpleGrid columns={3} spacing={4}>
        {items.map((service) => (
          <ServiceButton key={service.name} service={service} />
        ))}
      </SimpleGrid>
    </Box>
  );

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        Open AWS Services
      </Button>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">AWS Services</DrawerHeader>
          <DrawerBody>
            <Select
              value={provider}
              placeholder="Select provider"
              mb={4}
              onChange={(e) =>
                handleProviderChange(e.target.value as ProviderType)
              }
            >
              <option value="aws">Amazon Web Services (AWS)</option>
              <option value="gcp">Google Cloud Platform (GCP)</option>
              <option value="azure">Microsoft Azure</option>
            </Select>
            <ServiceSection title="Compute" items={services.compute} />

            <ServiceSection title="Storage" items={services.storage} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
