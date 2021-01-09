export interface IYRLocationForecastResponse {
    type: string;
    geometry: IGeometry;
    properties: IProperties;
}

export interface IGeometry {
    type: string;
    coordinates: number[];
}

export interface IProperties {
    meta: IPropertiesMetadata;
    timeseries: ITimeseriesItem[];
}

export interface IPropertiesMetadata {
    updated_at: Date;
    units: IPropertiesMetadataUnits;
}

export interface IPropertiesMetadataUnits {
    air_pressure_at_sea_level: string;
    air_temperature: string;
    cloud_area_fraction: string;
    precipitation_amount: string;
    relative_humidity: string;
    wind_from_direction: string;
    wind_speed: string;
}

export interface ITimeseriesItem {
    time: Date;
    data: IForecast;
}

export interface IForecast {
    instant: IInstant;
    next_12_hours?: INext12Hours;
    next_1_hours?: INext;
    next_6_hours?: INext;
}

export interface IInstant {
    details: IForecastDetailsVerbose;
}

export interface INext12Hours {
    summary: ISummary;
}

export interface INext extends INext12Hours {
    details: IForecastDetails;
}

export interface IForecastDetailsVerbose {
    air_pressure_at_sea_level: number;
    air_temperature: number;
    cloud_area_fraction: number;
    relative_humidity: number;
    wind_from_direction: number;
    wind_speed: number;
}

export interface ISummary {
    symbol_code: string;
}

export interface IForecastDetails {
    precipitation_amount: number;
}
