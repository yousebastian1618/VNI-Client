import {Component, OnDestroy} from '@angular/core';
import {SubBlog} from '../../components/sub-blog/sub-blog';
import {Icon} from '../../components/icon/icon';
import {Location} from '@angular/common';
import {Buttons} from '../../components/buttons/buttons';
import {ADMIN_MANAGE_BLOGS_BUTTONS} from '../../objects/buttons';
import {BlogService} from '../../services/blog-service';

@Component({
  selector: 'app-blogs',
  imports: [
    SubBlog,
    Icon,
    Buttons
  ],
  templateUrl: './blogs.html',
  styleUrl: './blogs.scss'
})
export class Blogs implements OnDestroy {
  draggingElement: any = null;
  dragOverElement: any = null;
  constructor(
    private location: Location,
    private blogService: BlogService
  ) {}
  getBlogs() {
    return this.blogService.getBlogs();
  }

  goBack() {
    this.location.back();
  }

  getAdminManageBlogsButtons() {
    return ADMIN_MANAGE_BLOGS_BUTTONS;
  }

  toggleDraggable() {
    return this.blogService.sortingBlogs;
  }

  isSortingBlogs() {
    return this.blogService.sortingBlogs;
  }

  onDragStart(index: number) {
    this.draggingElement = this.blogService.getBlogs()[index];
  }

  onDragEnter(event: any, index: number) {
    this.dragOverElement = this.blogService.getBlogs()[index];
    this.swap();
    event.preventDefault();
  }

  onDragLeave(event: any) {
    if (event.target && event.target.id.includes('blog_object')) {
      this.dragOverElement = null;
    }
    event.preventDefault();
  }

  onDragEnd() {
    this.draggingElement = null;
    this.dragOverElement = null;
  }

  swap() {
    let originalDraggingElementIndex = this.draggingElement.index;
    let originalDragOverElementIndex = this.dragOverElement.index;
    if (originalDraggingElementIndex === originalDragOverElementIndex) return;
    this.draggingElement.index = this.dragOverElement.index;
    this.blogService.getBlogs().forEach((element: any) => {
      if (originalDraggingElementIndex < originalDragOverElementIndex) {
        if (element.id !== this.draggingElement.id && element.index > originalDraggingElementIndex && element.index <= this.draggingElement.index) {
          element.index -= 1;
        }
      } else {
        if (element.id !== this.draggingElement.id && element.index < originalDraggingElementIndex && element.index >= this.draggingElement.index) {
          element.index += 1;
        }
      }
    })
    this.sortBlogs();
  }

  sortBlogs() {
    this.blogService.getBlogs().sort((a: any, b: any) => {
      if (a.index < b.index) {
        return -1;
      }
      return 1;
    })
  }
  ngOnDestroy() {
    this.blogService.toggleSelectingBlogs(false);
    this.blogService.toggleSortingBlogs(false);
  }
}
