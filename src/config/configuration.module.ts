import { Global, Module } from '@nestjs/common';

import { ConfigService } from 'src/config/configuration.service';

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
