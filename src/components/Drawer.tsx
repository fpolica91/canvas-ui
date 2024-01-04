import {
  Button,
  IconButton,
  Image,
  useDisclosure,
  VStack,
  Grid,
  Text
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
import { CreateNodeType } from "../context/store/types";

export function SideBarDrawer() {
  const services = useStore.use.services();
  const createNode = useStore.use.createNode();

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
        <Text mt={1} fontSize={8.5} px={'50px'}>{service.name}</Text>
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
          width={isOpen ? 500 : "14"}
          height="100vh"
        >
          <SidebarSection direction={isOpen ? "row" : "column"}>
            <IconButton
              onClick={onToggle}
              variant="ghost"
              size="sm"
              icon={isOpen ? <FiChevronsLeft /> : <FiChevronsRight />}
              aria-label="Toggle Sidebar"
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
