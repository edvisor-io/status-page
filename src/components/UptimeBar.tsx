import { useState } from 'react';
import { DayStatus } from '@/types/status';

interface UptimeBarProps {
  dailyHistory: DayStatus[];
}

function getUptimeColor(uptime: number, status: DayStatus['status']): string {
  if (status === 'incident') {
    return 'bg-red-500';
  }
  if (uptime >= 100) {
    return 'bg-green-500';
  }
  if (uptime >= 95) {
    return 'bg-yellow-500';
  }
  return 'bg-red-500';
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  day: DayStatus | null;
}

export function UptimeBar({ dailyHistory }: UptimeBarProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    day: null,
  });

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement>,
    day: DayStatus
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top,
      day,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ visible: false, x: 0, y: 0, day: null });
  };

  // Ensure we have 90 days, most recent on the right
  const sortedHistory = [...dailyHistory].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="relative">
      <div className="flex gap-0.5">
        {sortedHistory.map((day) => (
          <div
            key={day.date}
            className={`flex-1 h-8 rounded-sm cursor-pointer transition-transform hover:scale-110 ${getUptimeColor(day.uptime, day.status)}`}
            onMouseEnter={(e) => handleMouseEnter(e, day)}
            onMouseLeave={handleMouseLeave}
            style={{ minWidth: '2px' }}
          />
        ))}
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.day && (
        <div
          className="fixed z-50 px-3 py-2 text-sm bg-gray-900 text-white rounded-lg shadow-lg pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          <div className="font-medium">{formatDate(tooltip.day.date)}</div>
          <div className="text-gray-300">
            {tooltip.day.uptime.toFixed(2)}% uptime
          </div>
          {tooltip.day.incidents > 0 && (
            <div className="text-red-400">
              {tooltip.day.incidents} incident{tooltip.day.incidents > 1 ? 's' : ''}
            </div>
          )}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"
          />
        </div>
      )}

      {/* Date labels */}
      <div className="flex justify-between mt-1 text-xs text-gray-500">
        <span>90 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
