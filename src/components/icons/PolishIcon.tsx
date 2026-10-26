import IconBase, { type IconProps } from "./IconBase";

export default function PolishIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 3.5h2v6H7z" />
      <path d="M5.5 12a2.5 2.5 0 0 1 2.5-2.5h0A2.5 2.5 0 0 1 10.5 12v8.5h-5Z" />
      <path d="M15 6.5h2v5h-2z" />
      <path d="M13.5 14a2.5 2.5 0 0 1 2.5-2.5h0a2.5 2.5 0 0 1 2.5 2.5v6.5h-5Z" />
      <path d="M3.5 20.5h17" />
    </IconBase>
  );
}
