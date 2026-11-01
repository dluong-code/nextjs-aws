import IconBase, { type IconProps } from "./IconBase";

export default function LayersIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m12 4 9 4.5-9 4.5-9-4.5Z" />
      <path d="m3 12.5 9 4.5 9-4.5" />
      <path d="m3 16.5 9 4.5 9-4.5" />
    </IconBase>
  );
}
