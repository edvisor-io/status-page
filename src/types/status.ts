export type ServiceStatusType =
  | 'operational'
  | 'degraded'
  | 'partial_outage'
  | 'major_outage'
  | 'maintenance';

export type IncidentStatusType =
  | 'investigating'
  | 'identified'
  | 'monitoring'
  | 'resolved';

export type IncidentSeverity = 'minor' | 'major' | 'critical' | 'maintenance';

export interface DayStatus {
  date: string;
  status: 'operational' | 'degraded' | 'incident';
  uptime: number;
  incidents: number;
}

export interface ServiceStatus {
  id: string;
  name: string;
  status: ServiceStatusType;
  uptime24h: number;
  uptime30d: number;
  dailyHistory: DayStatus[];
}

export interface StatusData {
  lastUpdated: string;
  overallStatus: ServiceStatusType;
  services: ServiceStatus[];
}

export interface IncidentUpdate {
  timestamp: string;
  status: IncidentStatusType;
  message: string;
}

export interface Incident {
  id: string;
  title: string;
  status: IncidentStatusType;
  severity: IncidentSeverity;
  affectedServices: string[];
  startedAt: string;
  resolvedAt?: string;
  updates: IncidentUpdate[];
}

export interface IncidentsData {
  active: Incident[];
  recent: Incident[];
}

export const STATUS_CONFIG: Record<
  ServiceStatusType,
  { label: string; color: string; bgColor: string }
> = {
  operational: {
    label: 'Operational',
    color: 'text-green-600',
    bgColor: 'bg-green-500',
  },
  degraded: {
    label: 'Degraded Performance',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-500',
  },
  partial_outage: {
    label: 'Partial Outage',
    color: 'text-orange-600',
    bgColor: 'bg-orange-500',
  },
  major_outage: {
    label: 'Major Outage',
    color: 'text-red-600',
    bgColor: 'bg-red-500',
  },
  maintenance: {
    label: 'Under Maintenance',
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
  },
};

export const INCIDENT_STATUS_CONFIG: Record<
  IncidentStatusType,
  { label: string; color: string }
> = {
  investigating: { label: 'Investigating', color: 'text-yellow-600' },
  identified: { label: 'Identified', color: 'text-orange-600' },
  monitoring: { label: 'Monitoring', color: 'text-blue-600' },
  resolved: { label: 'Resolved', color: 'text-green-600' },
};
