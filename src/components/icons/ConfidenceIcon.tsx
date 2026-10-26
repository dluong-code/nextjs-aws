import IconBase, { type IconProps } from "./IconBase";

export default function ConfidenceIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="7.5" r="3.25" />
      <path d="M5.5 20.5v-1.25A5.25 5.25 0 0 1 10.75 14h2.5a5.25 5.25 0 0 1 5.25 5.25v1.25" />
      <path d="m19.25 3.25.45 1.05 1.05.45-1.05.45-.45 1.05-.45-1.05-1.05-.45 1.05-.45Z" />
    </IconBase>
  );
}
