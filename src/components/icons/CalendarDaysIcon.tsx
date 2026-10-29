import IconBase, { type IconProps } from "./IconBase";

export default function CalendarDaysIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3.5" y="5" width="17" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M3.5 10h17" />
      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 16.75h.01M12 16.75h.01M16 16.75h.01" strokeWidth={2.25} />
    </IconBase>
  );
}
