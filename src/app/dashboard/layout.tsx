import { ReactNode } from "react";
import DashboardHeader from "@/app/dashboard/components/dashboardHeader";
import Container from "@/components/container";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Container>
      <DashboardHeader />
      {children}
    </Container>
  );
};

export default DashboardLayout;
