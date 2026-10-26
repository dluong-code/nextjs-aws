import IconBase, { type IconProps } from "./IconBase";

export default function SproutStarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2.75l2.2 4.46 4.92.72-3.56 3.47.84 4.9L12 14" />
      <path d="M12 2.75 9.8 7.21l-4.92.72 3.56 3.47-.84 4.9" />
      <path d="M12 21.25V13" />
      <path d="M12 17c-2.6 0-4.25-1.4-4.5-3.75 2.6 0 4.25 1.4 4.5 3.75Z" />
      <path d="M12 15.5c2.1 0 3.6-1.1 3.9-3.1-2.1 0-3.6 1.1-3.9 3.1Z" />
    </IconBase>
  );
}
