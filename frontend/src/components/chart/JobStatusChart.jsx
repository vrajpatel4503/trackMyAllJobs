import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from "recharts";

const JobStatusChart = ({ stats }) => {
  if (!stats) return null; // important safety

  const statusColorMap = {
    applied: "#fbbf24",
    interview: "#60a5fa",
    rejected: "#f87171",
    offer: "#34d399",
    no_response: "#9ca3af",
  };

  const data = [
    { name: "Applied", value: stats.applied, fill: statusColorMap.applied },
    { name: "Interview", value: stats.interview, fill: statusColorMap.interview },
    { name: "Offer", value: stats.offer, fill: statusColorMap.offer },
    { name: "Rejected", value: stats.rejected, fill: statusColorMap.rejected },
    { name: "No Response", value: stats.no_response, fill: statusColorMap.no_response },
  ];

  return (
    <div className="w-full min-w-0 flex flex-col items-center">
      <h2 className="text-lg font-semibold mb-4">
        Job Status Distribution
      </h2>

      
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              outerRadius="70%"
              label
              paddingAngle={5}
            />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default JobStatusChart;