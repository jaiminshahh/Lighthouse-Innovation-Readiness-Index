
import React from "react";
import { icons } from "lucide-react";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface IconProps extends LucideProps {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name as keyof typeof icons];
  
  if (IconComponent) {
    return <IconComponent {...props} />;
  }
  
  // Fallback to a default icon if the requested one doesn't exist
  return <icons.HelpCircle {...props} />;
};
