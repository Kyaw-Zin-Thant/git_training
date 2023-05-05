"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const dotenv = require("dotenv");
class ConfigService {
    constructor() {
        const result = dotenv.config();
        if (result.error) {
            this.envConfig = process.env;
        }
        else {
            this.envConfig = result.parsed;
        }
    }
    get(key) {
        return this.envConfig[key];
    }
    async getPortConfig() {
        return this.get('PORT');
    }
    async getMongoConfig() {
        return {
            uri: 'mongodb+srv://' +
                this.get('MONGO_USER') +
                ':' +
                this.get('MONGO_PASSWORD') +
                '@' +
                this.get('MONGO_HOST') +
                '/' +
                this.get('MONGO_DATABASE'),
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
    }
}
exports.ConfigService = ConfigService;
//# sourceMappingURL=configuration.service.js.map