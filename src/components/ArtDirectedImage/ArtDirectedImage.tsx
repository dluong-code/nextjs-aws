import { getImageProps } from "next/image";

export type SizedImage = {
  src: string;
  width: number;
  height: number;
};

export type ArtDirectedSources = {
  mobile: SizedImage;
  tablet: SizedImage;
  desktop: SizedImage;
};

type ArtDirectedImageProps = {
  sources: ArtDirectedSources;
  className?: string;
  /** Leave empty for decorative backgrounds */
  alt?: string;
};

/**
 * A different optimised image per breakpoint (tablet from 600px, desktop from
 * 1024px), so each device downloads only its own artwork.
 */
export default function ArtDirectedImage({ sources, className, alt = "" }: ArtDirectedImageProps) {
  const common = { alt, sizes: "100vw", loading: "eager" as const, fetchPriority: "high" as const };
  const srcSetFor = (image: SizedImage) => getImageProps({ ...common, ...image }).props.srcSet;
  const { props: img } = getImageProps({ ...common, ...sources.mobile });

  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={srcSetFor(sources.desktop)} />
      <source media="(min-width: 600px)" srcSet={srcSetFor(sources.tablet)} />
      <img {...img} alt={alt} className={className} />
    </picture>
  );
}
