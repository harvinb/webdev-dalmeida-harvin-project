import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLeagueListComponent } from './admin-league-list.component';

describe('AdminLeagueListComponent', () => {
  let component: AdminLeagueListComponent;
  let fixture: ComponentFixture<AdminLeagueListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminLeagueListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminLeagueListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
