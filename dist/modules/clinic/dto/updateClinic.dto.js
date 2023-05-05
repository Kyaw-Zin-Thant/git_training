"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClinicDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createClinic_dto_1 = require("./createClinic.dto");
class UpdateClinicDto extends (0, mapped_types_1.PartialType)(createClinic_dto_1.CreateClinicDto) {
}
exports.UpdateClinicDto = UpdateClinicDto;
//# sourceMappingURL=updateClinic.dto.js.map