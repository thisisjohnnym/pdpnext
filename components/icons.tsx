import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

export function CoachWordmark({ title = "Coach", ...props }: IconProps & { title?: string }) {
  return (
    <svg
      viewBox="0 0 89 10"
      role="img"
      aria-label={title}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M32.74 1.629C30.945 0.603 28.571 0.03 26.046 0.03C23.49 0.03 21.117 0.603 19.352 1.629C18.043 2.413 17.283 3.619 17.283 4.977C17.283 6.334 18.043 7.541 19.352 8.325C21.147 9.35 23.52 9.923 26.046 9.923C28.602 9.923 30.975 9.35 32.74 8.325C34.048 7.541 34.809 6.334 34.809 4.977C34.809 3.619 34.048 2.413 32.74 1.629ZM26.015 9.471C24.403 9.471 21.695 8.536 21.695 4.977C21.695 1.87 23.855 0.483 26.015 0.483C28.906 0.483 30.61 2.172 30.61 4.977C30.64 7.993 29.119 9.471 26.015 9.471Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M89 0.633V0.181H81.698V0.633H83.249V4.524H77.134V0.633H78.716V0.241V0.181H71.383V0.633H72.965V9.35H71.383V9.803H78.716V9.35H77.134V4.977H83.249V9.35H81.698V9.803H88.939H89V9.35H87.418V0.633H89Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M43.724 0.03H43.481L35.813 9.35H34.048V9.803H38.46V9.35H36.391L38.247 7.118H45.124L47.193 9.38H45.185V9.833H54.343V9.35H52.305L43.724 0.03ZM38.612 6.636L41.442 3.167L44.698 6.636H38.612Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.597 1.116C12.475 1.056 12.11 0.814 11.502 0.573C10.832 0.332 9.767 0 8.398 0C6.207 0 4.169 0.422 2.678 1.176C0.913 2.051 0 3.378 0 4.947C0 8.204 3.073 9.893 8.915 9.893C10.345 9.893 11.593 9.531 12.627 8.807L14.392 9.742H14.727V6.002H14.392L14.362 6.032V6.063C14.362 6.093 14.057 6.937 13.266 7.782C12.536 8.566 11.197 9.501 9.006 9.501C7.546 9.501 6.359 8.958 5.568 7.963C4.96 7.179 4.595 6.093 4.595 5.007C4.595 2.081 6.877 0.513 9.006 0.513C10.467 0.513 11.775 0.965 12.81 1.84C13.692 2.564 14.179 3.408 14.362 3.981V4.012H14.727V0.181H14.392L12.597 1.116Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M66.605 1.116C66.484 1.056 66.118 0.814 65.51 0.573C64.84 0.332 63.776 0 62.406 0C60.215 0 58.177 0.422 56.686 1.176C54.921 2.051 54.008 3.378 54.008 4.947C54.008 8.204 57.081 9.893 62.923 9.893C64.354 9.893 65.601 9.531 66.636 8.807L68.4 9.742H68.735V6.002H68.4L68.37 6.032V6.063C68.37 6.093 68.066 6.937 67.275 7.782C66.544 8.566 65.206 9.501 63.015 9.501C61.554 9.501 60.368 8.958 59.577 7.963C58.968 7.179 58.603 6.093 58.603 5.007C58.603 2.081 60.885 0.513 63.015 0.513C64.475 0.513 65.784 0.965 66.818 1.84C67.701 2.564 68.187 3.408 68.37 3.981V4.012H68.735V0.181H68.4L66.605 1.116Z"
      />
    </svg>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4 15V13H20V15H4ZM4 11V9H20V11H4Z" />
    </svg>
  );
}

export function TikTokGlyph(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M16.3668 1.7561H12.914V15.7115C12.914 17.3744 11.586 18.7402 9.9334 18.7402C8.28077 18.7402 6.95278 17.3744 6.95278 15.7115C6.95278 14.0785 8.25127 12.7423 9.84488 12.6829V9.17923C6.33305 9.23859 3.5 12.1188 3.5 15.7115C3.5 19.3341 6.39207 22.2439 9.96292 22.2439C13.5337 22.2439 16.4258 19.3044 16.4258 15.7115V8.55566C17.7243 9.50584 19.3179 10.07 21 10.0997V6.59598C18.4031 6.5069 16.3668 4.36904 16.3668 1.7561Z" />
    </svg>
  );
}

export function CommentIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M20 11.5a8.38 8.38 0 0 1-8.5 8.5 9.6 9.6 0 0 1-3.9-.8L3 20.5l1.4-4.4A8.4 8.4 0 0 1 3.5 11.5 8.38 8.38 0 0 1 12 3a8.38 8.38 0 0 1 8 8.5Z" />
    </svg>
  );
}

export function SaveIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M14 4H6a1 1 0 0 0-1 1v15l5-3.2 5 3.2v-8" />
      <path d="M18 3v6M21 6h-6" />
    </svg>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M12 20.5 4.2 12.7a4.6 4.6 0 0 1 0-6.5 4.6 4.6 0 0 1 6.5 0l1.3 1.3 1.3-1.3a4.6 4.6 0 0 1 6.5 0 4.6 4.6 0 0 1 0 6.5Z" />
    </svg>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
    </svg>
  );
}

export function SpinIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <ellipse cx="12" cy="12" rx="9" ry="4.3" />
      <path d="M3.4 10.2A9 4.3 0 0 0 12 16.3 9 4.3 0 0 0 20.6 10.2" />
      <path d="M15.2 4.4 12 2.8 13.6 6" />
    </svg>
  );
}

export function ChevronUpIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="m6 14 6-6 6 6" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
