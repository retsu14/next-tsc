"use client";
import { useState } from "react";
import Title from "@/components/title";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useGetPageQuery } from "@/app/services/page/page-slice";
import columns from "@/lib/tables/page-table";
import Table from "@/components/table";
import CreatePage from "@/components/page/create-page";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [editPage, setEditPage] = useState<any>(null);
  const { data: pages } = useGetPageQuery();

  const toggleForm = () => {
    setShowForm(!showForm);
    setEditPage(null);
  };

  const handleEdit = (page: any) => {
    setEditPage(page);
    setShowForm(true);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <Title title="pages" />
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
              <X className="mr-2 h-4 w-4" />
              Close
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              New Page
            </>
          )}
        </Button>
      </div>
      {showForm ? (
        <div className="mt-4">
          {/* <CreatePage
            mode={editPage ? "update" : "create"}
            initialData={editPage}
          /> */}
        </div>
      ) : (
        <Table data={pages} columns={columns} onEdit={handleEdit} />
      )}
    </div>
  );
};

export default Page;
