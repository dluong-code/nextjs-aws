import IconBase, { type IconProps } from "./IconBase";

/** Points right; rotate with CSS for other directions */
export default function ChevronIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m9 5 7 7-7 7" />
    </IconBase>
  );
}
