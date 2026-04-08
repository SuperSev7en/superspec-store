import type { SVGProps } from 'react';

export type ThemeIconName =
  | 'account'
  | 'cart'
  | 'cart-desktop'
  | 'search'
  | 'search-desktop'
  | 'close'
  | 'select-arrow';

export function Icon({ icon, className }: { icon: ThemeIconName; className?: string }) {
  const iconClass = `${className ?? ''} Icon Icon--${icon}`.trim();

  switch (icon) {
    case 'cart':
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 17 20">
          <path
            d="M0 20V4.995l1 .006v.015l4-.002V4c0-2.484 1.274-4 3.5-4C10.518 0 12 1.48 12 4v1.012l5-.003v.985H1V19h15V6.005h1V20H0zM11 4.49C11 2.267 10.507 1 8.5 1 6.5 1 6 2.27 6 4.49V5l5-.002V4.49z"
            fill="currentColor"
          ></path>
        </svg>
      );
    case 'cart-desktop':
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 19 23">
          <path
            d="M0 22.985V5.995L2 6v.03l17-.014v16.968H0zm17-15H2v13h15v-13zm-5-2.882c0-2.04-.493-3.203-2.5-3.203-2 0-2.5 1.164-2.5 3.203v.912H5V4.647C5 1.19 7.274 0 9.5 0 11.517 0 14 1.354 14 4.647v1.368h-2v-.912z"
            fill="currentColor"
          ></path>
        </svg>
      );
    case 'search':
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 18 17">
          <g transform="translate(1 1)" stroke="currentColor" fill="none" fillRule="evenodd" strokeLinecap="square">
            <path d="M16 16l-5.0752-5.0752"></path>
            <circle cx="6.4" cy="6.4" r="6.4"></circle>
          </g>
        </svg>
      );
    case 'search-desktop':
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
    case 'account':
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
    case 'close':
      return (
        <svg className={iconClass} role="presentation" viewBox="0 0 16 14">
          <path d="M15 0L1 14m14 0L1 0" stroke="currentColor" fill="none" fillRule="evenodd"></path>
        </svg>
      );
    case 'select-arrow':
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
    default: {
      const _exhaustive: never = icon;
      return null;
    }
  }
}

export function SvgIcon(props: SVGProps<SVGSVGElement>) {
  return <svg {...props} />;
}

