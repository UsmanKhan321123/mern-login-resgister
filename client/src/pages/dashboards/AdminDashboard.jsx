import { useEffect, useMemo, useState } from "react";
import DashboardShell from "../../components/DashboardShell";
import AdminCrudTable from "../../components/AdminCrudTable";
import api from "../../services/api";

const AdminDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [receptionists, setReceptionists] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setError("");
    try {
      const [patientsRes, doctorsRes, receptionistsRes] = await Promise.all([
        api.get("/admin/patients"),
        api.get("/admin/doctors"),
        api.get("/admin/receptionists"),
      ]);
      setPatients(patientsRes.data);
      setDoctors(doctorsRes.data);
      setReceptionists(receptionistsRes.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const patientFields = useMemo(
    () => [
      { key: "name", label: "Patient Name" },
      { key: "email", label: "Email", type: "email" },
      { key: "phone", label: "Phone" },
    ],
    []
  );
  const doctorFields = useMemo(
    () => [
      { key: "name", label: "Doctor Name" },
      { key: "email", label: "Email", type: "email" },
      { key: "specialty", label: "Specialty" },
    ],
    []
  );
  const receptionistFields = useMemo(
    () => [
      { key: "name", label: "Receptionist Name" },
      { key: "email", label: "Email", type: "email" },
      { key: "shift", label: "Shift" },
    ],
    []
  );

  const handleCreate = (resource, setter) => async (data) => {
    try {
      const res = await api.post(`/admin/${resource}`, data);
      setter((prev) => [res.data, ...prev]);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || `Failed to add ${resource.slice(0, -1)}`);
      throw err;
    }
  };

  const handleUpdate = (resource, setter) => async (id, updated) => {
    try {
      const res = await api.put(`/admin/${resource}/${id}`, updated);
      setter((prev) => prev.map((item) => (item.id === id ? res.data : item)));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || `Failed to update ${resource.slice(0, -1)}`);
      throw err;
    }
  };

  const handleDelete = (resource, setter) => async (id) => {
    try {
      await api.delete(`/admin/${resource}/${id}`);
      setter((prev) => prev.filter((item) => item.id !== id));
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || `Failed to delete ${resource.slice(0, -1)}`);
      throw err;
    }
  };

  return (
    <DashboardShell title="Admin Dashboard">
      {error ? (
        <p className="mb-4 text-sm text-rose-700 bg-rose-50 border border-rose-200 rounded-md px-3 py-2">
          {error}
        </p>
      ) : null}
      {loading ? (
        <p className="text-slate-600">Loading records...</p>
      ) : (
        <div className="space-y-5">
          <AdminCrudTable
            title="Patients"
            fields={patientFields}
            rows={patients}
            onCreate={handleCreate("patients", setPatients)}
            onUpdate={handleUpdate("patients", setPatients)}
            onDelete={handleDelete("patients", setPatients)}
          />
          <AdminCrudTable
            title="Doctors"
            fields={doctorFields}
            rows={doctors}
            onCreate={handleCreate("doctors", setDoctors)}
            onUpdate={handleUpdate("doctors", setDoctors)}
            onDelete={handleDelete("doctors", setDoctors)}
          />
          <AdminCrudTable
            title="Receptionists"
            fields={receptionistFields}
            rows={receptionists}
            onCreate={handleCreate("receptionists", setReceptionists)}
            onUpdate={handleUpdate("receptionists", setReceptionists)}
            onDelete={handleDelete("receptionists", setReceptionists)}
          />
        </div>
      )}
    </DashboardShell>
  );
};

export default AdminDashboard;
