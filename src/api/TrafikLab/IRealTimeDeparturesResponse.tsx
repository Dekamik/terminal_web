import { TransportMode } from "./TransportMode";

export interface IRealTimeDeparturesResponse {
    latestUpdate: Date;
    dataAge: number;
    buses: IRealTimeDeparture[];
    metros: IRealTimeDeparture[];
    trains: IRealTimeDeparture[];
    trams: IRealTimeDeparture[];
    ships: IRealTimeDeparture[];
    stopPointDeviations: IStopPointDeviation[];
}

export interface IRealTimeDeparture {
    transportMode: TransportMode;
    lineNumber: string;
    destination: string;
    journeyDirection: number;
    groupOfLine?: string;
    stopAreaName: string;
    stopAreaNumber: number;
    stopPointNumber: number;
    stopPointDesignation: string;
    timeTabledDateTime: Date;
    expectedDateTime: Date;
    displayTime: string;
    journeyNumber: number;
    deviations: IDeviation[];
    secondaryDestinationName?: string;
    predictionState: PredictionState;
}

export interface IDeviation {
    consequence: string;
    importanceLevel: number;
    text: string;
}

export interface IStopPointDeviation {
    stopInfo: IStopInfo;
    deviation: IDeviation;
}

export interface IStopInfo {
    groupOfLine?: string;
    stopAreaName: string;
    stopAreaNumber: number;
    transportMode: TransportMode;
}

export enum PredictionState {
    Normal = "NORMAL",
    Unreliable = "UNRELIABLE",
    Unknown = "UNKNOWN"
}
