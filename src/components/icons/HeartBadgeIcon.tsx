import IconBase, { type IconProps } from "./IconBase";

export default function HeartBadgeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 2.75 14 4.3l2.5-.3.95 2.33 2.33.95-.3 2.5L21 12l-1.52 2 .3 2.5-2.33.95-.95 2.33-2.5-.3L12 21.25 10 19.7l-2.5.3-.95-2.33-2.33-.95.3-2.5L3 12l1.52-2-.3-2.5 2.33-.95.95-2.33 2.5.3Z" />
      <path d="M12 15.75s-3.5-2.1-3.5-4.6a1.9 1.9 0 0 1 3.5-1.05 1.9 1.9 0 0 1 3.5 1.05c0 2.5-3.5 4.6-3.5 4.6Z" />
    </IconBase>
  );
}
