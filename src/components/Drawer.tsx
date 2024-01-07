import {
  Button,
  IconButton,
  Image,
  useDisclosure,
  VStack,
  Grid,
  Text,
} from "@chakra-ui/react";
import {
  AppShell,
  Sidebar,
  SidebarSection,
  SidebarOverlay,
  NavGroup,
} from "@saas-ui/react";

import { FiChevronsRight, FiChevronsLeft } from "react-icons/fi";
import useStore from "../context/canvas";
import {
  CreateNodeType,
  ProviderType,
  SingleCanvas,
} from "../context/store/types";
import ProviderSelect from "./Select/ProviderSelect";

export function SideBarDrawer() {
  const currentCanvasId = useStore.use.currentCanvas();

  const currentStore = useStore.use
    .canvases()!
    .find((c: SingleCanvas) => c.id === currentCanvasId);

  const services = currentStore!.services;

  const createNode = useStore.use.createNode();
  const onProviderChange = useStore.use.onProviderChange();

  const { isOpen, onToggle } = useDisclosure();
  const ServiceButton = ({ service }: { service: CreateNodeType }) => (
    <Button
      w="100%"
      h="auto"
      p={1}
      borderWidth="1px"
      borderRadius="md"
      variant="outline"
      onClick={() => createNode(service)}
    >
      <VStack>
        <Image src={service.icon} boxSize="50px" alt={service.name} />
        <Text mt={1} fontSize={8.5} px={"50px"}>
          {service.name}
        </Text>
      </VStack>
    </Button>
  );

  function ServiceSection({
    title,
    items,
  }: {
    title: string;
    items: CreateNodeType[];
  }) {
    return (
      <SidebarSection aria-label="Main">
        <NavGroup isCollapsible title={title} textAlign="left">
          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
            {items.map((service) => (
              <ServiceButton key={service.name} service={service} />
            ))}
          </Grid>
        </NavGroup>
      </SidebarSection>
    );
  }

  return (
    <AppShell
      sidebar={
        <Sidebar
          toggleBreakpoint={false}
          variant={isOpen ? "default" : "compact"}
          transition="width"
          transitionDuration="normal"
          width={isOpen ? 500 : 0}
          height="100vh"
        >
          <SidebarSection direction={isOpen ? "row" : "column"}>
            <IconButton
              _hover={{ bg: "transparent" }}
              onClick={onToggle}
              variant="outline"
              size="lg"
              color={isOpen ? "gray.800" : "gray.200"}
              icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
              aria-label="Toggle Sidebar"
            />
          </SidebarSection>
          <SidebarSection hidden={!isOpen}>
            <ProviderSelect
              onProviderChange={onProviderChange}
              defaultSelectValue={currentStore?.provider as ProviderType | null}
            />
          </SidebarSection>
          <ServiceSection title="Compute" items={services.compute} />
          <ServiceSection title="Storage" items={services.storage} />
          <ServiceSection title="Network" items={services.network} />
          <SidebarOverlay />
        </Sidebar>
      }
    />
  );
}
