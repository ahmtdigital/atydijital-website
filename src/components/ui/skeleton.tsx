
import { cn } from "@/lib/utils"

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "card" | "text" | "avatar" | "button";
  animation?: "pulse" | "wave" | "shimmer" | "none";
}

function Skeleton({
  className,
  variant = "default",
  animation = "pulse",
  ...props
}: SkeletonProps) {
  const baseClass = "rounded-md";
  
  const variantClasses = {
    default: "bg-muted",
    card: "bg-muted/60 border border-muted/30",
    text: "h-4 w-full max-w-[80%]",
    avatar: "h-12 w-12 rounded-full",
    button: "h-10 w-32"
  };
  
  const animationClasses = {
    pulse: "animate-pulse",
    wave: "animate-[wave_2s_linear_infinite]",
    shimmer: "animate-[shimmer_1.5s_infinite]",
    none: ""
  };
  
  return (
    <div
      className={cn(
        baseClass, 
        variantClasses[variant],
        animationClasses[animation],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }
