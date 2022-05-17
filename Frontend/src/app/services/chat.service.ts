import { Injectable } from '@angular/core';
import { time } from 'console';
import { BehaviorSubject } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  users: BehaviorSubject<any> = new BehaviorSubject(null);
  message: BehaviorSubject<any> = new BehaviorSubject(null);
  error: BehaviorSubject<any> = new BehaviorSubject(null);

  private socket = io('http://localhost:3000');
  private userCheck: boolean = true;
  constructor() {
    this.initSocketListners();
  }
  initSocketListners():void {
    this.socket.on("update", (msg) => {
        this.message.next(msg)
    });
    this.socket.on("update-people",(users) => {
      this.users.next(users);
    });
    this.socket.on("chat", (userName, msg, time) => {
        this.message.next({ user: userName, msg: msg, time: time });
    });

    this.socket.on("dissconnect", () => {
      this.error.next("the server is not available");
    })
  }
  joinRoom(userName: string) {
    this.socket.emit('join', userName);
  }
  sendMessage(message: string) {
    this.socket.emit('send', message);
  }
}
