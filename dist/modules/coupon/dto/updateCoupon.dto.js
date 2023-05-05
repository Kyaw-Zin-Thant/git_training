"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCouponDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createCoupon_dto_1 = require("./createCoupon.dto");
class UpdateCouponDto extends (0, mapped_types_1.PartialType)(createCoupon_dto_1.CreateCouponDto) {
}
exports.UpdateCouponDto = UpdateCouponDto;
//# sourceMappingURL=updateCoupon.dto.js.map