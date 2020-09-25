import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsercourseModule } from '@nareshkumarh/usercourse';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsercourseModule.forRoot({API_ENDPOINT:environment.API_URL})
  ]
})
export class UserCourseWrapperModule { }
