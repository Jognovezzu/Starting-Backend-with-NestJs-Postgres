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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_roles_enum_1 = require("./user-roles.enum");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const common_2 = require("@nestjs/common");
let UsersService = class UsersService {
    constructor(userRepository, dataSource) {
        this.userRepository = userRepository;
        this.dataSource = dataSource;
    }
    async createAdminUser(createUserDTO) {
        if (createUserDTO.password != createUserDTO.passwordConfirmation) {
            throw new common_1.UnprocessableEntityException('Senhas não conferem');
        }
        else {
            return this.createUser(createUserDTO, user_roles_enum_1.UserRole.ADMIN);
        }
    }
    async createUser(CreateUserDTO, role) {
        const { email, name, password } = CreateUserDTO;
        const user = this.userRepository.create();
        user.email = email;
        user.name = name;
        user.role = role;
        user.status = true;
        user.confirmationToken = crypto.randomBytes(32).toString('hex');
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await user.save();
            delete user.password;
            delete user.salt;
            return user;
        }
        catch (error) {
            if (error.code.toString() === '23505') {
                throw new common_2.ConflictException('Endereço de email já está em uso');
            }
            else {
                throw new common_2.InternalServerErrorException('Erro ao salvar o usuário no banco de dados');
            }
        }
    }
    async checkcredential(credentialsDTO) {
        const { email, password } = credentialsDTO;
        const user = await this.userRepository.findOne({ where: { email: email, status: true } });
        if (user && (await user.checkPassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.DataSource])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map