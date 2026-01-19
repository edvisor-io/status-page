import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Incident } from '@/types/status';
import { IncidentCard } from './IncidentCard';

interface IncidentTimelineProps {
  active: Incident[];
  recent: Incident[];
}

export function IncidentTimeline({ active, recent }: IncidentTimelineProps) {
  const hasActiveIncidents = active.length > 0;
  const hasRecentIncidents = recent.length > 0;
  const hasNoIncidents = !hasActiveIncidents && !hasRecentIncidents;

  return (
    <div className="space-y-8">
      {hasActiveIncidents && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-xl font-semibold text-gray-900">Active Incidents</h2>
            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {active.length}
            </span>
          </div>
          <div className="space-y-4">
            {active.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </section>
      )}

      {hasRecentIncidents && (
        <section>
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-gray-500" />
            <h2 className="text-xl font-semibold text-gray-900">Past Incidents</h2>
          </div>
          <div className="space-y-4">
            {recent.map((incident) => (
              <IncidentCard key={incident.id} incident={incident} />
            ))}
          </div>
        </section>
      )}

      {hasNoIncidents && (
        <div className="bg-white rounded-lg border border-gray-200 p-8 sm:p-12 text-center">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No incidents reported
          </h3>
          <p className="text-gray-600">
            All systems are operating normally. No recent incidents to display.
          </p>
        </div>
      )}
    </div>
  );
}
