import Link from "next/link";
import type { ComponentProps } from "react";
import styles from "./Logo.module.css";

type LogoProps = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  href?: ComponentProps<typeof Link>["href"];
  /** "light" for use on dark backgrounds */
  tone?: "dark" | "light";
};

export default function Logo({ href = "/", tone = "dark", className, ...props }: LogoProps) {
  return (
    <Link
      href={href}
      className={[styles.logo, styles[tone], className].filter(Boolean).join(" ")}
      aria-label="TL Nails Academy home"
      {...props}
    >
      {/* Cropped to the artwork so the logo aligns with the page edge */}
      <svg className={styles.svg} viewBox="12 20 261 86" aria-hidden="true" focusable="false">
        <g className={styles.mark}>
          <path d="M642 689H40L38 486H67C73 545 89 588 114 613C139 638 185 653 250 656L295 658V31H202V0H480V31H386V658L432 656C497 653 543 638 569 611C595 584 610 543 614 486H644Z" transform="translate(10.000 93.000) scale(0.104000 -0.104000)" />
          <path d="M570 239C567 172 545 120 506 83C493 70 473 59 446 49C420 39 398 34 380 34L227 31V658H321V689H44V658H138V31H44V0H589L602 239Z" transform="translate(39.000 104.000) scale(0.101000 -0.101000)" />
        </g>
        <g className={styles.wordmark}>
          <path d="M201 1493H473L1135 244V1493H1331V0H1059L397 1249V0H201Z" transform="translate(137.000 49.000) scale(0.010742 -0.010742)" />
          <path d="M700 1294 426 551H975ZM586 1493H815L1384 0H1174L1038 383H365L229 0H16Z" transform="translate(158.957 49.000) scale(0.010742 -0.010742)" />
          <path d="M201 1493H403V0H201Z" transform="translate(179.507 49.000) scale(0.010742 -0.010742)" />
          <path d="M201 1493H403V170H1130V0H201Z" transform="translate(191.495 49.000) scale(0.010742 -0.010742)" />
          <path d="M1096 1444V1247Q981 1302 879.0 1329.0Q777 1356 682 1356Q517 1356 427.5 1292.0Q338 1228 338 1110Q338 1011 397.5 960.5Q457 910 623 879L745 854Q971 811 1078.5 702.5Q1186 594 1186 412Q1186 195 1040.5 83.0Q895 -29 614 -29Q508 -29 388.5 -5.0Q269 19 141 66V274Q264 205 382.0 170.0Q500 135 614 135Q787 135 881.0 203.0Q975 271 975 397Q975 507 907.5 569.0Q840 631 686 662L563 686Q337 731 236.0 827.0Q135 923 135 1094Q135 1292 274.5 1406.0Q414 1520 659 1520Q764 1520 873.0 1501.0Q982 1482 1096 1444Z" transform="translate(209.252 49.000) scale(0.010742 -0.010742)" />
          <path d="M700 1294 426 551H975ZM586 1493H815L1384 0H1174L1038 383H365L229 0H16Z" transform="translate(137.000 84.000) scale(0.010742 -0.010742)" />
          <path d="M1319 1378V1165Q1217 1260 1101.5 1307.0Q986 1354 856 1354Q600 1354 464.0 1197.5Q328 1041 328 745Q328 450 464.0 293.5Q600 137 856 137Q986 137 1101.5 184.0Q1217 231 1319 326V115Q1213 43 1094.5 7.0Q976 -29 844 -29Q505 -29 310.0 178.5Q115 386 115 745Q115 1105 310.0 1312.5Q505 1520 844 1520Q978 1520 1096.5 1484.5Q1215 1449 1319 1378Z" transform="translate(156.200 84.000) scale(0.010742 -0.010742)" />
          <path d="M700 1294 426 551H975ZM586 1493H815L1384 0H1174L1038 383H365L229 0H16Z" transform="translate(175.711 84.000) scale(0.010742 -0.010742)" />
          <path d="M403 1327V166H647Q956 166 1099.5 306.0Q1243 446 1243 748Q1243 1048 1099.5 1187.5Q956 1327 647 1327ZM201 1493H616Q1050 1493 1253.0 1312.5Q1456 1132 1456 748Q1456 362 1252.0 181.0Q1048 0 616 0H201Z" transform="translate(194.911 84.000) scale(0.010742 -0.010742)" />
          <path d="M201 1493H1145V1323H403V881H1114V711H403V170H1163V0H201Z" transform="translate(216.001 84.000) scale(0.010742 -0.010742)" />
          <path d="M201 1493H502L883 477L1266 1493H1567V0H1370V1311L985 287H782L397 1311V0H201Z" transform="translate(234.052 84.000) scale(0.010742 -0.010742)" />
          <path d="M-4 1493H213L627 879L1038 1493H1255L727 711V0H524V711Z" transform="translate(257.183 84.000) scale(0.010742 -0.010742)" />
        </g>
      </svg>
    </Link>
  );
}
