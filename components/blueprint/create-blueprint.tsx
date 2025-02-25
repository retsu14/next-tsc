import TableButton from "./table-buttons";
import { useFormStore } from "@/store/form-store";

const FormBuilder: React.FC = () => {
  const { sections, addSection, removeSection, addField, removeField } =
    useFormStore();

  return (
    <div className="flex flex-col p-4 mx-auto space-y-6 bg-gray-50 rounded-lg">
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Form name"
        />
      </div>
      <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Sections</h2>
        {sections.map((section) => (
          <div
            key={section.id}
            className="mb-6 p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <span className="mr-2 bg-blue-100 text-blue-800 font-medium py-1 px-2 rounded text-xs">
                  S{section.id}
                </span>
              </div>
              <TableButton removeSection={removeSection} section={section} />
            </div>
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State name
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-md font-medium text-gray-700 mb-3">Fields</h3>
              {section.fields.map((field) => (
                <div
                  key={field.id}
                  className="mb-4 p-4 border border-gray-200 rounded-lg bg-white"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <span className="mr-2 bg-green-100 text-green-800 font-medium py-1 px-2 rounded text-xs">
                        F{field.id}
                      </span>
                    </div>
                    <TableButton
                      removeField={removeField}
                      section={section}
                      field={field}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Type<span className="text-red-500">*</span>
                      </label>
                      <select className="w-full px-3 py-[10px] border text-sm border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                        <option>Select an option</option>
                        <option>Text</option>
                        <option>Number</option>
                        <option>Dropdown</option>
                        <option>Checkbox</option>
                        <option>Radio</option>
                        <option>Repeater</option>
                      </select>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State name
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Rules
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Rules should be separated with "|". Available rules can be
                      found on Laravel's Documentation.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Helper text
                    </label>
                    <input
                      type="text"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              ))}
              <button
                className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mt-2"
                onClick={() => addField(section.id)}
              >
                Add to fields
              </button>
            </div>
          </div>
        ))}
        <button
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={addSection}
        >
          Add to sections
        </button>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 text-sm focus:ring-offset-2 focus:ring-blue-500 shadow-sm font-medium">
        Create
      </button>
    </div>
  );
};

export default FormBuilder;
