import { Injectable } from '@nestjs/common';
import { GetQueryDto } from 'src/getQueryDto';
import { StateRegionRespository } from './stateregion.respository';
@Injectable()
export class StateRegionService {
  constructor(
    private readonly stateRegionRespository: StateRegionRespository,
  ) {}

  async getRegions(getQueryDto: GetQueryDto) {
    return await this.stateRegionRespository.getRegions(getQueryDto);
  }

  async getStates(getQueryDto: GetQueryDto, id: string) {
    return await this.stateRegionRespository.getStates(getQueryDto, id);
  }
}
