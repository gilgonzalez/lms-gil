import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPrice } from '@/lib/format';

interface Props{
  value: number;
  label:string;
  shouldFormat?:boolean;
}

const DataCard = ({
  value, label, shouldFormat
}:Props) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-2 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {label}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-extrabold">
          {shouldFormat ? formatPrice(value): value}
        </div>
      </CardContent>
    </Card>
  )
}
export default DataCard