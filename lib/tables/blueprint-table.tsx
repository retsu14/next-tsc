import { Checkbox } from "@/components/ui/checkbox";

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
    accessorKey: "title",
    header: "Name",
    cell: (props) => <div>{props.getValue()}</div>,
    isResizable: true,
    enableSorting: true,
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
    isResizable: true,
    enableSorting: true,
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: (props) => (
      <div className="flex gap-2">
        <button
          onClick={() => {
            console.log("delete", props.row.original._id);
          }}
          className="text-blue-500"
        >
          Edit
        </button>
        <button
          onClick={() => {
            console.log("delete", props.row.original._id);
          }}
          className="text-red-500"
        >
          Delete
        </button>
      </div>
    ),
    isResizable: true,
    enableSorting: false,
  },
];

export default columns;
