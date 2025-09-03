import { Injectable } from '@angular/core';
import {BLOGS} from '../objects/objects';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  currentBlogTitle: string = '';
  currentBlogSubtitle: string = '';
  currentBlogParagraphs: any[] = [];
  currentBlogImages: any[] = [];
  currentBlogUploadedAt: String = '';
  currentBlogAuthor: String = '';

  selectedBlogs: any[] = [];
  selectingBlogs: boolean = false;
  sortingBlogs: boolean = false;
  constructor() {}
  getBlogs() {
    return BLOGS;
  }
  setCurrentBlog(blog: any) {
    this.currentBlogTitle = blog.title;
    this.currentBlogSubtitle = blog.subtitle;
    this.currentBlogParagraphs = Array.isArray(blog?.paragraphs) ? blog.paragraphs : [];
    this.currentBlogImages = Array.isArray(blog?.images) ? blog.images : [];
    this.currentBlogUploadedAt = blog.uploaded_at;
    this.currentBlogAuthor = blog.author;
  }
  resetCurrentBlog() {
    this.currentBlogTitle = '';
    this.currentBlogSubtitle = '';
    this.currentBlogParagraphs = [];
    this.currentBlogImages = [];
    this.currentBlogUploadedAt = '';
    this.currentBlogAuthor = '';
  }
  toggleSelectingBlogs(toggle?: boolean) {
    this.selectingBlogs = toggle !== undefined ? toggle : !this.selectingBlogs;
    if (!this.selectingBlogs) {
      this.unselectAllBlogs();
    }
  }
  toggleSortingBlogs(toggle?: boolean) {
    this.sortingBlogs = toggle !== undefined ? toggle : !this.sortingBlogs;
  }
  areSomeBlogsSelected() {
    return this.selectedBlogs.length > 0;
  }
  toggleSelectBlogs(blog: any) {
    if (this.isBlogSelected(blog)) {
      this.selectedBlogs = this.selectedBlogs.filter((b: any) => b.id !== blog.id);
    } else {
      this.selectedBlogs.push(blog);
    }
  }
  isBlogSelected(blog: any) {
    return this.selectedBlogs.find((b: any) => b.id === blog.id);
  }
  unselectAllBlogs() {
    this.selectedBlogs = [];
  }
}
