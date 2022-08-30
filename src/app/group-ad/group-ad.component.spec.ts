import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupAdComponent } from './group-ad.component';

describe('GroupAdComponent', () => {
  let component: GroupAdComponent;
  let fixture: ComponentFixture<GroupAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GroupAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
