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
exports.ClientService = void 0;
const common_1 = require("@nestjs/common");
const client_respository_1 = require("../../repositories/client.respository");
let ClientService = class ClientService {
    constructor(clientRespository) {
        this.clientRespository = clientRespository;
    }
    async createClient(createClientDto, session) {
        return await this.clientRespository.createClient(createClientDto, session);
    }
    async getClientUsers(getQueryDto) {
        return await this.clientRespository.getClientUsers(getQueryDto);
    }
    async getClientUserById(id) {
        return await this.clientRespository.getClientUserById(id);
    }
    async getClientUserByPhoneNumber(phoneNumber) {
        return await this.clientRespository.getClientByPhoneNumber(phoneNumber);
    }
    async updateClient(id, updtaeClientDto) {
        return await this.clientRespository.updateClient(id, updtaeClientDto);
    }
};
ClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [client_respository_1.ClientRespository])
], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map