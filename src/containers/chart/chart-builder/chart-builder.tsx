import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

interface Props {
  labels: any;
  data: any;
  cashflowDates?: any;
  cashflowAmounts?: any;
}

const ChartBuilder: React.FC<Props> = ({
  labels,
  data,
  cashflowDates,
  cashflowAmounts,
}) => {
  const mainData = {
    labels: labels,
    datasets: [
      {
        label: 'Records',
        data: data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const cashflowData = {
    labels: cashflowDates,
    datasets: [
      {
        label: 'Cashflow',
        data: cashflowAmounts,
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(255, 159, 64, 0.6)',
        ],
      },
    ],
  };

  return (
    <React.Fragment>
      <Pie
        data={mainData}
        options={{
          title: {
            display: true,
            text: 'Records by Categories',
            fontSize: 25,
          },
          legend: {
            display: true,
            position: 'right',
          },
        }}
      />

      <Bar
        data={mainData}
        options={{
          title: {
            display: 'Chart',
            text: 'Balance Trend',
            fontSize: 25,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />

      <Line
        data={cashflowData}
        options={{
          title: {
            display: true,
            text: 'Cashflow',
            fontSize: 25,
          },
          legend: {
            display: false,
            position: 'right',
          },
        }}
      />
    </React.Fragment>
  );
};

export default ChartBuilder;
