import IconBase, { type IconProps } from "./IconBase";

export default function UsersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3" />
      <path d="M6.5 19.5v-.5a4.5 4.5 0 0 1 4.5-4.5h2a4.5 4.5 0 0 1 4.5 4.5v.5" />
      <circle cx="5.5" cy="9.5" r="2.25" />
      <path d="M2 18v-.25A3.25 3.25 0 0 1 5.25 14.5H6" />
      <circle cx="18.5" cy="9.5" r="2.25" />
      <path d="M22 18v-.25a3.25 3.25 0 0 0-3.25-3.25H18" />
    </IconBase>
  );
}
