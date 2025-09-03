import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainBlog } from './main-blog';

describe('MainBlog', () => {
  let component: MainBlog;
  let fixture: ComponentFixture<MainBlog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainBlog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainBlog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
