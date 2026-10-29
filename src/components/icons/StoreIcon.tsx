import IconBase, { type IconProps } from "./IconBase";

export default function StoreIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 10v10h16V10" />
      <path d="M3 10 5 4h14l2 6a2.5 2.5 0 0 1-4.5 1.5 2.5 2.5 0 0 1-4.5 0 2.5 2.5 0 0 1-4.5 0A2.5 2.5 0 0 1 3 10Z" />
      <path d="M10 20v-5h4v5" />
    </IconBase>
  );
}
