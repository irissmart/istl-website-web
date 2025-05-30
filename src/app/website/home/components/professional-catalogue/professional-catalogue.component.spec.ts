import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalCatalogueComponent } from './professional-catalogue.component';

describe('ProfessionalCatalogueComponent', () => {
  let component: ProfessionalCatalogueComponent;
  let fixture: ComponentFixture<ProfessionalCatalogueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalCatalogueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessionalCatalogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
