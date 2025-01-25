import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import NewMemberForm from "../AddNewMember/NewmemberForm";

export default function AddNewMemberBtn() {
  const [isNewMemberFormOpen, setIsNewMemberFormOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsNewMemberFormOpen(true)}
        className="px-4 py-2 bg-green-500 text-white rounded-md flex items-center gap-2 hover:bg-green-600"
      >
        <UserPlus size={20} />
        New Member
      </button>
      <NewMemberForm
        isOpen={isNewMemberFormOpen}
        onClose={() => setIsNewMemberFormOpen(false)}
      />
    </>
  );
}
