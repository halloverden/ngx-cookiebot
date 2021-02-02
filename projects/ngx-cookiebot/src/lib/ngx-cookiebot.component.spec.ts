import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCookiebotComponent } from './ngx-cookiebot.component';

describe('NgxCookiebotComponent', () => {
  let component: NgxCookiebotComponent;
  let fixture: ComponentFixture<NgxCookiebotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCookiebotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxCookiebotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
