import { useMemo, useState } from "react";

const emptyForm = (fields) =>
  fields.reduce((acc, field) => {
    acc[field.key] = "";
    return acc;
  }, {});

const AdminCrudTable = ({ title, fields, rows, onCreate, onUpdate, onDelete }) => {
  const [createForm, setCreateForm] = useState(() => emptyForm(fields));
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const hasRows = useMemo(() => rows.length > 0, [rows]);

  const handleCreate = (e) => {
    e.preventDefault();
    onCreate(createForm);
    setCreateForm(emptyForm(fields));
  };

  const beginEdit = (row) => {
    setEditingId(row.id);
    setEditForm(row);
  };

  const handleUpdate = () => {
    onUpdate(editingId, editForm);
    setEditingId(null);
    setEditForm({});
  };

  return (
    <section className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-900">{title}</h3>

      <form className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-3" onSubmit={handleCreate}>
        {fields.map((field) => (
          <input
            key={field.key}
            type={field.type || "text"}
            placeholder={field.label}
            value={createForm[field.key]}
            onChange={(e) =>
              setCreateForm((prev) => ({ ...prev, [field.key]: e.target.value }))
            }
            required={field.required ?? true}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm"
          />
        ))}
        <button
          type="submit"
          className="rounded-md bg-emerald-700 text-white px-3 py-2 text-sm font-medium hover:bg-emerald-600"
        >
          Add
        </button>
      </form>

      {!hasRows ? (
        <p className="mt-4 text-sm text-slate-500">No records yet.</p>
      ) : (
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b border-slate-200">
                {fields.map((field) => (
                  <th key={field.key} className="py-2 pr-4 font-semibold text-slate-700">
                    {field.label}
                  </th>
                ))}
                <th className="py-2 pr-4 font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const isEditing = editingId === row.id;
                return (
                  <tr key={row.id} className="border-b border-slate-100">
                    {fields.map((field) => (
                      <td key={`${row.id}-${field.key}`} className="py-2 pr-4">
                        {isEditing ? (
                          <input
                            type={field.type || "text"}
                            value={editForm[field.key] || ""}
                            onChange={(e) =>
                              setEditForm((prev) => ({ ...prev, [field.key]: e.target.value }))
                            }
                            className="rounded-md border border-slate-300 px-2 py-1 w-full"
                          />
                        ) : (
                          row[field.key]
                        )}
                      </td>
                    ))}
                    <td className="py-2 pr-4">
                      <div className="flex gap-2">
                        {isEditing ? (
                          <>
                            <button
                              className="rounded-md bg-sky-700 text-white px-2 py-1"
                              onClick={handleUpdate}
                              type="button"
                            >
                              Save
                            </button>
                            <button
                              className="rounded-md border border-slate-300 px-2 py-1"
                              onClick={() => setEditingId(null)}
                              type="button"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="rounded-md bg-amber-500 text-white px-2 py-1"
                              onClick={() => beginEdit(row)}
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              className="rounded-md bg-rose-600 text-white px-2 py-1"
                              onClick={() => onDelete(row.id)}
                              type="button"
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default AdminCrudTable;

