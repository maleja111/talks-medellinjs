import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TalkService } from '../shared/services/talk.service';
import { TalkTableComponent } from './talk-table.component';
import { HttpModule } from '@angular/http';

describe('TalkTableComponent', () => {
  let component: TalkTableComponent;
  let fixture: ComponentFixture<TalkTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [TalkTableComponent],
      providers: [TalkService]
    }).compileComponents();
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
