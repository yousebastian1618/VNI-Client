import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewParagraph } from './new-paragraph';

describe('NewParagraph', () => {
  let component: NewParagraph;
  let fixture: ComponentFixture<NewParagraph>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewParagraph]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewParagraph);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
