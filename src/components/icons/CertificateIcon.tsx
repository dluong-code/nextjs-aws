import IconBase, { type IconProps } from "./IconBase";

export default function CertificateIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 20H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6" />
      <path d="M8 8h8M8 12h4" />
      <circle cx="17.5" cy="15.5" r="2.5" />
      <path d="m16 17.5-.75 3.5 2.25-1.25 2.25 1.25-.75-3.5" />
    </IconBase>
  );
}
