import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const MonthlyJobsChart = ({ data }) => {
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const fullData = months.map((month) => {
    const found = data.find((item) => item.month.startsWith(month));
    return {
      month,
      count: found ? found.count : 0,
    };
  });

  return (
    <div className="w-full">
      <h2 className="text-base sm:text-lg font-semibold mb-4 text-center">
        Monthly Applications
      </h2>

      {/* 📱 Responsive height */}
      <div className="w-full h-[250px] sm:h-[320px] md:h-[400px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={fullData} margin={{ top: 10, right: 10, left: -10, bottom: 20 }}>
            
            <CartesianGrid strokeDasharray="3 3" />

            {/* 📱 Rotate labels on mobile */}
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10 }}
              angle={-30}
              textAnchor="end"
              interval={0}
            />

            <YAxis tick={{ fontSize: 10 }} />

            {/* 📱 Smaller tooltip */}
            <Tooltip
              contentStyle={{ fontSize: "12px" }}
              formatter={(value) => [`${value} jobs`, "Applications"]}
            />

            <Bar
              dataKey="count"
              fill="#60a5fa"
              radius={[4, 4, 0, 0]}
              barSize={20}   // 📱 smaller bars
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyJobsChart;