import { Response } from 'express';
import { Connection } from 'mongoose';
import { GetQueryDto } from '../../dto/getQueryDto';
import { StateRegionService } from './state.region.service';
export declare class StateRegionController {
    private readonly mongoConnection;
    private stateRegionService;
    constructor(mongoConnection: Connection, stateRegionService: StateRegionService);
    getRegions(getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getStates(id: string, getQueryDto: GetQueryDto, res: Response): Promise<Response<any, Record<string, any>>>;
}
