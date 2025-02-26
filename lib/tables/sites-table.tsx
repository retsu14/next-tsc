import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Delete } from "@/public/icons/icons";
import { useDeleteSiteMutation } from "@/app/services/sites/sites-slice";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
    maxSize: 40,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => <div>{props.getValue()}</div>,
    isResizable: true,
    enableSorting: true,
  },
  {
    accessorKey: "domain",
    header: "Domain",
    cell: (props) => (
      <div className="text-blue-600 cursor-pointer">{props.getValue()}</div>
    ),
    isResizable: true,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (props) => {
      const [deleteSite, { isLoading }] = useDeleteSiteMutation();
      const siteId = props.row.original._id;
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          const res = await deleteSite(siteId).unwrap();

          if (res) {
            toast({
              title: res.message,
              variant: "success",
            });
          }
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
        <div className="flex gap-2">
          <button
            onClick={() => {
              console.log("edit", siteId);
            }}
            className="text-blue-500"
          >
            <Edit />
          </button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-red-500" disabled={isLoading}>
                <Delete />
              </button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete Blueprint</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to delete this blueprint? This action
                  cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  className="text-white bg-red-500 hover:bg-red-400"
                >
                  Yes, Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
    isResizable: true,
    enableSorting: false,
  },
];

export default columns;
