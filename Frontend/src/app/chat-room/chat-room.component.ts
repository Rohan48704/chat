import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { type } from 'os';
import { Subscription } from 'rxjs';
import { ChatService } from '../services/chat.service';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {
  @Input() userName: string = '';
  private usersSub: Subscription;
  private messagesSub: Subscription;
  private errorsSub: Subscription;

  users: any = [];
  messages: any = [];
  msgtext: string = '';

  constructor(private chat:ChatService,private toastr:ToastrService) {
    this.errorsSub=this.chat.error.asObservable().subscribe((err: string)=>{
      if(err){
        this.toastr.error(err, 'Something went Wrong');
      }
    });
    this.usersSub=this.chat.users.asObservable().subscribe((users:any)=>{
      if(users){
         this.users=[];
         Object.entries(users).forEach((userData)=>{
           this.users.push({
             id:userData[0],
             name:userData[1],
           });
         });
      }
    });
    this.messagesSub=this.chat.message.asObservable().subscribe((msg:any)=>{
      if(msg){
         if(typeof msg !== 'string'){
           this.messages.push(msg);
         }else {
           this.toastr.info(msg);
         }
      }
    });
   }

  ngOnInit(): void {
    if(this.userName.length>0){
      this.chat.joinRoom(this.userName);
    }
  }
  sendMessage():void{
    if(this.msgtext.length>0){
      this.chat.sendMessage(this.msgtext);
      this.msgtext='';
      console.log(this.messagesSub)
    }
  }

}
