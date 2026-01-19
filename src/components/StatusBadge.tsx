import { ServiceStatusType, STATUS_CONFIG } from '@/types/status';

interface StatusBadgeProps {
  status: ServiceStatusType;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-1 text-sm',
  lg: 'px-3 py-1.5 text-base',
};

const dotSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-2.5 h-2.5',
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${sizeClasses[size]} ${config.color} bg-opacity-10`}
      style={{ backgroundColor: `${config.bgColor.replace('bg-', '')}20` }}
    >
      <span
        className={`${dotSizeClasses[size]} rounded-full ${config.bgColor}`}
      />
      {config.label}
    </span>
  );
}
