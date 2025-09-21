import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import RecentInspections from "./RecentInspections";
import PendingApprovals from "./PendingApprovals";
import QuickActions from "./QuickActions";
import RegisterFarmerModal from "../farmer/RegisterFarmerModal";
import InspectionModal from "../farmer/InspectionModal";

const Dashboard = () => {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isInspectionModalOpen, setIsInspectionModalOpen] = useState(false);

  const openRegisterModal = () => setIsRegisterModalOpen(true);
  const closeRegisterModal = () => setIsRegisterModalOpen(false);
  const openInspectionModal = () => setIsInspectionModalOpen(true);
  const closeInspectionModal = () => setIsInspectionModalOpen(false);

  return (
    <div className="flex min-h-screen bg-green-50">
      <Sidebar />
      <div className="flex-1 pl-64 p-6">
        <Header />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <RecentInspections />
          </div>
          <div className="md:col-span-1 flex flex-col space-y-6">
            <PendingApprovals />
            <QuickActions
              onRegisterClick={openRegisterModal}
              onInspectClick={openInspectionModal}
              onViewAllFarmersClick={() => {}}
            />
          </div>
        </div>
      </div>

      <RegisterFarmerModal
        isOpen={isRegisterModalOpen}
        onClose={closeRegisterModal}
      />
      <InspectionModal
        isOpen={isInspectionModalOpen}
        onClose={closeInspectionModal}
      />
    </div>
  );
};

export default Dashboard;
