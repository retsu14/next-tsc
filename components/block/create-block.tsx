import { FormEvent } from "react";
import { Button } from "../ui/button";
import { z } from "zod";

const siteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  component: z.string().min(1, "Component is required"),
  blueprint: z.string().min(1, "Blueprint is required"),
  site: z.string().min(1, "Site is required"),
});

interface CreateBlockProps {
  mode: "create" | "update";
  initialData?: {
    _id: string;
    name: string;
    component: string;
    blueprint: string;
    image: string;
    site: string;
  };
}

const CreateBlock: React.FC<CreateBlockProps> = ({ mode, initialData }) => {
  const handleSubmit = async (e: FormEvent) => {
    e.prevetDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="name"
          value={name}
          onChange={onChange}
        />
        {errors.name && (
          <p className="text-red-500 text-xs mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Domain<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="domain"
          value={domain}
          onChange={onChange}
        />
        {errors.domain && (
          <p className="text-red-500 text-xs mt-1">{errors.domain}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Hook
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="hook"
          value={hook}
          onChange={onChange}
        />
        {errors.hook && (
          <p className="text-red-500 text-xs mt-1">{errors.hook}</p>
        )}
      </div>
      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-400"
        disabled={isCreating || isUpdating}
      >
        {isCreating || isUpdating
          ? "Processing"
          : mode === "create"
          ? "Create"
          : "Update"}
      </Button>
    </form>
  );
};

export default CreateBlock;
