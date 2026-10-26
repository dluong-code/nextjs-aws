import IconBase, { type IconProps } from "./IconBase";

export default function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
      <path d="M10 14h1.5v3" />
    </IconBase>
  );
}
