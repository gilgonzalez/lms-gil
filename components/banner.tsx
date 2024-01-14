import { AlertTriangle, CheckCircleIcon } from 'lucide-react'

import { cva, type VariantProps} from 'class-variance-authority';
import { cn } from '@/lib/utils';

const bannerVariants = cva(
  "border text-center p-4 text-sm font-medium flex items-center w-full",
  {
    variants :{
      variant :{
        warning: "bg-yellow-200 border-yellow-70 text-yellow-700",
        success: "bg-emerald-200 border-green-70 text-emerald-700"
      },
    },
    defaultVariants : {
      variant: "success"
    }
  }
)

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
}

interface Props extends VariantProps<typeof bannerVariants>  {
  label: string
}

export const Banner = ({label, variant}:Props)=> {
  const Icon = iconMap[variant || "success"]
  return (
    <div className={cn(bannerVariants({variant}))}>
      <Icon className="h-4 w-4 mr-2"/>
      {label}    </div>
  )
}