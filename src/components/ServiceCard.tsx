import { ServiceStatus } from '@/types/status';
import { StatusBadge } from './StatusBadge';
import { UptimeBar } from './UptimeBar';

interface ServiceCardProps {
  service: ServiceStatus;
}

export function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
          <StatusBadge status={service.status} size="sm" />
        </div>
        <div className="text-right">
          <span className="text-sm font-medium text-gray-700">
            {service.uptime30d.toFixed(2)}% uptime
          </span>
          <span className="text-xs text-gray-500 block">last 30 days</span>
        </div>
      </div>

      <UptimeBar dailyHistory={service.dailyHistory} />
    </div>
  );
}
