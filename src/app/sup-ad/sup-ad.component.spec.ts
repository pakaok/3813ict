import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupAdComponent } from './sup-ad.component';

describe('SupAdComponent', () => {
  let component: SupAdComponent;
  let fixture: ComponentFixture<SupAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have username',()=>{
    component.username='super'
    expect(component.username).toEqual('super')
  })
});
