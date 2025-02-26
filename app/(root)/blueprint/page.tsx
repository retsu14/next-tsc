"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import { Plus, X } from "lucide-react";
import FormBuilder from "@/components/blueprint/create-blueprint";
import Table from "@/components/table";
import columns from "@/lib/tables/blueprint-table";
import { useGetBlueprintsQuery } from "@/services/blueprint/blueprint-slice";

export default function Blueprint() {
  const { data: blueprints } = useGetBlueprintsQuery();

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
        <Table data={blueprints} columns={columns} />
      )}
    </div>
  );
}
