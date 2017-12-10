import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTeamDetailsComponent } from './home-team-details.component';

describe('HomeTeamDetailsComponent', () => {
  let component: HomeTeamDetailsComponent;
  let fixture: ComponentFixture<HomeTeamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTeamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTeamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
