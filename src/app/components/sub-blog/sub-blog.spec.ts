import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubBlog } from './sub-blog';

describe('SubBlog', () => {
  let component: SubBlog;
  let fixture: ComponentFixture<SubBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
