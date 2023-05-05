"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateClientDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const createClient_dto_1 = require("./createClient.dto");
class UpdateClientDto extends (0, mapped_types_1.PartialType)(createClient_dto_1.CreateClientDto) {
}
exports.UpdateClientDto = UpdateClientDto;
//# sourceMappingURL=updateClient.dto.js.map