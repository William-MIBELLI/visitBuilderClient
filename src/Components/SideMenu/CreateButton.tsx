import { MapPinPlus, Plus } from "lucide-react";
import React from "react";

const CreateButton = () => {
  return (
    <button className="flex items-center justify-center p-4 h-9 rounded-xl bg-bleu text-white text-sm font-semibold gap-3 cursor-pointer ">
      <MapPinPlus />
      <p>Add Entity</p>
    </button>
  );
};

export default CreateButton;
