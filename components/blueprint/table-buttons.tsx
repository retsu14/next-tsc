import React from "react";
import { Delete, Collapse } from "@/public/icons/icons";

interface Section {
  id: number;
}

interface Field {
  id: number;
}

interface TableButtonProps {
  removeField?: (sectionId: number, fieldId: number) => void;
  removeSection?: (sectionId: number) => void;
  section?: Section;
  field?: Field;
}

const TableButton: React.FC<TableButtonProps> = ({
  removeField,
  removeSection,
  section,
  field,
}) => {
  return (
    <div className="flex space-x-2">
      <button
        className="text-red-500 hover:text-red-400"
        onClick={() => {
          if (removeField && section && field) {
            removeField(section.id, field.id);
          } else if (removeSection && section) {
            removeSection(section.id);
          }
        }}
      >
        <Delete />
      </button>
      <button className="text-gray-400 hover:text-gray-600">
        <Collapse />
      </button>
    </div>
  );
};

export default TableButton;
