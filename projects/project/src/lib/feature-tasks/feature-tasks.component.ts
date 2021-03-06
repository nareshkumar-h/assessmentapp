import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'auth';
import { AddFeatureTaskComponent } from '../add-feature-task/add-feature-task.component';
import { AddTaskIssueComponent } from '../components/add-task-issue/add-task-issue.component';
import { EditFeatureTaskComponent } from '../components/edit-feature-task/edit-feature-task.component';
import { ProjectService } from '../project.service';

@Component({
  selector: 'lib-feature-tasks',
  templateUrl: './feature-tasks.component.html',
  styleUrls: ['./feature-tasks.component.css'],
})
export class FeatureTasksComponent implements OnInit {
  @Input()
  feature: any;

  @Input()
  taskType: any;

  @Input()
  title: string;

  projectId;
  featureId;
  isMentor: boolean;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private projectService: ProjectService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.parent.params.subscribe((params) => {
      this.projectId = params['projectId'];
    });
    this.isMentor = this.authService.hasRoleAccess('T');
  }

  ngOnInit(): void {
    this.listTasks();
  }

  projectTasks: any = [];

  listTasks() {
    this.projectService.listFeatureTasks(this.feature.id).subscribe((res) => {
      console.log(res);
      let tasks: any = res;
      if (this.taskType == 'BUG') {
        this.projectTasks = tasks.filter(
          (obj) => obj.category == 'BUG' || obj.category == 'Testing'
        );
      } else {
        this.projectTasks = tasks.filter(
          (obj) => obj.category != 'BUG' && obj.category != 'Testing'
        );
      }
    });
  }

  addTask() {
    let taskName = prompt('Enter task name');
    if (taskName && taskName.length > 0) {
      let task = {
        name: taskName,
        description: '',
        estimation: 1,
        featureId: this.feature.id,
      };
      this.projectService.addTask(this.feature.id, task).subscribe((res) => {
        this.toastr.success('Successfully Added Task');
        this.listTasks();
      });
    }
  }

  updateTaskStatus(task, checked) {
    let status = checked ? 'COMPLETED' : 'PENDING';
    console.log(status);
    this.updateStatus(task.id, status);
  }

  updateStatus(taskId, status) {
    this.projectService
      .updateTaskStatus(this.projectId, taskId, status)
      .subscribe((res) => {
        this.toastr.success('Task Status Updated');
        this.listTasks();
      });
  }

  createIssueDialog(task) {
    let modalData = {
      projectId: this.projectId,
      feature: this.feature,
      task: task,
    };
    console.log(modalData);
    const dialogRef = this.dialog.open(AddTaskIssueComponent, {
      width: '100%',
      height: 'fit-content',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listTasks();
    });
  }

  addTaskDialog(taskType) {
    let modalData = {
      projectId: this.projectId,
      feature: this.feature,
      taskType: taskType,
    };
    console.log(modalData);
    const dialogRef = this.dialog.open(AddFeatureTaskComponent, {
      width: '800px',
      height: 'fit-content',
      data: modalData,
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listTasks();
    });
  }

  editTaskDialog(task) {
    const dialogRef = this.dialog.open(EditFeatureTaskComponent, {
      width: '800px',
      height: 'fit-content',
      data: { projectId: this.projectId, feature: this.feature, task: task },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.listTasks();
    });
  }

  deleteTask(taskId, status) {
    let cfm = confirm('Do you want to delete ?');
    if (cfm) {
      this.projectService
        .deleteTask(this.feature.id, taskId)
        .subscribe((res) => {
          this.toastr.success('Task Deleted');
          this.listTasks();
        });
    }
  }
}
