export interface IDeviationsResponse {
    StatusCode: number;
    Message: string;
    ExecutionTime: number;
    ResponseData: IDeviations[];
}

export interface IDeviations {
    Created: Date;
    MainNews: boolean;
    SortOrder: number;
    Header: string;
    Details: string;
    Scope: string;
    DevCaseGid: number;
    DevMessageVersionNumber: number;
    ScopeElements: string;
    FromDateTime: Date;
    UpToDateTime: Date;
    Updated: Date;
}
