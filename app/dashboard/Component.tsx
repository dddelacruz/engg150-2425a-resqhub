import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { hour: "00:00", people: 12 },
  { hour: "01:00", people: 18 },
  { hour: "02:00", people: 20 },
  { hour: "03:00", people: 9 },
  { hour: "04:00", people: 15 },
  { hour: "05:00", people: 30 },
  { hour: "06:00", people: 25 },
  { hour: "07:00", people: 40 },
  { hour: "08:00", people: 60 },
  { hour: "09:00", people: 55 },
  { hour: "10:00", people: 45 },
  { hour: "11:00", people: 50 },
  { hour: "12:00", people: 65 },
  { hour: "13:00", people: 70 },
  { hour: "14:00", people: 80 },
  { hour: "15:00", people: 75 },
  { hour: "16:00", people: 85 },
  { hour: "17:00", people: 90 },
  { hour: "18:00", people: 95 },
  { hour: "19:00", people: 100 },
  { hour: "20:00", people: 105 },
  { hour: "21:00", people: 110 },
  { hour: "22:00", people: 115 },
  { hour: "23:00", people: 120 },
];

const chartConfig = {
  people: {
    label: "No. of People",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export default function Component() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Linear</CardTitle>
        <CardDescription>Showing people per hour</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" hideLabel />}
            />
            <Area
              dataKey="people"
              type="linear"
              fill="var(--color-people)"
              fillOpacity={0.4}
              stroke="var(--color-people)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
