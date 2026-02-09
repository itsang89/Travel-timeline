import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface ExpenseDonutProps {
  expenses: {
    category: string;
    amount: number;
    color: string;
  }[];
  totalCost: number;
}

export const ExpenseDonut: React.FC<ExpenseDonutProps> = ({ expenses, totalCost }) => {
  const data = {
    labels: expenses.map(e => e.category),
    datasets: [
      {
        data: expenses.map(e => e.amount),
        backgroundColor: expenses.map(e => e.color),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || '';
            const value = context.raw || 0;
            const percentage = ((value / totalCost) * 100).toFixed(1);
            return `${label}: $${value} (${percentage}%)`;
          }
        }
      }
    },
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-48 h-48 mb-8">
        <Doughnut data={data} options={options} />
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-luxury-navy/40 font-bold">Total</span>
          <span className="font-serif text-2xl font-bold text-luxury-navy">${totalCost}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-x-8 gap-y-3 w-full">
        {expenses.map((expense, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: expense.color }} />
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-luxury-navy/80">{expense.category}</span>
              <span className="font-sans text-xs text-luxury-navy/40">${expense.amount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
