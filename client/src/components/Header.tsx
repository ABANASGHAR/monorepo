import React from 'react';
import { HealthCheckData } from '../types/item';

interface HeaderProps {
  health: HealthCheckData | null;
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ health, loading }) => {
  const isDbConnected = health?.database === 'connected';

  return (
    <header>
      <div className="header-title-row">
        <div className="title-group">
          <h1>🚀 MERN Monorepo Project</h1>
          <p>Full-Stack MongoDB, Express, React, Node.js with TypeScript & Workspaces</p>
        </div>

        <div
          className={`status-badge ${
            loading
              ? 'status-disconnected'
              : isDbConnected
              ? 'status-connected'
              : 'status-disconnected'
          }`}
          title={health ? `Server uptime: ${Math.round(health.uptime)}s` : 'Server unreachable'}
        >
          <span
            className={`status-dot ${
              !loading && isDbConnected ? 'connected' : 'disconnected'
            }`}
          />
          {loading
            ? 'Connecting...'
            : isDbConnected
            ? 'API & DB Live'
            : 'DB Degraded / Offline'}
        </div>
      </div>
    </header>
  );
};
