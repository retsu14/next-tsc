"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import { Plus, X } from "lucide-react";
import CreateSites from "@/components/sites/create-sites";
import columns from "@/lib/tables/sites-table";
import Table from "@/components/table";
import { useGetSitesQuery } from "@/app/services/sites/sites-slice";

export default function Blueprint() {
  const { data: sites } = useGetSitesQuery();
  const [showForm, setShowForm] = useState(false);
  const [editSite, setEditSite] = useState(null);

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditSite(null);
  };

  const handleEdit = (site) => {
    setEditSite(site);
    setShowForm(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title title="Sites" />
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
              New Site
            </>
          )}
        </Button>
      </div>
      {showForm ? (
        <div className="mt-4">
          <CreateSites
            mode={editSite ? "update" : "create"}
            initialData={editSite}
          />
        </div>
      ) : (
        <Table data={sites} columns={columns} onEdit={handleEdit} />
      )}
    </div>
  );
}
