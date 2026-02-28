import DashboardShell from "../../components/DashboardShell";

const ReceptionistDashboard = () => {
  return (
    <DashboardShell title="Receptionist Dashboard">
      <div className="grid md:grid-cols-2 gap-4">
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Patient Intake</h3>
          <p className="text-slate-600 text-sm mt-2">Register new patients and update details.</p>
        </article>
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Doctor Assignment</h3>
          <p className="text-slate-600 text-sm mt-2">Assign patients to available doctors.</p>
        </article>
      </div>
    </DashboardShell>
  );
};

export default ReceptionistDashboard;

