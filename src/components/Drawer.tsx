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
} from "@chakra-ui/react";
import { State } from "../types/store";
import useStore from "../context/Canvas";

const selector = (state: State) => ({
  createNode: state.createNode,
  handleProviderChange: state.onProviderChange,
  services: state.services,
});

export function SideBarDrawer() {
  const { createNode, services } = useStore(selector);

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
      onClick={() => createNode(service.type, service.name)}
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
            <ServiceSection title="Compute" items={services.compute} />

            <ServiceSection title="Storage" items={services.storage} />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
