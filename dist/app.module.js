"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const configuration_service_1 = require("./config/configuration.service");
const configuration_module_1 = require("./config/configuration.module");
const admin_module_1 = require("./modules/admin/admin.module");
const client_module_1 = require("./modules/client/client.module");
const clinic_module_1 = require("./modules/clinic/clinic.module");
const coupon_module_1 = require("./modules/coupon/coupon.module");
const app_middleware_1 = require("./app.middleware");
const state_region_module_1 = require("./modules/stateregion/state.region.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(app_middleware_1.AppMiddleware)
            .exclude('admin/login')
            .forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            configuration_module_1.ConfigModule,
            mongoose_1.MongooseModule.forRootAsync({
                inject: [configuration_service_1.ConfigService],
                useFactory: async (configService) => configService.getMongoConfig(),
            }),
            admin_module_1.AdminModule,
            client_module_1.ClientModule,
            clinic_module_1.ClinicModule,
            coupon_module_1.CouponModule,
            state_region_module_1.StateRegionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map