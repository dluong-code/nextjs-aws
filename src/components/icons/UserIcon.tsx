import IconBase, { type IconProps } from "./IconBase";

export default function UserIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20v-.75A5.25 5.25 0 0 1 10.25 14h3.5A5.25 5.25 0 0 1 19 19.25V20" />
    </IconBase>
  );
}
