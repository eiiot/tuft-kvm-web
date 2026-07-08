// Tuft overlay (LLP 0065): replaces upstream's Google login page. Identity
// comes from the Tuft dashboard session via kvm-api's /tuft/login code
// exchange, so a logged-out visitor is simply redirected into that flow —
// no button, no Google. See kvm-web/README.md for the overlay mechanism.

import { useEffect } from "react";

import { CLOUD_API } from "@/ui.config";

export default function LoginRoute() {
  useEffect(() => {
    const returnTo = encodeURIComponent("/devices");
    window.location.replace(`${CLOUD_API}/tuft/login?returnTo=${returnTo}`);
  }, []);

  return (
    <div className="grid min-h-screen place-items-center bg-white dark:bg-slate-900">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        Redirecting to Tuft sign-in…
      </p>
    </div>
  );
}
