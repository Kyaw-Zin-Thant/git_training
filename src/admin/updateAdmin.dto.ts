import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from 'src/admin/createAdmin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
