import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  HostListener,
  Output,
  Input,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClipboardService } from 'ngx-clipboard';
import { CourseClientService } from './../../course-client.service';
import { DomSanitizer } from '@angular/platform-browser';

import * as _ from 'lodash';
import { EventEmitter } from 'events';
import { AuthService } from 'auth';
import { Subject } from 'rxjs';

declare var hljs: any;

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}

@Component({
  selector: 'app-user-course-content-list',
  templateUrl: './user-course-content-list.component.html',
  styleUrls: ['./user-course-content-list.component.css'],
})
export class UserCourseContentListComponent implements OnInit {
  userId: string;
  pageNo: number = 0;
  totalPages: number;

  breadcrumbItems = [];

  @Input() changing: Subject<any>;

  @Input()
  section: any;

  constructor(
    private courseService: CourseClientService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private _clipboardService: ClipboardService,
    private authService: AuthService,
    public sanitizer: DomSanitizer
  ) {
    console.log('user course content list');
    this.userId = this.authService.getLoggedInUsername();

    this.route.params.subscribe((params) => {
      let section = {
        sectionId: params['sectionId'],
        sectionName: params['sectionName'],
      };
      console.log('params:', params);
      this.loadSectionContent(section);
    });
  }

  loadSectionContent(section) {
    console.log('loadSectionContent child', section);
    this.section = section;
    this.list();
  }

  ngOnInit(): void {
    console.log('init', this.section);
  }

  listModules() {}

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    //console.log(event.key , this.pageNo);

    if (event.keyCode === KEY_CODE.RIGHT_ARROW) {
      this.nextPage(this.pageNo);
    }

    if (event.keyCode === KEY_CODE.LEFT_ARROW) {
      this.previousPage(this.pageNo);
    }
  }

  lectures: any;

  @Input()
  sectionContents: any;

  list() {
    this.sectionContents = null;
    this.totalPages = 0;
    this.pageNo = 0;
    this.courseService
      .getPendingContents(this.section.sectionId, this.userId)
      .subscribe((res) => {
        this.sectionContents = res;
        if (this.sectionContents.length > 0) {
          this.totalPages = this.sectionContents.length;
          this.nextPage(this.pageNo);
        }
        //this.createReport(res);
      });
  }

  lectureContent: any;

  getContent(content) {
    console.log('Get content id -', content);
    this.lectureContent = null;
    this.courseService.getContent(content.id).subscribe((res) => {
      this.lectureContent = res;
    });
  }

  nextPage(pageNo) {
    console.log('Next Page,', pageNo);
    if (pageNo >= 0 && pageNo < this.totalPages) {
      let obj = this.sectionContents[pageNo];

      this.getContent(obj);
      this.pageNo = pageNo + 1;
    }
  }

  currentPage(pageNo) {
    this.pageNo = pageNo;
    let obj = this.sectionContents[pageNo - 1];

    this.getContent(obj);
  }

  previousPage(pageNo) {
    if (pageNo > 1 && pageNo <= this.totalPages) {
      console.log('Previous: Page No:' + pageNo);
      let obj = this.sectionContents[pageNo - 2];
      this.getContent(obj);
      this.pageNo = pageNo - 1;
    }
  }

  goto(pageNo) {
    if (pageNo > 0 && pageNo <= this.totalPages) {
      let obj = this.sectionContents[pageNo - 1];
      this.getContent(obj);
    }
  }

  copySuccess() {
    this.toastr.success('Copied');
  }
  callServiceToCopy(content) {
    this._clipboardService.copyFromContent(content);
    this.toastr.success('Copied', '', { timeOut: 1000 });
  }

  update(contentId, status) {
    this.courseService
      .updateActivity(this.userId, contentId, status)
      .subscribe((res) => {
        this.sectionContents.splice(this.pageNo - 1, 1);
        this.totalPages = this.sectionContents.length;
        if (this.pageNo <= this.totalPages) {
          console.log('Next Page' + this.pageNo);
          this.nextPage(this.pageNo - 1);
        } else if (this.totalPages > 0) {
          console.log('Current Page' + this.pageNo);
          this.currentPage(this.pageNo - 1);
        } else {
          console.log('No pages');
          this.pageNo = 0;
          //this.currentLecture =null;
        }
        if (status == 'C') {
          this.toastr.success('Success', null, { timeOut: 1000 });
        } else if (status == 'S') {
          this.toastr.info('Skipped', null, { timeOut: 1000 });
        }
      });

    //this.createReport(this.lectures);
  }

  reportData: any = [];
  widgetColors = [
    'purple-plum',
    'blue-madison',
    'green-haze',
    'purple-plum',
    'red-intense',
    'blue-madison',
  ];

  contentTypes = { V: 'Videos', L: 'Links', C: 'Code', I: 'Images', P: 'PDF' };

  createReport(data) {
    this.reportData = [];
    this.reportData.push({ label: 'lectures', value: data.length });
    let dataByContentTypes = _.groupBy(data, (obj) => obj.contentType);
    let keys = Object.keys(dataByContentTypes);
    for (let type of keys) {
      let cnt = dataByContentTypes[type].length;
      let label = this.contentTypes[type];
      this.reportData.push({ label: label, value: cnt });
    }

    //  let total = data.length;

    //    let topics = data.reduce(function (sum, obj) { return sum + obj.noOfTopics }, 0);

    //this.reportData.push({ "label": "Text", "value": categories });
    //this.reportData.push({ "label": "Topics", "value": topics });
  }

  @ViewChild('code')
  codeElement: ElementRef;

  ngAfterViewInit() {
    //hljs.highlightBlock(this.codeElement.nativeElement);
  }
}
