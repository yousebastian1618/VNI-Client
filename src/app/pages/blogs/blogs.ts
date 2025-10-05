import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubBlog} from '../../components/sub-blog/sub-blog';
import {Icon} from '../../components/icon/icon';
import {Buttons} from '../../components/buttons/buttons';
import {ADMIN_MANAGE_BLOGS_BUTTONS} from '../../objects/buttons';
import {BlogService} from '../../services/blog-service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user-service';

@Component({
  selector: 'app-blogs',
  imports: [
    SubBlog,
    Icon,
    Buttons,
  ],
  templateUrl: './blogs.html',
  styleUrl: './blogs.scss'
})
export class Blogs implements OnInit, OnDestroy {
  draggingElement: any = null;
  dragOverElement: any = null;
  constructor(
    private blogService: BlogService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnInit() {
    this.blogService.getBlogsObservable()
      .subscribe(arr => {
        this.blogService.tempBlogs = [...structuredClone(arr)];
      });
  }
  getTempBlogs() {
    return this.blogService.tempBlogs;
  }
  async goBack() {
    await this.router.navigate(['/']);
  }

  getAdminManageBlogsButtons() {
    return ADMIN_MANAGE_BLOGS_BUTTONS;
  }

  showAdminCrudBlog() {
    return this.userService.isAdmin() && this.router.url === '/blogs';
  }

  toggleDraggable() {
    return this.blogService.sortingBlogs;
  }

  isSortingBlogs() {
    return this.blogService.sortingBlogs;
  }

  onDragStart(index: number) {
    this.draggingElement = this.blogService.tempBlogs[index];
  }

  onDragEnter(event: any, index: number) {
    this.dragOverElement = this.blogService.tempBlogs[index];
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
    this.blogService.tempBlogs.forEach((element: any) => {
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
    this.blogService.blogSorted = true;
  }

  sortBlogs() {
    this.blogService.tempBlogs.sort((a: any, b: any) => {
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
