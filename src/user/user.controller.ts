import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Res,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
// import { FileInterceptor } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
import { ApiTags, ApiBody, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UserDTO } from './dto/user.dto';

@ApiTags('User')
@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // GET USER
  @Get()
  async getUser(): Promise<any> {
    return this.userService.getUser();
  }

  // POST USER
  @Post('')
  @ApiBody({ type: UserDTO })
  async postUser(@Body() body: UserDTO, @Res() response): Promise<any> {
    const data = await this.userService.postUser(body);
    response.status(data.status).json(data);
  }

  // DELETE USER
  @Delete('')
  @ApiQuery({ name: 'user_id', type: Number })
  async deleteUser(@Query('user_id') user_id: number): Promise<any> {
    return this.userService.deleteUser(user_id);
  }

  // PAGINATION PAGE AND SEARCH USER
  @Get('pagination-user')
  @ApiQuery({ name: 'pageIndex', type: Number, required: false })
  @ApiQuery({ name: 'pageSize', type: Number, required: false })
  @ApiQuery({ name: 'keyword', type: String, required: false })
  async paginationSearchUser(
    @Query('pageIndex') pageIndex: number,
    @Query('pageSize') pageSize: number,
    @Query('keyword') keyword: string,
  ): Promise<any> {
    const Page = Number(pageIndex);
    const Size = Number(pageSize);
    const Skip = (Page - 1) * Size;

    return this.userService.paginationSearchUser(Skip, Size, keyword);
  }

  // GET USER BY ID
  @Get(':user_id')
  @ApiParam({ name: 'user_id', type: Number })
  async getUserById(@Param('user_id') user_id: number): Promise<any> {
    return this.userService.getUserById(+user_id);
  }

  // PUT USER BY ID
  @Put(':user_id')
  @ApiBody({ type: UserDTO })
  @ApiParam({ name: 'user_id', type: Number })
  async putUserById(@Body() body: UserDTO, @Res() response): Promise<any> {
    const data = await this.userService.postUser(body);
    response.status(data.status).json(data);
  }

  // SEARCH USER BY NAME
  @Get('/search/:user_name')
  @ApiParam({ name: 'user_name', type: String })
  async getSearchUserByName(
    @Param('user_name') user_name: string,
  ): Promise<any> {
    return this.getSearchUserByName(user_name);
  }

  // UPLOAD AVATAR
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
