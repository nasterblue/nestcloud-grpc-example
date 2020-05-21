import {ApiProperty} from '@nestjs/swagger';

export enum CatBreed {
  male = 'male',
  female = 'female'
}

export class CreateCatDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  breed: string;
}