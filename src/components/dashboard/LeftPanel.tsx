import React, { useEffect, useState } from 'react';
import { WindRoseChart } from './WindRoseChart';
import { useDataDir } from '../../contexts/DataDirContext';
import { useDashboardData } from '../../hooks/useDashboardData';

interface LeftPanelProps {
  selectedStation: string;
  selectedDate: Date;
  selectedHour?: string;
  isLive?: boolean;
  onNavigateToMap?: () => void;
}

// Function to calculate scenario based on wind speed and direction
// Selon le tableau officiel des scénarios
const calculateScenario = (vitesse: number, direction: number): string | null => {
  // S1: V ≥ 5 m/s (pas de condition de direction)
  if (vitesse >= 5) return 'S1';
  
  // S3b: V ≤ 2 m/s et (WD > 156 and WD <= 203) - priorité sur les autres
  if (vitesse <= 2 && direction > 156 && direction <= 203) return 'S3b';
  
  // S4: V < 0,5 m/s et (WD > 90 and WD <= 293)
  if (vitesse < 0.5 && direction > 90 && direction <= 293) return 'S4';
  
  // S3: V < 0,5 m/s et [(WD > 293 and WD <= 360) or (WD >= 0 and WD <= 90)]
  if (vitesse < 0.5 && ((direction > 293 && direction <= 360) || (direction >= 0 && direction <= 90))) return 'S3';
  
  // S2b: V ≤ 1 m/s et (WD > 90 and WD <= 293)
  if (vitesse <= 1 && direction > 90 && direction <= 293) return 'S2b';
  
  // S2: 1 < V < 4 m/s et [(WD > 293 and WD <= 360) or (WD >= 0 and WD <= 90)]
  if (vitesse > 1 && vitesse < 4 && ((direction > 293 && direction <= 360) || (direction >= 0 && direction <= 90))) return 'S2';
  
  return null;
};

export function LeftPanel({ selectedStation, selectedDate, selectedHour, isLive = true, onNavigateToMap }: LeftPanelProps) {
  const { dataDir } = useDataDir();
  
  // Utiliser le hook partagé pour charger les données
  const { data: apiData, loading } = useDashboardData(dataDir, isLive, selectedDate, selectedHour);
  
  // Extraire les données actuelles depuis la réponse API
  const [currentData, setCurrentData] = useState<{
    direction: number;
    vitesse: number;
    temperature: number;
    humidite: number;
    power?: number;
    scenario: string | null;
  } | null>(null);

  useEffect(() => {
    if (apiData) {
      if (apiData.status === 'no_data') {
        setCurrentData(null);
        return;
      }
      
      if (apiData.status === 'ok' && apiData.data && apiData.data.length > 0) {
        // Prendre la dernière mesure (la plus récente)
        const latest = apiData.data[apiData.data.length - 1];
        const scenario = calculateScenario(latest.vitesse, latest.direction);
        
        setCurrentData({
          direction: latest.direction,
          vitesse: latest.vitesse,
          temperature: latest.temperature,
          humidite: latest.humidite,
          power: latest.power,
          scenario: scenario,
        });
      } else {
        setCurrentData(null);
      }
    }
  }, [apiData]);

  // Données par défaut si pas encore chargées
  const displayData = currentData || {
    direction: 0,
    vitesse: 0,
    temperature: 0,
    humidite: 0,
    scenario: null,
  };

  return (
    <div className="w-full lg:w-[30%] flex flex-col gap-2 overflow-hidden">
      {/* Wind Rose Chart - Full height */}
      <div className="bg-white dark:bg-[rgba(0,0,0,0.6)] rounded-lg p-4 shadow-sm border border-[rgba(47,163,111,0.2)] dark:border-[rgba(14,107,87,0.15)] flex-1 flex flex-col">
        <h3 className="text-sm font-semibold dark:text-white text-[#1A2A23] mb-2 text-center" style={{ fontFamily: 'var(--font-heading)' }}>
          Rose des Vents
          {displayData.scenario && (
            <span className="ml-2 text-xs font-normal opacity-75">
              (Scénario: {displayData.scenario})
            </span>
          )}
        </h3>
        <div className="flex-1">
          <WindRoseChart direction={displayData.direction} />
        </div>
      </div>
    </div>
  );
}