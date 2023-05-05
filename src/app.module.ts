import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from 'src/config/configuration.service';
import { ConfigModule } from 'src/config/configuration.module';
import { AdminModule } from 'src/admin/admin.module';
import { ClientModule } from 'src/client/client.module';
import { ClinicModule } from 'src/clinic/clinic.module';
import { CouponModule } from 'src/coupon/coupon.module';
import { AppMiddleware } from 'src/app.middleware';
import { StateRegionModule } from 'src/stateregion/state.region.module';

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
