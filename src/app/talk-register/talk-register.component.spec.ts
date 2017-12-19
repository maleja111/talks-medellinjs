import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkRegisterComponent } from './talk-register.component';

describe('TalkRegisterComponent', () => {
  let component: TalkRegisterComponent;
  let fixture: ComponentFixture<TalkRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
