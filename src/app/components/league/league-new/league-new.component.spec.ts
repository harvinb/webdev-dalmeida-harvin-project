import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueNewComponent } from './league-new.component';

describe('LeagueNewComponent', () => {
  let component: LeagueNewComponent;
  let fixture: ComponentFixture<LeagueNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
