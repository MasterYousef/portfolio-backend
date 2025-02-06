import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import SignUp from './dto/sign_up.dto';
import Login from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import user from 'src/decorator/user.decorator';
import UpdateUser from './dto/update_user.dto';
import { File } from 'src/decorator/file.decorator';
import ChangePassword from './dto/change_password.dto';
import ResetPassword from './dto/reset_password.dto';
import { User } from './auth.schema';
import CodeSend from './dto/code_send.dto';
import { plainToInstance } from 'class-transformer';
import errors from 'src/validations/file.validation';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Public()
  @Post('sign_up')
  sign_up(@Body() user: SignUp) {
    return this.authService.sign_up(user);
  }
  @Public()
  @Post('login')
  login(@Body() user: Login) {
    return this.authService.login(user);
  }
  @Public()
  @Get(':id')
  get_user(@Param('id') id: string) {
    return this.authService.get_user(id);
  }

  @Get('user')
  get_logged_user(@user('') user: User) {
    return this.authService.get_logged_user(user);
  }

  @Put(':id')
  async update_user(
    @Param('id') id: string,
    @Req() req: Request,
    @File() file: Buffer,
  ) {
    const data = plainToInstance(UpdateUser, req.body);
    await errors(data);
    return this.authService.update_user(id, data, file);
  }

  @Put(':id/change_password')
  change_password(@Body() data: ChangePassword, @Param('id') id: string) {
    return this.authService.change_password(data, id);
  }
  @Public()
  @Post('forgot_password')
  forgot_password(@Body('email') email: string) {
    return this.authService.forgot_password(email);
  }

  @Public()
  @Post('send_code')
  send_code(@Body() data: CodeSend) {
    return this.authService.send_code(data);
  }

  @Public()
  @Put('reset_password')
  reset_password(@Body() data: ResetPassword) {
    return this.authService.reset_password(data);
  }
}
