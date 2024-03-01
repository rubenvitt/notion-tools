export interface WeatherDto {
    type: string;
    geometry: Coordinates;
    properties: {
        meta: Meta;
        timeseries: ForecastData[];
    };
}

interface Coordinates {
    type: string;
    coordinates: [number, number, number]; // [lon, lat, elevation]
}

interface Units {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    cloud_area_fraction_high: string;
    cloud_area_fraction_low: string;
    cloud_area_fraction_medium: string;
    dew_point_temperature: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
}

interface Meta {
    updated_at: string;
    units: Units;
}

interface InstantDetails {
    air_pressure_at_sea_level?: number;
    air_temperature?: number;
    cloud_area_fraction?: number;
    cloud_area_fraction_high?: number;
    cloud_area_fraction_low?: number;
    cloud_area_fraction_medium?: number;
    dew_point_temperature?: number;
    relative_humidity?: number;
    wind_from_direction?: number;
    wind_speed?: number;
}

interface Summary {
    symbol_code?: string;
}

interface Next6HoursDetails {
    air_temperature_max?: number;
    air_temperature_min?: number;
    precipitation_amount?: number;
}

interface TimeseriesData {
    instant: {
        details?: InstantDetails;
    };
    next_12_hours?: {
        summary?: Summary;
    };
    next_6_hours?: {
        summary?: Summary;
        details?: Next6HoursDetails;
    };
}

export interface ForecastData {
    time: string;
    data: TimeseriesData;
}
