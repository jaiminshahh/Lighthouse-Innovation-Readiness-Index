
import React from "react";
import { LucideIcon, LucideProps } from "lucide-react";
import * as icons from "lucide-react";

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  // Get icon component using bracket notation to access the icons object
  const IconComponent = (icons as Record<string, LucideIcon>)[name];
  
  if (IconComponent) {
    return <IconComponent {...props} />;
  }
  
  // Fallback to a default icon if the requested one doesn't exist
  return <icons.HelpCircle {...props} />;
};
