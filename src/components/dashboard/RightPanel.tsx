import React, { useMemo, useState, useEffect } from "react";
import { HourlyTableTransposed } from "./HourlyTableTransposed";
import { TimeSeriesCharts } from "./TimeSeriesCharts";
import { MetricCard } from "./MetricCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import { useDataDir } from "../../contexts/DataDirContext";
import { useDashboardData } from "../../hooks/useDashboardData";

interface RightPanelProps {
  selectedStation: string;
  selectedDate: Date;
  selectedPeriod: "day" | "month" | "year";
  selectedHour?: string;
  isLive?: boolean;
}

export function RightPanel({
  selectedStation,
  selectedDate,
  selectedPeriod,
  selectedHour,
  isLive,
}: RightPanelProps) {
  const { dataDir } = useDataDir();
  const [activeTab, setActiveTab] = useState("tableau");

  // Utiliser le hook partagé pour charger les données
  const { data: apiData, loading: isLoadingData } = useDashboardData(dataDir, isLive, selectedDate, selectedHour);
  
  // Transformer les données depuis la réponse API
  const [hourlyData, setHourlyData] = useState<any[]>([]);

  useEffect(() => {
    if (!apiData) {
      setHourlyData([]);
      return;
    }
    
    if (apiData.status === 'no_data' || apiData.status === 'error') {
      setHourlyData([]);
      return;
    }
    
    if (apiData.status === 'ok' && apiData.data) {
      // Fonction pour calculer le scénario selon le tableau officiel
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
      
      // Transformer les données pour le format attendu
      let transformedData = apiData.data.map((item: any) => ({
        time: item.time,
        date: item.date,
        timestamp: item.timestamp,
        direction: item.direction,
        vitesse: item.vitesse,
        temperature: item.temperature,
        humidite: item.humidite,
        power: item.power,
        scenario: calculateScenario(item.vitesse, item.direction) || 'S1a',
      }));
      
      // En mode historique, s'assurer que les données sont triées en ordre croissant
      if (!isLive) {
        transformedData.sort((a: any, b: any) => {
          const dateA = new Date(a.timestamp).getTime();
          const dateB = new Date(b.timestamp).getTime();
          return dateA - dateB; // Ordre croissant
        });
      }
      
      // En mode historique, remplacer complètement les données
      // En mode temps réel, faire la mise à jour incrémentale
      if (!isLive) {
        // Mode historique : remplacer complètement les données
        setHourlyData(transformedData);
      } else {
        // Mode temps réel : mise à jour incrémentale
        setHourlyData((prevData) => {
          // Si c'est le premier chargement ou si les données sont vides, utiliser les nouvelles données
          if (prevData.length === 0) {
            return transformedData;
          }
          
          // Vérifier si les données proviennent du même dossier en comparant les timestamps
          const firstNewTimestamp = transformedData[0]?.timestamp;
          const lastPrevTimestamp = prevData[prevData.length - 1]?.timestamp;
          
          // Si les timestamps ne se chevauchent pas du tout, remplacer complètement
          if (!lastPrevTimestamp || !firstNewTimestamp || 
              (firstNewTimestamp > lastPrevTimestamp && 
               transformedData.length === prevData.length)) {
            // Probablement un changement de dossier, remplacer tout
            return transformedData;
          }
        
          // Sinon, comparer avec les données existantes et ajouter seulement les nouvelles
          const newData = transformedData.filter((item: any) => {
            // Garder seulement les données plus récentes que la dernière connue
            return !lastPrevTimestamp || item.timestamp > lastPrevTimestamp;
          });
          
          // Combiner les anciennes et nouvelles données, garder seulement les 10 dernières
          const combined = [...prevData, ...newData];
          return combined.slice(-10); // Garder seulement les 10 dernières
        });
      }
    }
  }, [apiData, isLive]);

  // Use all entries for charts
  const chartData = useMemo(() => hourlyData, [hourlyData]);

  // Get current metrics from the latest data point
  const currentMetrics = useMemo(() => {
    if (hourlyData.length > 0) {
      const latest = hourlyData[hourlyData.length - 1];
      return {
        direction: latest.direction || 0,
        vitesse: latest.vitesse || 0,
        temperature: latest.temperature || 0,
        humidite: latest.humidite || 0,
      };
    }
    
    // Fallback si pas de données
    return {
      direction: 0,
      vitesse: 0,
      temperature: 0,
      humidite: 0,
    };
  }, [hourlyData]);

  return (
    <div className="w-full lg:w-[70%] flex flex-col gap-3 overflow-hidden">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="flex flex-col flex-1 overflow-hidden"
      >
        <TabsList className="w-full grid grid-cols-2 h-12 bg-white/80 dark:bg-[rgba(0,0,0,0.6)] border border-[rgba(47,163,111,0.2)] dark:border-[rgba(14,107,87,0.15)]">
          <TabsTrigger
            value="tableau"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0E6B57] data-[state=active]:via-[#2FA36F] data-[state=active]:to-[#0E6B57] data-[state=active]:text-white font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Tableau
          </TabsTrigger>
          <TabsTrigger
            value="courbes"
            className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#0E6B57] data-[state=active]:via-[#2FA36F] data-[state=active]:to-[#0E6B57] data-[state=active]:text-white font-semibold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Courbes
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="tableau"
          className="flex-1 overflow-hidden mt-3 flex flex-col gap-3"
        >
          <div className="bg-white dark:bg-[rgba(0,0,0,0.6)] rounded-lg shadow-sm overflow-auto flex-1 border border-[rgba(47,163,111,0.2)] dark:border-[rgba(14,107,87,0.15)]">
            {isLoadingData ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-muted-foreground">Chargement des données...</div>
                </div>
              </div>
            ) : hourlyData.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="text-muted-foreground">Aucune donnée disponible</div>
                </div>
              </div>
            ) : (
              <HourlyTableTransposed data={hourlyData} />
            )}
          </div>
        </TabsContent>

        <TabsContent
          value="courbes"
          className="flex-1 overflow-hidden mt-3"
        >
          <div className="bg-white dark:bg-[rgba(0,0,0,0.6)] rounded-lg p-4 shadow-sm h-full overflow-auto border border-[rgba(47,163,111,0.2)] dark:border-[rgba(14,107,87,0.15)]">
            <TimeSeriesCharts data={chartData} />
          </div>
        </TabsContent>
      </Tabs>

      {/* Metrics Cards - At the bottom */}
      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
        <MetricCard
          label="Direction"
          value={`${Math.round(currentMetrics.direction)}°`}
          icon="compass"
        />
        <MetricCard
          label="Vitesse"
          value={`${currentMetrics.vitesse.toFixed(1)} m/s`}
          icon="wind"
        />
        <MetricCard
          label="Température"
          value={`${currentMetrics.temperature.toFixed(1)} °C`}
          icon="thermometer"
        />
        <MetricCard
          label="Humidité"
          value={`${Math.round(currentMetrics.humidite)} %`}
          icon="droplet"
        />
      </div>
    </div>
  );
}