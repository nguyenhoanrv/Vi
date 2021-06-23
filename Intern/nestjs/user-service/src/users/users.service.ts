import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Users } from './user.entity'
const bcrypt = require('bcrypt')
const jwk = require('../../util/jwt-helper.js')
const SALT_ROUNDS = 10

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne(id);
  }

  async login(email:string,password:string){
    
    const user = await this.usersRepository.findOne({
      where:{
        email
      }
    })
    if(user){
      if(bcrypt.compareSync(password,user.password)){
        const accessTokenLife = process.env.ACCESS_TOKEN_LIFE || '1h'
        const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'abc12345678910JErIuyiBDUIwmWMnlAY9QbLzoa'
        const userData = {
          id : user.id,
          username : user.username,
          email : user.email
        }
        const accessToken = await jwk.generateToken(userData,accessTokenSecret,accessTokenLife)
        return {
          success : true,
          mess : 'Dang nhap thanh cong',
          user : userData,
          accessToken : accessToken
        }
      }else{
        return {
          success : false,
          mess : 'Dang khong nhap thanh cong'
        }
      }
    }else{
      return {
        success : false,
        mess : 'Dang nhap khong thanh cong'
      }
    }
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async create (email:string,password:string,username:string) {
    const user = await this.usersRepository.findOne({
      where:{email}
    })
    if(user){
      return {
        success: false,
        mess:'Email da ton tai'
      }
    }else{
      const hashPassword = bcrypt.hashSync(password, SALT_ROUNDS);
      const user = {
        username: username,
        password: hashPassword,
        email : email
      };
      const newUser =  await this.usersRepository.save(user)
      if(!newUser){
        return {
          success : false,
          mess:'Thu lai !'
        }
      }else{
        return {
          success : true,
          newUser : newUser
      }
    }
    }
  }
}