import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReachServiceComponent } from './reach-service.component';

describe('ReachServiceComponent', () => {
  let component: ReachServiceComponent;
  let fixture: ComponentFixture<ReachServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReachServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReachServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
