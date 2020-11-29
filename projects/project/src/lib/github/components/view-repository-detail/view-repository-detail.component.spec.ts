import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRepositoryDetailComponent } from './view-repository-detail.component';

describe('ViewRepositoryDetailComponent', () => {
  let component: ViewRepositoryDetailComponent;
  let fixture: ComponentFixture<ViewRepositoryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRepositoryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRepositoryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
