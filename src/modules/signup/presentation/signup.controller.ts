import { Body, Controller, Post } from '@nestjs/common';

@Controller('signup')
export class SignupController {
  @Post()
  async handle(@Body() params: any): Promise<any> {
    if (!params.body.name) {
      return {
        statusCode: 404,
        body: new Error('Name is required'),
      };
    }
  }
}
