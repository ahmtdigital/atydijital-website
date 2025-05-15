
import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"
import { cn } from "@/lib/utils"

interface AspectRatioProps extends React.ComponentPropsWithoutRef<typeof AspectRatioPrimitive.Root> {
  className?: string;
  wrapperClassName?: string;
}

const AspectRatio = ({
  className,
  wrapperClassName,
  ...props
}: AspectRatioProps) => (
  <div className={cn("overflow-hidden rounded-md", wrapperClassName)}>
    <AspectRatioPrimitive.Root
      className={cn("relative", className)}
      {...props}
    />
  </div>
)

export { AspectRatio }
