import {Injectable} from "@nestjs/common";
import {InjectBoot, Boot} from "@nestcloud/boot";

@Injectable()
export class AppService {
  constructor(@InjectBoot() private readonly boot: Boot,) {
  }

  get(path, defaultValue): string {
    return this.boot.get<string>(path, defaultValue);
  }
}