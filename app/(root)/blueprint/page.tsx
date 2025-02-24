import { Button } from "@/components/ui/button";
import Title from "@/components/title";
import BlueprintTable from "@/components/blueprint-table";
import { Plus } from "lucide-react";

export default function Blueprint() {
  return (
    <div>
      <Title title="blueprint" />
      <Button>
        <Plus />
        New Blueprint
      </Button>
      <BlueprintTable />
    </div>
  );
}
