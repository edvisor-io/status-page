import { Header, ServiceCard, IncidentTimeline } from '@/components';
import { useStatusData, useIncidents } from '@/hooks';

function App() {
  const { data: statusData, loading: statusLoading, error: statusError } = useStatusData();
  const { data: incidentsData, loading: incidentsLoading } = useIncidents();

  if (statusLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading status...</p>
        </div>
      </div>
    );
  }

  if (statusError || !statusData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-red-500 text-5xl mb-4">!</div>
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Unable to load status</h1>
          <p className="text-slate-600">
            We're having trouble fetching the current status. Please try again later.
          </p>
          {statusError && (
            <p className="mt-4 text-sm text-slate-500">{statusError.message}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header
        overallStatus={statusData.overallStatus}
        lastUpdated={statusData.lastUpdated}
      />

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            System Status
          </h2>
          <div className="space-y-4">
            {statusData.services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </section>

        {/* Incidents Section */}
        {!incidentsLoading && incidentsData && (
          <section>
            <IncidentTimeline
              active={incidentsData.active}
              recent={incidentsData.recent}
            />
          </section>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-sm text-slate-500">
          <p>
            Powered by{' '}
            <a
              href="https://edvisor.io"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Edvisor
            </a>
          </p>
          <p className="mt-1">
            Status updates every 60 seconds
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;
