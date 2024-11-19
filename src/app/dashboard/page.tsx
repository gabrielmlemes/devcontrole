import Container from "@/components/container";
import DashboardHeader from "@/components/dashboardHeader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession(authOptions)
  
  if (!session || !session.user) {
    redirect('/')
  }
  

  return (
    <Container>
      <DashboardHeader />
      <h1>Dahsboard</h1>
    </Container>
  );
};

export default Dashboard;
