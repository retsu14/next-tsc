import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { z } from "zod";
import { useStore } from "@/store/block-store";
import {
  useCreateBlockMutation,
  useUpdateBlockMutation,
} from "@/app/services/block/block-slice";
import { useGetBlueprintsQuery } from "@/app/services/blueprint/blueprint-slice";
import { useGetSitesQuery } from "@/app/services/sites/sites-slice";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { Close } from "@/public/icons/icons";

const blockSchema = z.object({
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
    blueprint: {
      _id: string;
      title: string;
    };
    image: string;
    site: {
      _id: string;
      name: string;
    };
  };
}

const CreateBlock: React.FC<CreateBlockProps> = ({ mode, initialData }) => {
  const {
    name,
    component,
    blueprint,
    image,
    site,
    errors,
    setField,
    setErrors,
    clearError,
    resetForm,
  } = useStore();
  const [createBlock, { isLoading: isCreating }] = useCreateBlockMutation();
  const [updateBlock, { isLoading: isUpdating }] = useUpdateBlockMutation();
  const { data: blueprints } = useGetBlueprintsQuery();
  const { data: sites } = useGetSitesQuery();
  const { toast } = useToast();
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "update" && initialData) {
      setField("name", initialData.name);
      setField("component", initialData.component);
      setField("blueprint", initialData.blueprint._id);
      setField("image", initialData.image);
      setField("site", initialData.site._id);
      setImagePreview(initialData.image);
    }
  }, [mode, initialData, setField]);

  console.log("initialData", initialData?.site._id);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setField(name, files[0]);
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setField(name, value);
    }
    clearError(name);
  };

  const removeImage = () => {
    setField("image", null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("component", component);
    formData.append("blueprint", blueprint);
    formData.append("site", site);
    if (image) {
      formData.append("image", image);
    }

    const validation = blockSchema.safeParse({
      name,
      component,
      blueprint,
      site,
    });

    console.log("blueprint", blueprint);

    if (!validation.success) {
      const newErrors = validation.error.errors.reduce((acc, err) => {
        const key = err.path[0] as keyof typeof acc;
        acc[key] = err.message;
        return acc;
      }, {} as { name?: string; component?: string; blueprint?: string; site?: string });

      setErrors(newErrors);
      return;
    }

    try {
      if (mode === "create") {
        await createBlock(formData)
          .unwrap()
          .then((res) => {
            if (res) {
              toast({
                title: "Success",
                description: res.message,
                variant: "success",
              });
            }
          });
        resetForm();
        setImagePreview(null);
      } else if (mode === "update" && initialData) {
        await updateBlock({ id: initialData._id, body: formData })
          .unwrap()
          .then((res) => {
            if (res) {
              toast({
                title: "Success",
                description: res.message,
                variant: "success",
              });
            }
          });
      }
    } catch (error: any) {
      if (error.response) {
        toast({
          title: error.response.data.message,
          variant: "destructive",
        });
      } else {
        console.log("Error:", error.message);
        toast({
          title: "An error occurred",
          description: error.message,
          variant: "destructive",
        });
      }
    }
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
          Component<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="component"
          value={component}
          onChange={onChange}
        />
        {errors.component && (
          <p className="text-red-500 text-xs mt-1">{errors.component}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Blueprint<span className="text-red-500">*</span>
        </label>
        <select
          className="bg-white w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="blueprint"
          value={blueprint}
          onChange={onChange}
        >
          <option value="">Select a blueprint</option>
          {blueprints?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.title}
            </option>
          ))}
        </select>
        {errors.blueprint && (
          <p className="text-red-500 text-xs mt-1">{errors.blueprint}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Image
        </label>
        <input
          type="file"
          className="w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="image"
          onChange={onChange}
        />
        {imagePreview && (
          <div className="mt-2 relative">
            <Image
              src={imagePreview}
              width={100}
              height={100}
              alt="Preview"
              className=" rounded-md"
            />
            <button
              type="button"
              className="absolute top-[-13px] left-[100px] z-10 mt-2 text-red-500 hover:text-red-700"
              onClick={removeImage}
            >
              <Close className="w-7 h-7" />
            </button>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Site<span className="text-red-500">*</span>
        </label>
        <select
          className="bg-white w-full px-3 py-2 border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          name="site"
          value={site}
          onChange={onChange}
        >
          <option value="">Select a site</option>
          {sites?.map((item) => (
            <option key={item._id} value={item._id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.site && (
          <p className="text-red-500 text-xs mt-1">{errors.site}</p>
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
