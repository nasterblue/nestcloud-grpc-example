import {Injectable} from '@nestjs/common';
import {Boot, InjectBoot} from '@nestcloud/boot';

@Injectable()
export class AppService {
  constructor(@InjectBoot() private boot: Boot) {
  }

  get(path, defaultValue): any {
    return this.boot.get<string>(path, defaultValue);
  }
}