import {Observable} from 'rxjs';
import {GetCatRequest, GetCatResponse, CreateCatRequest, CreateCatResponse, ListCatResponse} from './cat.interface';

export interface CatService {
  create(data: CreateCatRequest): Observable<CreateCatResponse>;

  get(data: GetCatRequest): Observable<GetCatResponse>;

  list(data: any): Observable<ListCatResponse>;
}
