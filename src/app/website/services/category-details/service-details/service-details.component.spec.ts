import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubServiceDetailsComponent } from './service-details.component';

describe('SubServiceDetailsComponent', () => {
  let component: SubServiceDetailsComponent;
  let fixture: ComponentFixture<SubServiceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubServiceDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubServiceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
