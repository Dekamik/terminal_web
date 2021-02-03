
export interface ILineDataResponse {
    StatusCode: number;
    Message: string | null;
    ExecutionTime: number;
    ResponseData: ILineDataResponseData;
}

export interface ILineDataResponseData {
    Version: string;
    Type: string;
    Result: ISiteData[];
}

export interface ISiteData {
    SiteId: string;
    SiteName: string;
    StopAreaNumber: string;
    LastModifiedUtcDateTime: string;
    ExistsFromDate: string;
}
