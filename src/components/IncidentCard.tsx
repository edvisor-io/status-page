import { Clock, AlertTriangle, CheckCircle, Eye, Search } from 'lucide-react';
import { Incident, IncidentUpdate, INCIDENT_STATUS_CONFIG, IncidentSeverity } from '@/types/status';

interface IncidentCardProps {
  incident: Incident;
}

const SEVERITY_CONFIG: Record<
  IncidentSeverity,
  { label: string; bgColor: string; textColor: string }
> = {
  minor: {
    label: 'Minor',
    bgColor: 'bg-yellow-100',
    textColor: 'text-yellow-800',
  },
  major: {
    label: 'Major',
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
  critical: {
    label: 'Critical',
    bgColor: 'bg-red-100',
    textColor: 'text-red-800',
  },
  maintenance: {
    label: 'Maintenance',
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
};

const STATUS_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  investigating: Search,
  identified: AlertTriangle,
  monitoring: Eye,
  resolved: CheckCircle,
};

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function formatTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function UpdateItem({ update }: { update: IncidentUpdate }) {
  const statusConfig = INCIDENT_STATUS_CONFIG[update.status];
  const Icon = STATUS_ICON[update.status] || Clock;

  return (
    <div className="flex gap-3 pb-4 last:pb-0">
      <div className="flex flex-col items-center">
        <div className={`p-1.5 rounded-full bg-gray-100`}>
          <Icon className={`w-4 h-4 ${statusConfig.color}`} />
        </div>
        <div className="w-px flex-1 bg-gray-200 mt-2 last:hidden" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-sm font-medium ${statusConfig.color}`}>
            {statusConfig.label}
          </span>
          <span className="text-xs text-gray-500">{formatTime(update.timestamp)}</span>
        </div>
        <p className="text-sm text-gray-700">{update.message}</p>
      </div>
    </div>
  );
}

export function IncidentCard({ incident }: IncidentCardProps) {
  const severityConfig = SEVERITY_CONFIG[incident.severity];
  const statusConfig = INCIDENT_STATUS_CONFIG[incident.status];
  const isResolved = incident.status === 'resolved';

  const sortedUpdates = [...incident.updates].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${severityConfig.bgColor} ${severityConfig.textColor}`}
              >
                {severityConfig.label}
              </span>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 ${statusConfig.color}`}
              >
                {statusConfig.label}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 break-words">
              {incident.title}
            </h3>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-gray-400" />
            <span>Started: {formatDateTime(incident.startedAt)}</span>
          </div>
          {isResolved && incident.resolvedAt && (
            <div className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-green-500" />
              <span>Resolved: {formatDateTime(incident.resolvedAt)}</span>
            </div>
          )}
        </div>

        {incident.affectedServices.length > 0 && (
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700">Affected Services: </span>
            <div className="inline-flex flex-wrap gap-1.5 mt-1">
              {incident.affectedServices.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-xs text-gray-700"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        )}

        {sortedUpdates.length > 0 && (
          <div className="border-t border-gray-100 pt-4 mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Updates</h4>
            <div className="space-y-0">
              {sortedUpdates.map((update, index) => (
                <UpdateItem key={`${update.timestamp}-${index}`} update={update} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
