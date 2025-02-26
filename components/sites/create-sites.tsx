import { ChangeEvent, FormEvent } from "react";
import { Button } from "../ui/button";
import { useStore } from "@/store/sites-form";
import { useCreateSiteMutation } from "@/app/services/sites/sites-slice";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const siteSchema = z.object({
  name: z.string().min(1, "Name is required"),
  domain: z.string().min(1, "Domain is required"),
  hook: z.string().optional(),
});

const CreateSites: React.FC = () => {
  const { toast } = useToast();
  const {
    name,
    domain,
    hook,
    errors,
    setField,
    setErrors,
    clearError,
    resetForm,
  } = useStore();
  const [createSite, { isLoading }] = useCreateSiteMutation();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setField(name, value);

    clearError(name);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = { name, domain, hook };

    const validation = siteSchema.safeParse(formData);

    if (!validation.success) {
      const newErrors = validation.error.errors.reduce((acc, err) => {
        const key = err.path[0] as keyof typeof acc;
        acc[key] = err.message;
        return acc;
      }, {} as { name?: string; domain?: string; hook?: string });

      setErrors(newErrors);
      return;
    }

    try {
      await createSite(formData).then((res) => {
        if (res.data) {
          toast({
            title: res.data.message,
            variant: "success",
          });
        }
      });

      resetForm();
    } catch (error: any) {
      if (error.response) {
        toast({
          title: error.response.data.message,
        });
      } else {
        console.log("Error:", error.message);
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
        disabled={isLoading}
      >
        {isLoading ? "Creating" : "Create"}
      </Button>
    </form>
  );
};

export default CreateSites;
