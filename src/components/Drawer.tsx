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
import { CreateNodeType, ProviderType } from "../context/store/types";
import useStore from "../context/canvas";
import { InfraCanvaState } from "../context/store/types";

const selector = (state: InfraCanvaState) => ({
  createNode: state.createNode,
  handleProviderChange: state.onProviderChange,
  services: state.services,
  provider: state.provider,
});

export function SideBarDrawer() {
  const { createNode, services, handleProviderChange, provider } =
    useStore(selector);

  function handleCreateNode(service: {
    name: string;
    icon: string;
    type: string;
    tag: string;
    provider: string;
  }) {
    createNode(service);
  }

  const { isOpen, onOpen, onClose } = useDisclosure();

  const ServiceButton = ({ service }: { service: CreateNodeType }) => (
    <Button
      w="100%"
      h="auto"
      p={2}
      borderWidth="1px"
      borderRadius="md"
      variant="outline"
      onClick={() => handleCreateNode(service)}
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
    items: CreateNodeType[];
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
