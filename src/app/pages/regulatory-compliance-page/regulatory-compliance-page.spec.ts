import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegulatoryCompliancePage } from './regulatory-compliance-page';

describe('RegulatoryCompliancePage', () => {
  let component: RegulatoryCompliancePage;
  let fixture: ComponentFixture<RegulatoryCompliancePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegulatoryCompliancePage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegulatoryCompliancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
