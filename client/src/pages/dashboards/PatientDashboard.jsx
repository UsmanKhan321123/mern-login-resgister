import DashboardShell from "../../components/DashboardShell";

const PatientDashboard = () => {
  return (
    <DashboardShell title="Patient Dashboard">
      <div className="grid md:grid-cols-3 gap-4">
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Appointments</h3>
          <p className="text-slate-600 text-sm mt-2">Track upcoming visits and schedules.</p>
        </article>
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Medical History</h3>
          <p className="text-slate-600 text-sm mt-2">View doctor notes and diagnosis history.</p>
        </article>
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Prescriptions</h3>
          <p className="text-slate-600 text-sm mt-2">See current and previous medicines.</p>
        </article>
      </div>
    </DashboardShell>
  );
};

export default PatientDashboard;

