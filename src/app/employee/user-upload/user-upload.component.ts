import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/UserService';
import { fileUploadModel } from 'src/app/models/fileUploadModel';

@Component({
  selector: 'app-user-upload',
  templateUrl: './user-upload.component.html',
  styleUrls: ['./user-upload.component.css']
})
export class UserUploadComponent implements OnInit {
  
  public fileToUpload: File = null;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  uploadFileToActivity() {
    this.userService.uploadFile(this.fileToUpload, sessionStorage.getItem("periodId"), sessionStorage.getItem("employeeId")).subscribe(data => {
      if (data) {
        window.alert(data['message']);
      }
      
      }, error => {
        console.log(error);
      });
  }

  downloadFileToActivity(){
    const newfilemodel: fileUploadModel = { employeeId : sessionStorage.getItem("employeeId"), periodId : sessionStorage.getItem("periodId") } as fileUploadModel;
    this.userService.downloadFile(newfilemodel).subscribe({
      next: (data) => {
        console.log(data);
        if(data)
        {            
          console.log("data retrieved");
          //window.alert(data['message']);
        }        
      },
      error: (err) => {}
    });
  }
}
