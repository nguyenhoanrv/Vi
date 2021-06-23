import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { Users } from './user.entity';
import { UsersService } from './users.service';
const jwk = require('../../util/jwt-helper.js')

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }
  @Get()
  async findAll(): Promise<Users[]> {
    return this.usersService.findAll()
  }
  // @Get(':id')
  // get(@Param() params) {
  //   return this.usersService.findOne(params.id);
  // }
  @Post()
  async get(@Body() body) {
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'abc12345678910JErIuyiBDUIwmWMnlAY9QbLzoa'
    const decode = await jwk.verifyToken(body.token, secretKey)
    return this.usersService.findOne(decode.data.id)
  }
  @Post('/register')
  create(@Body() body) {
    return this.usersService.create(body.email, body.password, body.username)
  }
  @Post('/login')
  login(@Body() body) {
    return this.usersService.login(body.email, body.password)
  }
  @Get('verifyToken')
  async verifyToken(@Headers() header) {
    const token = header.authorization.split(' ')[1]
    const secretKey = process.env.ACCESS_TOKEN_SECRET || 'abc12345678910JErIuyiBDUIwmWMnlAY9QbLzoa'
    const decode = await jwk.verifyToken(token, secretKey)
    const res = await this.usersService.findOne(decode.data.id)
    if (res) {
      return ({
        'id': res.id,
        'status': true
      })
    } else {
      return ({
        'status': false
      })
    }
  }
}