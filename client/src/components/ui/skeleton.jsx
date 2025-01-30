import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (<div className={cn("animate-pulse rounded-md bg-muted flex flex-col justify-center items-center", className)} {...props} >
    
    <div className="text-3xl text-white font-bold">
      Loading
    </div>
    </div>
    );
}

export { Skeleton }
