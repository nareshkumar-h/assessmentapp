import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SonarcloudComponent } from './sonarcloud.component';

describe('SonarcloudComponent', () => {
  let component: SonarcloudComponent;
  let fixture: ComponentFixture<SonarcloudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SonarcloudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SonarcloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
