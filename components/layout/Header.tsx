import { cn } from "@/lib/utils";

export function Header({
  className,
  ...props
}: React.ComponentProps<"header">) {
  return (
    <header
      className={cn(
        "flex h-14 items-center border-b border-zinc-200 px-4 dark:border-zinc-800",
        className
      )}
      {...props}
    />
  );
}
