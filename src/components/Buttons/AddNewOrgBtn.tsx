import { Building2 } from "lucide-react";
import { NewOrgaAdd } from "../AddNewOrg/NewOrgForm";
import { useState } from "react";

export default function AddNewOrgBtn() {
  const [isNewOrgFormOpen, setIsNewOrgFormOpen] = useState(false);
  const handleNewOrgSubmit = () => {
    alert("new form submitted")
  }
  return (
    <>
      <button
        onClick={() => setIsNewOrgFormOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md flex items-center gap-2 hover:bg-blue-600"
      >
        <Building2 size={20} />
        New Organization
      </button>
      <NewOrgaAdd
        isOpen={isNewOrgFormOpen}
        onClose={() => setIsNewOrgFormOpen(false)}
        onSubmit={handleNewOrgSubmit}
      />
    </>
  );
}
