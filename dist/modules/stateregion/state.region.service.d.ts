import { GetQueryDto } from '../../dto/getQueryDto';
import { StateRegionRespository } from '../../repositories/stateregion.respository';
export declare class StateRegionService {
    private readonly stateRegionRespository;
    constructor(stateRegionRespository: StateRegionRespository);
    getRegions(getQueryDto: GetQueryDto): Promise<import("../../dto/response.dto").ResponseDto>;
    getStates(getQueryDto: GetQueryDto, id: string): Promise<import("../../dto/response.dto").ResponseDto>;
}
