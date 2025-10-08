import {Injectable} from '@angular/core';
import {BaseService} from "../../shared/services/base.service";
import {User} from "../models/user.entity";

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User>{

  constructor() {
    super();
    this.resourceEndpoint = '/users';
  }

  getUserById(userId : Number){
    this.setToken()
    return this.http.get<User>(`${this.resourcePath()}/${userId}`, this.httpOptionsAuthorized)
  }
}
