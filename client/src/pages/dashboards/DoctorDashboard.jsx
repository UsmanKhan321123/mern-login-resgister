import DashboardShell from "../../components/DashboardShell";

const DoctorDashboard = () => {
  return (
    <DashboardShell title="Doctor Dashboard">
      <div className="grid md:grid-cols-2 gap-4">
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Assigned Patients</h3>
          <p className="text-slate-600 text-sm mt-2">
            Review patients and add medical history updates.
          </p>
        </article>
        <article className="bg-white border border-slate-200 rounded-xl p-4">
          <h3 className="font-semibold text-slate-900">Daily Schedule</h3>
          <p className="text-slate-600 text-sm mt-2">
            Keep track of appointments and consultations.
          </p>
        </article>
      </div>
    </DashboardShell>
  );
};

export default DoctorDashboard;

