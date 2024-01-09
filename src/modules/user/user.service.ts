import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { BaseService } from '../base/base.abstract.service';
import { IUserService } from './user.service.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService
  extends BaseService<UserEntity>
  implements IUserService
{
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    // @Inject('IAccountService')
    // private accountService: IAccountService,
  ) {
    super(userRepository);
  }

  async getOneById(id: string | number): Promise<UserEntity> {
    const findUser = await this.userRepository.findOne({
        where: {
            user_id: id as string,
        },
        relations: {
            account: true,
        },
    });
        return findUser;
    }

    async getUserByEmail(email: string): Promise<UserEntity> {
        const findUser = await this.userRepository
        .createQueryBuilder('users')
        .where('users.email = :email', { email: email })
        .leftJoinAndSelect('users.employee', 'employee')
        .getOne();
        return findUser;
    }

    async getAll(): Promise<UserEntity[]> {
        try {
            const findUsers = await this.userRepository.find({
                relations: {
                account: true,
                },
            });
            return findUsers;
        } catch (error) {
            console.log(`${error} is Problem...........`);
            throw error;
        }
    }
}
