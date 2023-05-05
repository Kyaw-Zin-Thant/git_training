import { PartialType } from '@nestjs/mapped-types';
import { CreateClientDto } from 'src/client/createClient.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
