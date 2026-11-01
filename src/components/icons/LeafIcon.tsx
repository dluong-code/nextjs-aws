import IconBase, { type IconProps } from "./IconBase";

export default function LeafIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 21c0-8 4-13 15-15-1 9-5.5 13.5-13 13.5" />
      <path d="M5 21c2-4.5 5-7.5 9-9.5" />
      <path d="M8.5 12.5C6.4 12.2 4 10.6 3.5 7c3 .2 5 1.6 6 3.5" />
    </IconBase>
  );
}
