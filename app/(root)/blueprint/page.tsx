"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import BlueprintTable from "@/components/blueprint/blueprint-table";
import { Plus, X } from "lucide-react";
import FormBuilder from "@/components/blueprint/create-blueprint";

export default function Blueprint() {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title title="blueprint" />
        <Button
          onClick={toggleForm}
          className={`${
            showForm
              ? "bg-red-500 hover:bg-red-400"
              : "bg-blue-500 hover:bg-blue-400"
          }`}
        >
          {showForm ? (
            <>
              <X />
              Close
            </>
          ) : (
            <>
              <Plus />
              New Blueprint
            </>
          )}
        </Button>
      </div>
      {showForm ? (
        <div className="mt-4">
          <FormBuilder />
        </div>
      ) : (
        <BlueprintTable />
      )}
    </div>
  );
}
