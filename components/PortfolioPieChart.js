
import { Pie } from 'react-chartjs-2';

export default function PortfolioPieChart({ data }) {
  const chartData = {
    labels: data ? data.map(row => row.asset) : [],
    datasets: [
      {
        data: data ? data.map(row => row.usdValue) : [],
        backgroundColor: [
          '#00ffa3', '#232946', '#eebbc3', '#b8c1ec', '#ff6f61', '#f7c873', '#6a0572', '#2d6cdf'
        ],
      },
    ],
  };
  return (
    <div className="bg-white dark:bg-[#232946] rounded-lg shadow-lg p-4">
      <Pie data={chartData} />
    </div>
  );
}
