import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend';
  showChatRoom:  boolean= false;
  userForm: FormGroup;
  constructor(private formBuilder:FormBuilder,private changeDetect:ChangeDetectorRef){

    this.userForm=this.formBuilder.group({
      userName:['',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]]
    });

  }
  get userName(){return this.userForm.get('userName');}

  joinRoom(){
    this.showChatRoom=true;
  }
}
