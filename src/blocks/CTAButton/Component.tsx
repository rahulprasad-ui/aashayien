// text color is not working
import React, { useId } from 'react'

export type CTAButtonProps = {
  text?: string
  url?: string
  openInNewTab?: boolean
  alignment?: 'left' | 'center' | 'right' | null
  theme?: 'primary' | 'secondary' | 'outline' | 'white' | null
}

const themeClasses: Record<string, string> = {
  primary: 'bg-[#ED1F24] border-2 border-transparent hover:bg-[#d11b20] shadow-md shadow-[#ED1F24]/20',
  secondary: 'bg-[#f59e0b] border-2 border-transparent hover:bg-[#d97706] shadow-md',
  outline: 'bg-transparent border-2 border-[#ED1F24] hover:bg-[#ED1F24]',
  white: 'bg-white border-2 border-gray-200 hover:border-gray-300 shadow-sm'
}

export const CTAButtonComponent: React.FC<CTAButtonProps> = ({ 
  text, 
  url, 
  openInNewTab, 
  alignment = 'center',
  theme = 'primary'
}) => {
  const alignmentClass = alignment === 'left' ? 'justify-start' : alignment === 'right' ? 'justify-end' : 'justify-center';
  const buttonThemeClass = themeClasses[theme || 'primary'] || themeClasses.primary;
  
  // Compute text colors dynamically to bypass global .prose CSS rules
  let defaultTextColor = 'white';
  let hoverTextClass = 'group-hover:!text-white';

  if (theme === 'outline') {
    defaultTextColor = '#ED1F24'; // Red text for outline
    hoverTextClass = 'group-hover:!text-white';
  } else if (theme === 'white') {
    defaultTextColor = 'black'; // Black text for white theme
    hoverTextClass = 'group-hover:!text-black';
  }

  return (
    <div className={`flex ${alignmentClass} my-8 not-prose w-full`}>
      <a
        href={url || '#'}
        target={openInNewTab ? '_blank' : '_self'}
        rel={openInNewTab ? 'noopener noreferrer' : undefined}
        className={`inline-flex items-center justify-center px-6 py-3 md:px-8 md:py-3.5 text-base md:text-lg font-bold rounded-xl transition-all shadow-sm hover:shadow-md hover:scale-105 active:scale-95 ${buttonThemeClass} group`}
      >
        <span style={{ color: defaultTextColor }} className={`transition-colors duration-200 ${hoverTextClass}`}>
          {text || 'Click Here (Text Missing)'}
        </span>
      </a>
    </div>
  )
}
