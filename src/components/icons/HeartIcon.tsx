import IconBase, { type IconProps } from "./IconBase";

export default function HeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 20s-7.5-4.6-7.5-10.1A4.15 4.15 0 0 1 12 7.45a4.15 4.15 0 0 1 7.5 2.45C19.5 15.4 12 20 12 20Z" />
    </IconBase>
  );
}
