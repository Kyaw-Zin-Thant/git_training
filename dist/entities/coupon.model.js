"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = exports.Coupon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coupon_family_model_1 = require("./coupon.family.model");
const clinic_model_1 = require("./clinic.model");
const client_model_1 = require("./client.model");
var Status;
(function (Status) {
    Status[Status["ACTIVE"] = 0] = "ACTIVE";
    Status[Status["INACTIVE"] = 1] = "INACTIVE";
    Status[Status["REDEEMED"] = 2] = "REDEEMED";
    Status[Status["CANCEL"] = 3] = "CANCEL";
    Status[Status["EXPIRED"] = 4] = "EXPIRED";
    Status[Status["REJECT"] = 5] = "REJECT";
})(Status || (Status = {}));
let Coupon = class Coupon extends mongoose_2.Document {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Coupon.prototype, "couponCode", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Coupon.prototype, "programName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Coupon.prototype, "serviceName", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'CouponFamily' }),
    __metadata("design:type", coupon_family_model_1.CouponFamily)
], Coupon.prototype, "couponFamilyId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Clinic' }),
    __metadata("design:type", clinic_model_1.Clinic)
], Coupon.prototype, "clinicId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.Schema.Types.ObjectId, ref: 'Client' }),
    __metadata("design:type", client_model_1.Client)
], Coupon.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Coupon.prototype, "validFrom", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Coupon.prototype, "validTo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: 'ACTIVE', enum: Status }),
    __metadata("design:type", String)
], Coupon.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Coupon.prototype, "redemeedDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Coupon.prototype, "updatedAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Coupon.prototype, "createdAt", void 0);
Coupon = __decorate([
    (0, mongoose_1.Schema)()
], Coupon);
exports.Coupon = Coupon;
exports.CouponSchema = mongoose_1.SchemaFactory.createForClass(Coupon);
//# sourceMappingURL=coupon.model.js.map