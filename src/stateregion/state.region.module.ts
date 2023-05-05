import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StateRegionController } from 'src/stateregion/state.region.controller';
import { StateRegionService } from 'src/stateregion/state.region.service';
import { StateRegionRespository } from 'src/stateregion.respository';
import { Region, RegionSchema } from 'src/region.model';
import { State, StateSchema } from 'src/state.model';
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
