import IconBase, { type IconProps } from "./IconBase";

export default function GraduationCapIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="m2.5 9 9.5-4.5L21.5 9 12 13.5Z" />
      <path d="M6.5 11v4.5c0 1.4 2.5 2.75 5.5 2.75s5.5-1.35 5.5-2.75V11" />
      <path d="M21.5 9v5" />
    </IconBase>
  );
}
