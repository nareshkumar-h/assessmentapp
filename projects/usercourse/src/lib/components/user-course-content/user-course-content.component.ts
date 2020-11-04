import { Component, OnInit, ViewChild } from '@angular/core';
import { CourseClientService } from '../../course-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import * as _ from 'lodash';
import { UserCourseService } from '../../usercourse.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'projects/auth/src/public-api';
import { UserCourseContentListComponent } from '../user-course-content-list/user-course-content-list.component';
import { Subject } from 'rxjs';
@Component({
  selector: 'uc-user-course-content',
  templateUrl: './user-course-content.component.html',
  styleUrls: ['./user-course-content.component.css']
})
export class UserCourseContentComponent implements OnInit {

  userId:any;
  courseId:any;
  courseName:any;
  courseCode:any;
  selectedCourse:any;

  @ViewChild(UserCourseContentListComponent,{ static: false }) 
  private userCourseContentList:UserCourseContentListComponent;

  constructor(private courseService:CourseClientService, private userCourseService:UserCourseService, private route:ActivatedRoute,
    private toastr:ToastrService, private authService:AuthService, private router:Router
    ) { 
    this.userId = this.authService.getLoggedInUsername();
    this.route.params.subscribe(params=>{
      console.log(params);
      this.courseId =  params["courseId"];
      //this.userId =  params["userId"];
      this.courseName = params["courseName"];
    });
    this.selectedCourse = userCourseService.getCourse();
  }

  ngAfterViewInit() {
    // child is set
    console.log("call child", this.selectedSection);
  }

  ngOnInit(): void {
    
    //this.findOne();
    this.findSections();
  }

  mode:string;

  addContent(){
    this.mode = "A";
  }

  saveContent(){
    this.mode = null;
    this.toastr.success("Success");
  }

  contents:any;
  course:any;

  content = { content: null };


  sections:any;
  findSections(){
    this.courseService.getPendingCourseSections(this.courseId, this.userId).subscribe (res=>{
      let data:any = res;
      this.sections = data.filter(obj=>obj.pending>0);
      if(this.sections.length >0){
       this.loadSectionContent(this.sections[0]);
      // this.changingValue.next(this.selectedSection);
    }
     /* this.loadMenus(this.sections);
      if(this.sections && this.sections.length>0){
        this.loadSectionContent(this.sections[0]);
      }*/
    });
  }

  selectedSection:any;

  changingValue: Subject<any> = new Subject();

  loadSectionContent(section){
    this.selectedSection = section;
    console.log(this.selectedSection);
    console.log(this.userCourseContentList);
    this.router.navigate([  section.sectionId + "/" + section.sectionName],{ relativeTo: this.route});
  }

    
  reportData: any = [];
  widgetColors = ["purple-plum", "blue-madison", "green-haze", "purple-plum", "red-intense","blue-madison"];

  contentTypes = {"V":"Videos", "L": "Links", "C" : "Code","I":"Images", "P": "PDF"};

  createReport(data) {
    
    this.reportData = [];
    this.reportData.push({ "label": "Contents", "value": data.length });
    let dataByContentTypes=  _.groupBy(data, obj => obj.contentType);
    let keys = Object.keys(dataByContentTypes);
    for( let type of keys){
      let cnt = dataByContentTypes[type].length;
      let label = this.contentTypes[type];
      this.reportData.push({ "label": label, "value": cnt });
    }
  }

  menus= [];



}
