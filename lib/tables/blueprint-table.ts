const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: (props) => <div>{props.getValue()}</div>,
    isResizable: true,
  },
  {
    accessorKey: "updatedAt",
    header: "updatedAt",
    cell: (props) => <div>{props.getValue()}</div>,
    isResizable: true,
  },
];
