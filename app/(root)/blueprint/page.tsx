"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import { Plus, X } from "lucide-react";
import CreateBlueprint from "@/components/blueprint/create-blueprint";
import columns from "@/lib/tables/blueprint-table";
import Table from "@/components/table";
import { useGetBlueprintsQuery } from "@/app/services/blueprint/blueprint-slice";

export default function BlueprintPage() {
  const { data: blueprints } = useGetBlueprintsQuery();
  const [showForm, setShowForm] = useState(false);
  const [editBlueprint, setEditBlueprint] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditBlueprint(null); 
  };

  const handleEdit = (blueprint) => {
    setEditBlueprint(blueprint);
    setShowForm(true);
  };

  console.log("editBlueprint", editBlueprint);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title title="Blueprints" />
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
          <CreateBlueprint
            mode={editBlueprint ? "update" : "create"}
            initialData={editBlueprint}
          />
        </div>
      ) : (
        <Table data={blueprints} columns={columns} onEdit={handleEdit} />
      )}
    </div>
  );
}
