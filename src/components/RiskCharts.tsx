import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { TrendingUp, PieChart, ShieldAlert, Sparkles } from 'lucide-react';

export const RiskCharts: React.FC = () => {
  const lineChartRef = useRef<HTMLCanvasElement | null>(null);
  const doughnutChartRef = useRef<HTMLCanvasElement | null>(null);
  const lineChartInstance = useRef<Chart | null>(null);
  const doughnutChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    // 1. Line Chart: ML Delay Prediction (Actual vs. Forecasted over 14 days)
    if (lineChartRef.current) {
      if (lineChartInstance.current) {
        lineChartInstance.current.destroy();
      }

      const ctx = lineChartRef.current.getContext('2d');
      if (ctx) {
        // Create subtle gradient fills
        const forecastGradient = ctx.createLinearGradient(0, 0, 0, 300);
        forecastGradient.addColorStop(0, 'rgba(0, 112, 242, 0.25)');
        forecastGradient.addColorStop(1, 'rgba(0, 112, 242, 0.01)');

        const actualGradient = ctx.createLinearGradient(0, 0, 0, 300);
        actualGradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
        actualGradient.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

        const days = Array.from({ length: 14 }, (_, i) => `Day +${i + 1}`);
        // Actual historical tracking (days 1 to 5) + simulated actuals
        const actualDelays = [1.2, 1.5, 2.1, 2.8, 3.4, null, null, null, null, null, null, null, null, null];
        // ML Neural Network forecast across full 14 days
        const mlForecast = [1.1, 1.6, 2.3, 3.0, 3.8, 5.2, 6.4, 7.8, 8.5, 9.1, 7.6, 6.0, 4.2, 2.5];
        // Confidence upper bound
        const confidenceUpper = [1.3, 1.9, 2.7, 3.5, 4.5, 6.1, 7.5, 9.2, 10.0, 10.8, 9.2, 7.5, 5.4, 3.6];

        lineChartInstance.current = new Chart(ctx, {
          type: 'line',
          data: {
            labels: days,
            datasets: [
              {
                label: 'Actual Observed Delay (Days)',
                data: actualDelays,
                borderColor: '#10b981', // Emerald
                backgroundColor: actualGradient,
                borderWidth: 2.5,
                pointBackgroundColor: '#10b981',
                pointBorderColor: '#ffffff',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35,
                fill: true,
              },
              {
                label: 'ML Predicted Delay (7-14 Day Horizon)',
                data: mlForecast,
                borderColor: '#0070f2', // SAP Blue
                backgroundColor: forecastGradient,
                borderWidth: 2.5,
                borderDash: [5, 5],
                pointBackgroundColor: '#0070f2',
                pointBorderColor: '#93c5fd',
                pointRadius: 4,
                pointHoverRadius: 6,
                tension: 0.35,
                fill: true,
              },
              {
                label: '95% Confidence Interval Band',
                data: confidenceUpper,
                borderColor: 'rgba(56, 189, 248, 0.3)',
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                borderWidth: 1,
                pointRadius: 0,
                tension: 0.35,
                fill: '-1',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
              mode: 'index',
              intersect: false,
            },
            plugins: {
              legend: {
                position: 'top',
                labels: {
                  color: '#94a3b8',
                  boxWidth: 14,
                  font: {
                    family: "'Plus Jakarta Sans', sans-serif",
                    size: 11,
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                  label: (item) => `${item.dataset.label}: ${item.parsed.y !== null ? `${item.parsed.y} days` : 'N/A'}`,
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: 'rgba(51, 65, 85, 0.4)',
                },
                ticks: {
                  color: '#64748b',
                  font: {
                    size: 10,
                  },
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Average Delay (Days)',
                  color: '#64748b',
                  font: {
                    size: 11,
                  },
                },
                grid: {
                  color: 'rgba(51, 65, 85, 0.4)',
                },
                ticks: {
                  color: '#64748b',
                  font: {
                    size: 10,
                  },
                  stepSize: 2,
                },
                min: 0,
                max: 12,
              },
            },
          },
        });
      }
    }

    // 2. Doughnut Chart: Risk Factor Breakdown
    // Weather 40%, Labor 30%, Logistics 20%, Demand Volatility 10%
    if (doughnutChartRef.current) {
      if (doughnutChartInstance.current) {
        doughnutChartInstance.current.destroy();
      }

      const dCtx = doughnutChartRef.current.getContext('2d');
      if (dCtx) {
        doughnutChartInstance.current = new Chart(dCtx, {
          type: 'doughnut',
          data: {
            labels: [
              'Weather Anomalies (Typhoon/Storm)',
              'Labor & Port Strikes',
              'Logistics & Vessel Congestion',
              'Demand & Buffer Volatility',
            ],
            datasets: [
              {
                data: [40, 30, 20, 10],
                backgroundColor: [
                  '#f59e0b', // Weather (Gold/Amber)
                  '#ef4444', // Labor (Red)
                  '#0070f2', // Logistics (SAP Blue)
                  '#8b5cf6', // Demand (Purple)
                ],
                borderColor: '#0f172a',
                borderWidth: 3,
                hoverOffset: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '70%',
            plugins: {
              legend: {
                position: 'bottom',
                labels: {
                  color: '#94a3b8',
                  boxWidth: 12,
                  padding: 12,
                  font: {
                    family: "'Plus Jakarta Sans', sans-serif",
                    size: 11,
                  },
                },
              },
              tooltip: {
                backgroundColor: 'rgba(15, 23, 42, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#cbd5e1',
                borderColor: '#334155',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                  label: (item) => ` ${item.label}: ${item.raw}% Impact Factor`,
                },
              },
            },
          },
        });
      }
    }

    return () => {
      if (lineChartInstance.current) lineChartInstance.current.destroy();
      if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      
      {/* 1. ML Delay Prediction Chart (2 cols on lg) */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                ML Delay Prediction Engine
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 border border-blue-500/20">
                  <Sparkles className="h-2.5 w-2.5" /> 7-14 Day Early Warning
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Continuous neural forecast vs. historical SAP telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-500"></span> ML Model
            </span>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="h-64 w-full">
          <canvas ref={lineChartRef} />
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-800/60 pt-3 text-xs text-slate-400">
          <span className="text-slate-400 font-medium">
            Peak disruption expected around <strong className="text-amber-400">Day +9</strong> (+9.1 days max delay)
          </span>
          <span className="text-[11px] text-slate-500">Model Accuracy: 94.2%</span>
        </div>
      </div>

      {/* 2. Risk Factor Breakdown Doughnut (1 col on lg) */}
      <div className="relative overflow-hidden rounded-xl border border-slate-800/80 bg-slate-900/60 p-5 backdrop-blur-md shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <PieChart className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Risk Factor Breakdown
              </h3>
              <p className="text-xs text-slate-400">
                Primary disruption drivers across global nodes
              </p>
            </div>
          </div>
        </div>

        {/* Chart Canvas */}
        <div className="relative h-64 w-full flex items-center justify-center">
          <canvas ref={doughnutChartRef} />
          {/* Centered Stat in Doughnut */}
          <div className="pointer-events-none absolute flex flex-col items-center justify-center text-center">
            <span className="font-mono text-xl font-extrabold text-white">40%</span>
            <span className="text-[10px] uppercase tracking-wider text-amber-400 font-semibold">Weather</span>
          </div>
        </div>

        <div className="mt-2 border-t border-slate-800/60 pt-2.5 text-center text-xs text-slate-400">
          <span>Leading threat: Severe tropical weather in Taiwan Strait & East Asia</span>
        </div>
      </div>

    </div>
  );
};
