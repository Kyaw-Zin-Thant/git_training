import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from './config/configuration.service';
import { ConfigModule } from './config/configuration.module';
import { AdminModule } from './admin/admin.module';
import { ClientModule } from './client/client.module';
import { ClinicModule } from './clinic/clinic.module';
import { CouponModule } from './coupon/coupon.module';
import { AppMiddleware } from './app.middleware';
import { StateRegionModule } from './stateregion/state.region.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    AdminModule,
    ClientModule,
    ClinicModule,
    CouponModule,
    StateRegionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AppMiddleware)
      .exclude('admin/login')
      .forRoutes({ path: '*', method: RequestMethod.ALL }); // apply on all routes
  }
}
