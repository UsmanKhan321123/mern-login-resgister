import { useMemo, useState } from "react";
import DashboardShell from "../../components/DashboardShell";
import AdminCrudTable from "../../components/AdminCrudTable";

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

const AdminDashboard = () => {
  const [patients, setPatients] = useState([
    { id: createId(), name: "Ali Khan", email: "ali@demo.com", phone: "03001234567" },
  ]);
  const [doctors, setDoctors] = useState([
    {
      id: createId(),
      name: "Dr. Sarah",
      email: "sarah@demo.com",
      specialty: "Cardiology",
    },
  ]);
  const [receptionists, setReceptionists] = useState([
    { id: createId(), name: "Ayesha", email: "ayesha@demo.com", shift: "Morning" },
  ]);

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

  const createRow = (setter) => (data) => setter((prev) => [...prev, { id: createId(), ...data }]);
  const updateRow = (setter) => (id, updated) =>
    setter((prev) => prev.map((item) => (item.id === id ? { ...item, ...updated } : item)));
  const deleteRow = (setter) => (id) => setter((prev) => prev.filter((item) => item.id !== id));

  return (
    <DashboardShell title="Admin Dashboard">
      <div className="space-y-5">
        <AdminCrudTable
          title="Patients"
          fields={patientFields}
          rows={patients}
          onCreate={createRow(setPatients)}
          onUpdate={updateRow(setPatients)}
          onDelete={deleteRow(setPatients)}
        />
        <AdminCrudTable
          title="Doctors"
          fields={doctorFields}
          rows={doctors}
          onCreate={createRow(setDoctors)}
          onUpdate={updateRow(setDoctors)}
          onDelete={deleteRow(setDoctors)}
        />
        <AdminCrudTable
          title="Receptionists"
          fields={receptionistFields}
          rows={receptionists}
          onCreate={createRow(setReceptionists)}
          onUpdate={updateRow(setReceptionists)}
          onDelete={deleteRow(setReceptionists)}
        />
      </div>
    </DashboardShell>
  );
};

export default AdminDashboard;

