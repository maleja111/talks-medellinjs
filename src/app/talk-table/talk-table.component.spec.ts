import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TalkTableComponent } from './talk-table.component';

describe('TalkTableComponent', () => {
  let component: TalkTableComponent;
  let fixture: ComponentFixture<TalkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TalkTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
