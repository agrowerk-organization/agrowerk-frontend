export interface WeatherAlert {
    id: string;
    locationId: string;
    locationName: string;
    alertType: string;
    alertTypeDisplayName: string;
    severity: string;
    severityDisplayName: string;
    severityColor: string;
    title: string;
    description: string;
    recommendedActions: string;
    startTime: string;
    endTime: string;
    isActive: boolean;
    notified: boolean;
    source: string;
    createdAt: string;
}