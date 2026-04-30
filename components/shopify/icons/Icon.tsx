import type { SVGProps } from "react";

export type ThemeIconName =
  | "account"
  | "cart"
  | "cart-desktop"
  | "search"
  | "search-desktop"
  | "close"
  | "select-arrow"
  | "nav"
  | "nav-desktop"
  | "heart"
  | "link"
  | "twitter"
  | "whatsapp";

export function Icon({
  icon,
  className,
}: {
  icon: ThemeIconName;
  className?: string;
}) {
  const iconClass = `${className ?? ""} Icon Icon--${icon}`.trim();

  switch (icon) {
    case "cart":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 17 20">
          <path
            d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
            fill="currentColor"
          ></path>
        </svg>
      );
    case "cart-desktop":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 19 23">
          <path
            d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
            fill="currentColor"
          ></path>
        </svg>
      );
    case "search":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 18 17">
          <g
            transform="translate(1 1)"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
          >
            <path d="M16 16l-5.0752-5.0752"></path>
            <circle cx="6.4" cy="6.4" r="6.4"></circle>
          </g>
        </svg>
      );
    case "search-desktop":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 21 21">
          <g
            transform="translate(1 1)"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
          >
            <path d="M18 18l-5.7096-5.7096"></path>
            <circle cx="7.2" cy="7.2" r="7.2"></circle>
          </g>
        </svg>
      );
    case "account":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 20 20">
          <g
            transform="translate(1 1)"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="square"
          >
            <path d="M0 18c0-4.5188182 3.663-8.18181818 8.18181818-8.18181818h1.63636364C14.337 9.81818182 18 13.4811818 18 18"></path>
            <circle cx="9" cy="4.90909091" r="4.90909091"></circle>
          </g>
        </svg>
      );
    case "close":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 16 14">
          <path
            d="M15 0L1 14m14 0L1 0"
            stroke="currentColor"
            fill="none"
            fillRule="evenodd"
          ></path>
        </svg>
      );
    case "select-arrow":
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 19 12">
          <polyline
            fill="none"
            stroke="currentColor"
            points="17 2 9.5 10 2 2"
            fillRule="evenodd"
            strokeWidth="2"
            strokeLinecap="square"
          ></polyline>
        </svg>
      );
    case "nav":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 18 12"
          fill="currentColor"
        >
          <rect y="0" width="18" height="2" />
          <rect y="5" width="18" height="2" />
          <rect y="10" width="18" height="2" />
        </svg>
      );
    case "nav-desktop":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 22 16"
          fill="currentColor"
        >
          <rect y="0" width="22" height="2" />
          <rect y="7" width="22" height="2" />
          <rect y="14" width="22" height="2" />
        </svg>
      );
    case "heart":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
      );
    case "link":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
        </svg>
      );
    case "twitter":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg
          className={iconClass}
          role="presentation"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    default: {
      const _exhaustive: never = icon;
      return null;
    }
  }
}

export function SvgIcon(props: SVGProps<SVGSVGElement>) {
  return <svg {...props} />;
}
