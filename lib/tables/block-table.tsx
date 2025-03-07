import { Checkbox } from "@/components/ui/checkbox";
import { Edit, Delete } from "@/public/icons/icons";
import { useDeleteBlockMutation } from "@/app/services/block/block-slice";
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
import Image from "next/image";

const columns = (onEdit) => [
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
    size: 0,
  },
  {
    accessorKey: "image",
    header: "Thumbnail",
    cell: (props) => (
      <Image
        src={props.getValue()}
        width={60}
        height={60}
        alt="Thumbnail"
        className="rounded-full"
      />
    ),
    isResizable: true,
    enableSorting: true,
    size: 0,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => <div>{props.getValue()}</div>,
    isResizable: true,
    enableSorting: true,
    size: 700,
  },
  {
    accessorKey: "updatedAt",
    header: "Updated at",
    cell: (props) => (
      <div>
        {new Date(props.getValue() as string).toLocaleString("default", {
          month: "long",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        })}
      </div>
    ),
    enableSorting: true,
    size: 1000,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (props) => {
      const [deleteBlock, { isLoading }] = useDeleteBlockMutation();
      const blockId = props.row.original._id;
      const { toast } = useToast();

      const handleDelete = async () => {
        try {
          const res = await deleteBlock(blockId).unwrap();

          if (res) {
            toast({
              title: "Deleted",
              description: res.message,
              variant: "destructive",
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
            className="text-blue-500"
            onClick={() => onEdit(props.row.original)}
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
    enableSorting: false,
    size: 20,
  },
];

export default columns;
