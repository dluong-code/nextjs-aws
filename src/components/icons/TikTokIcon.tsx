import IconBase, { type IconProps } from "./IconBase";

export default function TikTokIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 3c.4 2.8 2.2 4.6 5 5" />
    </IconBase>
  );
}
