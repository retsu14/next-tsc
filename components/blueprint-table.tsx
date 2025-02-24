"use client";
import { useGetBlueprintsQuery } from "@/app/services/blueprint/blueprint-slice";

const BlueprintTable = () => {
  const { data: blueprints, isError: error } = useGetBlueprintsQuery();
  console.log("data", blueprints);
  console.log("error", error);
  return <div>{}</div>;
};

export default BlueprintTable;
