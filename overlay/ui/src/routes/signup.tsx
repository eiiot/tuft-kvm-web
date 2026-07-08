// Tuft overlay (LLP 0065): replaces upstream's Google signup page. Devices
// redirect here after "Adopt KVM to Cloud" with their serial in the query;
// adoption is admin-driven in Tuft (interactive adoption is F2.5 in the
// LLP), so this screen tells the visitor exactly what to hand their admin.

import { useSearchParams } from "react-router";

export default function SignupRoute() {
  const [sq] = useSearchParams();
  const deviceId = sq.get("deviceId");

  return (
    <div className="grid min-h-screen place-items-center bg-white px-4 dark:bg-slate-900">
      <div className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
          KVM setup is handled by an admin
        </h1>
        {deviceId && (
          <div className="mt-5 rounded-lg bg-slate-50 px-4 py-3 dark:bg-slate-900/60">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Device ID
            </p>
            <code className="mt-1 block font-mono text-sm text-slate-900 dark:text-slate-100">
              {deviceId}
            </code>
          </div>
        )}
        <a
          href="https://dash.tuft.dev"
          className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Back to the Tuft dashboard
        </a>
      </div>
    </div>
  );
}
