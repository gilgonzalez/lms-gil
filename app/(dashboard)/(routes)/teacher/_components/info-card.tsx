import { IconBadge } from '@/components/icon-badge';
import { LucideIcon } from 'lucide-react';

interface Props {
  variant?: "default" | "success";
  icon: LucideIcon;
  numberOfItems: number;
  label:string;
}

const InfoCard = ({
  variant,
  icon:Icon,
  label,
  numberOfItems
}:Props) => {
  return (
    <div
      className="border rounded-md flex items-center gap-x-4 p-3"
    >
      <IconBadge
        variant={variant}
        icon={Icon}
      />
      <div>
        <p className="font-bold">
          {label}
        </p>
        <p className="text-gray-500 text-sm ">
          {numberOfItems} {numberOfItems === 1 ? "Course" : "Courses"}
        </p>
      </div>
    </div>
  )
}
export default InfoCard