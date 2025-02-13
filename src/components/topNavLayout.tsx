import UserDropdown from "./userDropdown";

export function TopNavLayout() {
  return (
    <div className="flex justify-between p-4 shadow-md bg-white">
      <svg width="40" height="40" viewBox="0 0 400 400" fill="none">
        <path
          d="M-1.74846e-05 1.52588e-05C30 70 30 280 -1.74846e-06 360C40.6667 358 125.5 360 80 400C98 400 120 367 120 320C120 240 111.5 236 60 236C70 216 70 180 60 160C80 170 120 170 140 160L200 380L260 160C280 170 320 170 340 160C330 180 330 216 340 236C288.5 236 280 240 280 320C280 367 302 400 320 400C274.5 360 359.333 358 400 360C370 280 370 70 400 -2.22577e-06C379.5 13.5 272.4 32.4 240 4.76806e-06L200 160L160 8.26497e-06C127.6 32.4 20.5 13.5 -1.74846e-05 1.52588e-05Z"
          fill="rgb(67 56 202)"
        />
      </svg>
      <UserDropdown />
    </div>
  );
}
