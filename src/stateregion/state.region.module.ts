import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateRegionController } from './state.region.controller';
import { StateRegionService } from './state.region.service';
import { StateRegionRespository } from './stateregion.respository';
import { Region, RegionSchema } from './region.model';
import { State, StateSchema } from './state.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Region.name, schema: RegionSchema }]),

    MongooseModule.forFeature([{ name: State.name, schema: StateSchema }]),
  ],
  controllers: [StateRegionController],
  providers: [StateRegionService, StateRegionRespository],
  exports: [StateRegionService, StateRegionRespository],
})
export class StateRegionModule {}
