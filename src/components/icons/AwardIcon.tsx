import IconBase, { type IconProps } from "./IconBase";

export default function AwardIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="9" r="6" />
      <circle cx="12" cy="9" r="3" />
      <path d="m8.5 13.9-1.5 7.35 5-2.5 5 2.5-1.5-7.35" />
    </IconBase>
  );
}
