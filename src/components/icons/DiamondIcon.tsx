import IconBase, { type IconProps } from "./IconBase";

export default function DiamondIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6.5 4h11l3.5 5-9 11L3 9Z" />
      <path d="M3 9h18M9.5 4 8 9l4 11 4-11-1.5-5" />
    </IconBase>
  );
}
