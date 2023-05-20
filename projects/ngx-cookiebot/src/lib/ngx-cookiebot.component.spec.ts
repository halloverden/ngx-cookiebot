import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxCookiebotComponent } from './ngx-cookiebot.component';
import { NgxCookiebotConfig } from './ngx-cookiebot.config';

describe('NgxCookiebotComponent', () => {
  let component: NgxCookiebotComponent;
  let fixture: ComponentFixture<NgxCookiebotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxCookiebotComponent ],
      providers: [
        {
          provide: NgxCookiebotConfig,
          useValue: {}
        }
      ]
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
