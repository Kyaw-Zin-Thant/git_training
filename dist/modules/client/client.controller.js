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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientController = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const getQueryDto_1 = require("../../dto/getQueryDto");
const createClient_dto_1 = require("./dto/createClient.dto");
const updateClient_dto_1 = require("./dto/updateClient.dto");
const client_service_1 = require("./client.service");
let ClientController = class ClientController {
    constructor(mongoConnection, clientService) {
        this.mongoConnection = mongoConnection;
        this.clientService = clientService;
    }
    async createClient(createClientDto, res) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            console.log(createClientDto);
            const newClientUser = await this.clientService.createClient(createClientDto, session);
            await session.commitTransaction();
            newClientUser.userId = newClientUser._id;
            delete newClientUser._id;
            console.log(newClientUser);
            return res.status(common_1.HttpStatus.CREATED).send(newClientUser);
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async getClientUsers(getQueryDto, res) {
        const users = await this.clientService.getClientUsers(getQueryDto);
        return res.status(common_1.HttpStatus.OK).send(users);
    }
    async getClientUserById(id, res) {
        const adminUser = await this.clientService.getClientUserById(id);
        return res.status(common_1.HttpStatus.OK).send(adminUser);
    }
    async getClientUserByPhoneNumber(phoneNumber, res) {
        const adminUser = await this.clientService.getClientUserByPhoneNumber(phoneNumber);
        return res.status(common_1.HttpStatus.OK).send(adminUser);
    }
    async updateClient(id, updtaeClientDto, res) {
        try {
            const updateClientUser = await this.clientService.updateClient(id, updtaeClientDto);
            updateClientUser.userId = updateClientUser._id;
            delete updateClientUser._id;
            return res.status(common_1.HttpStatus.OK).send(updateClientUser);
        }
        catch (error) {
            throw new common_1.BadRequestException(error);
        }
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createClient_dto_1.CreateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, common_1.Get)('/get'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getQueryDto_1.GetQueryDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientUsers", null);
__decorate([
    (0, common_1.Get)('/get/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientUserById", null);
__decorate([
    (0, common_1.Get)('/get-client-by-phone/:phoneNumber'),
    __param(0, (0, common_1.Param)('phoneNumber')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientUserByPhoneNumber", null);
__decorate([
    (0, common_1.Put)('/update/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [mongoose_2.Schema.Types.ObjectId, updateClient_dto_1.UpdateClientDto, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
ClientController = __decorate([
    (0, common_1.Controller)('client'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        client_service_1.ClientService])
], ClientController);
exports.ClientController = ClientController;
//# sourceMappingURL=client.controller.js.map