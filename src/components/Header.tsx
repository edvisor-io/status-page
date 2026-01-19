import { ServiceStatusType, STATUS_CONFIG } from '@/types/status';
import { CheckCircle, AlertTriangle, XCircle, Wrench } from 'lucide-react';

interface HeaderProps {
  overallStatus: ServiceStatusType;
  lastUpdated: string;
}

function getStatusIcon(status: ServiceStatusType) {
  switch (status) {
    case 'operational':
      return <CheckCircle className="w-8 h-8 text-green-500" />;
    case 'degraded':
    case 'partial_outage':
      return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
    case 'major_outage':
      return <XCircle className="w-8 h-8 text-red-500" />;
    case 'maintenance':
      return <Wrench className="w-8 h-8 text-blue-500" />;
    default:
      return <CheckCircle className="w-8 h-8 text-green-500" />;
  }
}

function getStatusMessage(status: ServiceStatusType): string {
  switch (status) {
    case 'operational':
      return 'All Systems Operational';
    case 'degraded':
      return 'Some Systems Experiencing Degraded Performance';
    case 'partial_outage':
      return 'Partial System Outage';
    case 'major_outage':
      return 'Major System Outage';
    case 'maintenance':
      return 'Scheduled Maintenance in Progress';
    default:
      return 'All Systems Operational';
  }
}

export function Header({ overallStatus, lastUpdated }: HeaderProps) {
  const config = STATUS_CONFIG[overallStatus];
  const formattedDate = new Date(lastUpdated).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Edvisor Status</h1>
          <span className="text-sm text-gray-500">
            Last updated: {formattedDate}
          </span>
        </div>

        <div
          className={`mt-6 p-4 rounded-lg flex items-center gap-4 ${
            overallStatus === 'operational'
              ? 'bg-green-50'
              : overallStatus === 'major_outage'
                ? 'bg-red-50'
                : overallStatus === 'maintenance'
                  ? 'bg-blue-50'
                  : 'bg-yellow-50'
          }`}
        >
          {getStatusIcon(overallStatus)}
          <div>
            <p className={`text-lg font-semibold ${config.color}`}>
              {getStatusMessage(overallStatus)}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
