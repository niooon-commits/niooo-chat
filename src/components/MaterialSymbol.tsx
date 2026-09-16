import React from 'react';

export type MaterialSymbolStyle = 'outlined' | 'rounded' | 'sharp';

export interface MaterialSymbolProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** The icon name from Google Material Symbols (e.g. 'home', 'search', 'settings', 'favorite') */
  name: string;
  /** Size in pixels (number) or CSS string (e.g. 24, '1.5rem'). Defaults to 24. */
  size?: number | string;
  /** Whether the symbol should be filled. Defaults to false. */
  fill?: boolean;
  /** Stroke weight: 100 to 700. Defaults to 400. */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  /** Grade attribute: -25, 0, or 200. Defaults to 0. */
  grade?: -25 | 0 | 200;
  /** Optical size: 20, 24, 40, or 48. Defaults to 24. */
  opticalSize?: 20 | 24 | 40 | 48;
  /** Style variant: 'outlined' | 'rounded' | 'sharp'. Defaults to 'outlined'. */
  symbolStyle?: MaterialSymbolStyle;
  /** Additional Tailwind or CSS classes */
  className?: string;
}

/**
 * Universal Material Symbols Icon component for React and Web applications,
 * conforming to @expo/material-symbols naming conventions and standards.
 */
export const MaterialSymbol: React.FC<MaterialSymbolProps> = ({
  name,
  size = 24,
  fill = false,
  weight = 400,
  grade = 0,
  opticalSize = 24,
  symbolStyle = 'outlined',
  className = '',
  style,
  ...props
}) => {
  const styleClass = symbolStyle === 'rounded' 
    ? 'material-symbols-rounded' 
    : symbolStyle === 'sharp' 
    ? 'material-symbols-sharp' 
    : 'material-symbols-outlined';

  const fontVariation = `'FILL' ${fill ? 1 : 0}, 'wght' ${weight}, 'GRAD' ${grade}, 'opsz' ${opticalSize}`;

  return (
    <span
      className={`${styleClass} inline-flex items-center justify-center select-none leading-none align-middle ${className}`}
      style={{
        fontSize: typeof size === 'number' ? `${size}px` : size,
        width: typeof size === 'number' ? `${size}px` : size,
        height: typeof size === 'number' ? `${size}px` : size,
        fontVariationSettings: fontVariation,
        ...style
      }}
      aria-hidden="true"
      {...props}
    >
      {name}
    </span>
  );
};

export default MaterialSymbol;
