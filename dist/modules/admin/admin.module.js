"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = require("bcrypt");
const user_model_1 = require("../../entities/user.model");
const admin_controller_1 = require("./admin.controller");
const admin_service_1 = require("./admin.service");
const admin_respository_1 = require("../../repositories/admin.respository");
let AdminModule = class AdminModule {
};
AdminModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeatureAsync([
                {
                    name: user_model_1.User.name,
                    useFactory: () => {
                        const schema = user_model_1.UserSchema;
                        schema.pre('save', function (next) {
                            console.log('arrived' + !this.isModified('password'));
                            if (this.password) {
                                bcrypt.hash(this.password, 10, (err, hash) => {
                                    console.log('hashing..... ' + hash);
                                    if (err)
                                        return next(err);
                                    this.password = hash;
                                    console.log(this.password);
                                    next();
                                });
                            }
                            else {
                                next();
                            }
                        });
                        return schema;
                    },
                },
            ]),
        ],
        controllers: [admin_controller_1.AdminController],
        providers: [admin_service_1.AdminService, admin_respository_1.AdminRespository],
        exports: [admin_service_1.AdminService, admin_respository_1.AdminRespository],
    })
], AdminModule);
exports.AdminModule = AdminModule;
//# sourceMappingURL=admin.module.js.map