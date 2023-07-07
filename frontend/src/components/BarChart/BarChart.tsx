import React, { FC, useMemo, useState } from 'react';
import styles from './BarChart.module.scss';
import { Bar } from 'react-chartjs-2';
import { useAppSelector } from '../../hooks';

interface BarChartProps {
  chartData: any;
}

export const BarChart = () => {
  const vacations = useAppSelector((state) => state.vacationsState.vacations);

  const chartData = useMemo(() => {
    const labels = vacations.map(
      (vacation) => `${vacation.vacationId} ${vacation.destination}`
    );
    const data = vacations.map((vacations) => vacations.likesCount);
    const chartData = {
      labels,
      datasets: [
        {
          label: 'Likes',
          data,
          backgroundColor: 'rgba(75,192,192,0.6)',
        },
      ],
    };

    console.log(vacations);

    return chartData;
  }, [vacations]);

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Bar Chart</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: 'Likes for Each Vacation',
            },
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
