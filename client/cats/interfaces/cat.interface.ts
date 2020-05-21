export interface Cat {
  id: number;
  name: string;
  age: number;
  breed: string;
}

export interface CreateCatRequest {
  name: string;
  age: number;
  breed: string;
}

export interface GetCatRequest {
  name: string;
}

export interface GetCatResponse {
  cat: Cat;
}

export interface CreateCatResponse {
  cat: Cat;
}

export interface ListCatResponse {
  cats: Cat[];
}
