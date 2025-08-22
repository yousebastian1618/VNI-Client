import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniTable } from './mini-table';

describe('MiniTable', () => {
  let component: MiniTable;
  let fixture: ComponentFixture<MiniTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MiniTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniTable);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
