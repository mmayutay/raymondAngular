import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
    Authorization: "my-auth-token"
  })
};


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  public api = 'http://localhost:3000'

  constructor(private http: HttpClient) { }

  showAllPosts() {
    return this.http.get(this.api + "/showpost")
  }

  addUser(request) {
    return this.http.post(this.api + "/people", request)
  }
  getUserData(userData) {
    return this.http.post(this.api + "/log_in", userData)
  }

  addPosts(post) {
    return this.http.post(this.api + "/post", post)
  }

  showPostByAddress(posts) {
    return this.http.get(this.api + "/postedbyaddress/" + posts)
  }

  userDataWhoPost(user) {
    return this.http.get(this.api + "/userdata/" + user)
  }

  acceptOffer(name, recipient) {
    return this.http.get(this.api + "/sendMessage/" + name + "/" + recipient, {responseType: 'text'})
  }
  deletePost(user){
    return this.http.get(this.api + "/deletepost/"+user, {responseType: 'text'})
  }

  addAdmin(add){
    return this.http.post(this.api + "/adminadd", add, {responseType: 'text'})
  }
}
