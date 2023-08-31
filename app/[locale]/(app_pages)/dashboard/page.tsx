import DashboardButton from "@/components/UI_Molecules/dashboradCreateButton";
import Card from "@/components/UI_Organisms/Card";
import SideBar from "@/components/UI_Organisms/sidebar";
import React from "react";

function Dashboard() {
  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <DashboardButton type="Maktoob" path="/maktoob" />
        <DashboardButton type="Istilam" path="/istilam" />
        <DashboardButton type="Pishnihad" path="/pishnihad" />
      </div>

      <Card/>
    </div>  
  );
}

export default Dashboard;
