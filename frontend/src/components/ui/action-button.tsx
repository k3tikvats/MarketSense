import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { ButtonProps } from "@/components/ui/button";

interface ActionButtonProps extends ButtonProps {
  navigateTo?: string;
  onClick?: () => void;
  showToast?: {
    title: string;
    description?: string;
  };
  children: React.ReactNode;
}

export function ActionButton({ 
  navigateTo, 
  onClick, 
  showToast, 
  children,
  ...props 
}: ActionButtonProps) {
  
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
    
    if (showToast) {
      toast({
        title: showToast.title,
        description: showToast.description
      });
    }
  };
  
  if (navigateTo) {
    return (
      <Link to={navigateTo}>
        <Button onClick={handleClick} {...props}>
          {children}
        </Button>
      </Link>
    );
  }
  
  return (
    <Button onClick={handleClick} {...props}>
      {children}
    </Button>
  );
}