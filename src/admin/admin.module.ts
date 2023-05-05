import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserSchema } from './user.model';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { AdminRespository } from './admin.respository';
@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.pre('save', function (next: any) {
            console.log('arrived' + !this.isModified('password'));
            if (this.password) {
              bcrypt.hash(this.password, 10, (err, hash) => {
                console.log('hashing..... ' + hash);
                if (err) return next(err);

                this.password = hash;
                console.log(this.password);
                next();
              });
            } else {
              next();
            }
          });
          return schema;
        },
      },
    ]),
  ],
  controllers: [AdminController],
  providers: [AdminService, AdminRespository],
  exports: [AdminService, AdminRespository],
})
export class AdminModule {}
