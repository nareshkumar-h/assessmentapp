import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteThemeComponent } from './site-theme.component';

describe('SiteThemeComponent', () => {
  let component: SiteThemeComponent;
  let fixture: ComponentFixture<SiteThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
