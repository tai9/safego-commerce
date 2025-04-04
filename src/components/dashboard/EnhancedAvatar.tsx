
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
      status: {
        online: "ring-2 ring-green-500",
        offline: "ring-2 ring-gray-300",
        busy: "ring-2 ring-red-500",
        away: "ring-2 ring-yellow-500",
        none: "",
      },
      withBorder: {
        true: "ring-2 ring-background dark:ring-gray-800",
        false: "",
      }
    },
    defaultVariants: {
      size: "md",
      status: "none",
      withBorder: false,
    },
  }
);

export interface EnhancedAvatarProps extends VariantProps<typeof avatarVariants> {
  className?: string;
  src?: string;
  alt?: string;
  fallback: string;
}

export function EnhancedAvatar({
  className,
  size,
  status,
  withBorder,
  src,
  alt,
  fallback,
}: EnhancedAvatarProps) {
  const initials = fallback
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="relative">
      <Avatar className={cn(avatarVariants({ size, status, withBorder }), className)}>
        <AvatarImage src={src} alt={alt || fallback} />
        <AvatarFallback 
          className={cn(
            "bg-gradient-to-br from-primary/80 to-primary text-primary-foreground font-medium",
            size === "xs" ? "text-[10px]" : 
            size === "sm" ? "text-xs" : 
            size === "md" ? "text-sm" : 
            size === "lg" ? "text-base" : 
            "text-lg"
          )}
        >
          {initials}
        </AvatarFallback>
      </Avatar>
      {status && status !== "none" && (
        <span className={cn(
          "absolute bottom-0 right-0 block rounded-full ring-2 ring-background",
          size === "xs" ? "h-1.5 w-1.5" : 
          size === "sm" ? "h-2 w-2" : 
          size === "md" ? "h-2.5 w-2.5" : 
          "h-3 w-3",
          status === "online" ? "bg-green-500" : 
          status === "offline" ? "bg-gray-400" : 
          status === "busy" ? "bg-red-500" : 
          "bg-yellow-500"
        )} />
      )}
    </div>
  );
}
