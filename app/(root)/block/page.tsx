"use client";
import { useState } from "react";
import Title from "@/components/title";
import columns from "@/lib/tables/block-table";
import { useGetBlocksQuery } from "@/app/services/block/block-slice";
import Table from "@/components/table";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateBlock from "@/components/block/create-block";

const Block = () => {
  const { data: blocks } = useGetBlocksQuery();
  const [showForm, setShowForm] = useState(false);
  const [editBlueprint, setEditBlueprint] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditBlueprint(null);
  };

  const handleEdit = (blueprint: any) => {
    setEditBlueprint(blueprint);
    setShowForm(true);
  };
  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title title="block" />
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
              New Block
            </>
          )}
        </Button>
      </div>
      {showForm ? (
        <div className="mt-4">
          <CreateBlock
            mode={editBlueprint ? "update" : "create"}
            initialData={editBlueprint}
          />
        </div>
      ) : (
        <Table data={blocks} columns={columns} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default Block;
