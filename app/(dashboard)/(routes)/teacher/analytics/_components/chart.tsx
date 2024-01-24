"use client"

import { Card } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis
} from "recharts"

interface Props {

  data: {
    name:string;
    total: number;
  }[]
}

const Chart = ({data}:Props) => {
  return (
    <Card>
      <ResponsiveContainer width="100%" height={350} >
        <BarChart className="mt-3" data={data} >
          <XAxis dataKey="name" stroke="#888" fontSize={12} tickLine={false} axisLine={false}  />
          <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value)=>`${value}€`}/>
          <Bar dataKey="total" fill="#070" radius={[4,4,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
export default Chart