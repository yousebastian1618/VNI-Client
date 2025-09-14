import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBlog } from './new-blog';

describe('NewBlog', () => {
  let component: NewBlog;
  let fixture: ComponentFixture<NewBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
