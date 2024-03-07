import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';

// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { ApiTags, ApiBody, ApiQuery } from '@nestjs/swagger';
import { DeleteUserDTO, PostUserDTO } from './dto/user.dto';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET USER
  @Get()
  async getUser(): Promise<any> {
    return this.userService.getUser();
  }

  @Post('')
  @ApiBody({ type: PostUserDTO })
  async postUser(@Body() body: PostUserDTO, @Res() response): Promise<any> {
    const data = await this.userService.postUser(body);
    response.status(data.status).json(data);
  }

  @Delete('')
  @ApiQuery({ name: 'user_id', type: 'number' })
  async deleteUser(
    @Query('user_id') user_id: number,
    @Res() response,
  ): Promise<any> {
    const data = await this.userService.deleteUser(user_id);
    response.status(data.status).json(data);
  }

  @Get('/pagination-search-user')
  async paginationSearchUser() {}

  @Get('/:id')
  async getUserById() {}

  @Put('/:id')
  async putUser() {}

  @Get('/search/:user_name')
  async getSearchUserByName() {}

  @Post('/upload-avatar')
  async uploadAvatar() {}
  // @Post('/upload')
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     storage: diskStorage({
  //       destination: process.cwd() + '/public/img',
  //       filename: (req, file, callback) => {
  //         callback(null, new Date().getTime() + `${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
}
