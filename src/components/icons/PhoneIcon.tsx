import IconBase, { type IconProps } from "./IconBase";

export default function PhoneIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="6.5" y="2.75" width="11" height="18.5" rx="2.25" />
      <path d="M10.5 18h3" />
    </IconBase>
  );
}
