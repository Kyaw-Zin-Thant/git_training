import { GetQueryDto } from '../dto/getQueryDto';
import { ResponseDto } from '../dto/response.dto';
import { Region } from '../entities/region.model';
import { Model } from 'mongoose';
import { State } from 'src/entities/state.model';
export declare class StateRegionRespository {
    private readonly regionModel;
    private readonly stateModel;
    constructor(regionModel: Model<Region>, stateModel: Model<State>);
    getRegions(query: GetQueryDto): Promise<ResponseDto>;
    getStates(query: GetQueryDto, id: string): Promise<ResponseDto>;
    createStateRegions(): Promise<void>;
}
