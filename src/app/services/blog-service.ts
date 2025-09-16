import { Injectable } from '@angular/core';
import {NEW_BLOG_FORM, NEW_BLOG_PARAGRAPH_FORM} from '../objects/forms';
import {FileService} from './file-service';
import {BehaviorSubject, firstValueFrom, last, lastValueFrom, Observable, tap} from 'rxjs';
import {SUBMIT_BLOG_BUTTONS} from '../objects/buttons';
import {GqlService} from './gql-service';
import {BLOGS_GQL, CREATE_BLOG, DELETE_BLOG, DELETE_BLOGS, REORDER_BLOGS, UPDATE_BLOG} from '../objects/gql';
import {Router} from '@angular/router';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {HomeService} from './home-service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  blogsSubject = new BehaviorSubject<any[]>([]);
  blogs$ = this.blogsSubject.asObservable();
  tempBlogs: any[] = [];
  currentBlogTitle: string = '';
  currentBlogSubtitle: string = '';
  currentBlogParagraphs: any[] = [];
  currentBlogUploadedAt: String = '';
  currentBlogAuthor: String = '';
  selectedBlogs: any[] = [];
  selectingBlogs: boolean = false;
  sortingBlogs: boolean = false;
  blogSorted: boolean = false;
  newBlogForm: any[] = [];
  newBlogParagraphsForm: any[] = [];
  currentParagraphIndex: number = 0;
  previewing: boolean = false;
  previewingData: any = {};
  crudState: string = '';
  constructor(
    private fileService: FileService,
    private gqlService: GqlService,
    private router: Router,
    private http: HttpClient,
    private homeService: HomeService,
  ) {
  }
  fetchBlogs() {
    return this.gqlService.gqlQuery(
      BLOGS_GQL,
      false,
      '',
      (response: any) => {
        this.blogsSubject.next([...response.blogs]);
      },
      () => {}
    )
  }
  async crudBlog(copiedPreviewingData: any) {
    await this.uploadBlogImagesToCloud(copiedPreviewingData.paragraphs);
    await this.submitBlogToDatabase(copiedPreviewingData);
  }
  async uploadBlogImagesToCloud(paragraphs: any[]) {
    this.homeService.startLoading();
    try {
      const tasks: Promise<any>[] = [];
      for (let i = 0; i < paragraphs.length; i++) {
        const file = await this.fileService.getFile(`blog_image_${i}`);
        const uuid = paragraphs[i].image;
        if (!file) continue;
        const task = (async () => {
          // 1) get presigned URL
          const { uploadUrl, contentType } = await firstValueFrom(
            this.getUploadBlogImagePresignedURL(file, uuid)
          );
          // 2) upload to R2; wait for the final event
          await lastValueFrom(
            this.putToR2(uploadUrl, file, contentType).pipe(
              tap(event => {
                if (event.type === HttpEventType.UploadProgress && event.total) {
                  console.log(Math.round((100 * event.loaded) / event.total));
                }
              }),
              last() // completes when upload stream completes
            )
          );
        })();
        tasks.push(task);
      }
      await Promise.all(tasks);          // <-- waits for every upload
      this.toggleReviewingBlog(false);   // all done
    } finally {
      this.homeService.stopLoading?.();
    }
  }
  submitBlogToDatabase(copiedPreviewingData: any) {
    return new Promise<void>((resolve, reject) => {
      let gqlInput = copiedPreviewingData;
      this.gqlService.gqlMutation(
        this.crudState === 'create' ? CREATE_BLOG : UPDATE_BLOG,
        true,
        { gqlInput },
        this.crudState === 'create' ? "Blog Created." : 'Blog Updated',
        async (response: any) => {
          if (this.crudState === 'create') {
            const current = this.blogsSubject.getValue();
            this.blogsSubject.next([...current, response.createBlog]);
            SUBMIT_BLOG_BUTTONS.find(b => b.name === 'submit|new-blog').loading = false;
            await this.router.navigate(['blogs']);  // navigate after DB write succeeds
            resolve();
          } else if (this.crudState === 'update') {
            const current = [...this.blogsSubject.getValue()];
            let targetBlog = this.blogsSubject.getValue().find((b: any) => b.id === copiedPreviewingData.id);
            let index = current.indexOf(targetBlog);
            current[index] = response.updateBlog;
            this.blogsSubject.next([...current]);
            await this.router.navigate(['blogs']);  // navigate after DB write succeeds
          }
        },
        (err: any) => {
          SUBMIT_BLOG_BUTTONS.find(b => b.name === 'submit|new-blog').loading = false;
          reject(err);
        }
      );
    });
  }
  reorderBlogs() {
    let gqlInput: any[] = this.tempBlogs.map((b: any) => {
      return {
        id: b.id,
        index: b.index
      }
    })
    return this.gqlService.gqlMutation(
      REORDER_BLOGS,
      true,
      { gqlInput },
      "Updated",
      () => {
        this.blogsSubject.next([...this.tempBlogs]);
        this.toggleSortingBlogs(false);
      },
      () => {},
      true
    )
  }

  deleteBlogSingle(uid: string) {
    let original = JSON.parse(JSON.stringify(this.blogsSubject.getValue()));
    return this.gqlService.gqlMutation(
      DELETE_BLOG,
      true,
      { uid },
      "Deleted blog.",
      () => {
        let current = JSON.parse(JSON.stringify(this.blogsSubject.getValue()));
        current = current.filter((blog: any) => blog.id !== uid);
        current = this.reorderBlogsLocal(current);
        this.blogsSubject.next([...current]);
      },
      () => {},
      false,
      true,
      () => {
        this.blogsSubject.next([...original]);
      }
    )
  }

  deleteBlogsMultiple() {
    let original = JSON.parse(JSON.stringify(this.blogsSubject.getValue()));
    let uids = this.selectedBlogs.map((b: any) => b.id);
    return this.gqlService.gqlMutation(
      DELETE_BLOGS,
      true,
      { uids },
      "Deleted",
      () => {
        let current = JSON.parse(JSON.stringify(this.blogsSubject.getValue()));
        current = current.filter((blog: any) => uids.indexOf(blog.id) === -1);
        current = this.reorderBlogsLocal(current);
        this.blogsSubject.next([...current]);
        this.toggleSelectingBlogs();
      },
      () => {},
      false,
      true,
      () => {
        this.blogsSubject.next([...original]);
      }
    )
  }
  async swapParagraphOrder(index1: number, index2: number) {
    let temp = this.getNewBlogParagraphsForm()[index1];
    this.getNewBlogParagraphsForm()[index1] = this.getNewBlogParagraphsForm()[index2];
    this.getNewBlogParagraphsForm()[index2] = temp;
    let tempFile1 = await this.fileService.getFile(`blog_image_${index1}`);
    let tempFile2 = await this.fileService.getFile(`blog_image_${index2}`);
    this.fileService.saveFile(`blog_image_${index2}`, tempFile1);
    this.fileService.saveFile(`blog_image_${index1}`, tempFile2)
    await this.saveToSession();
  }
  reorderBlogsLocal(blogs: any[]) {
    for (let i=0; i<blogs.length; i++) {
      blogs[i].index = i;
    }
    return blogs;

  }
  getBlogImageSrc(imageUUID: any) {
    return `/api/blogs/image/${imageUUID}`
  }
  putToR2(uploadUrl: string, file: File, contentType: string) {
    const headers = new HttpHeaders({ 'Content-Type': contentType });
    return this.http.put(uploadUrl, file, {
      headers,
      reportProgress: true,
      observe: 'events'
    })
  }
  getUploadBlogImagePresignedURL(file: File, uid: string): Observable<any> {
    return this.http.post<any>(
      `/api/blogs/get-upload-url/${uid}`, {
        filename: uid,
        contentType: file.type || 'application/octet-stream'
      }
    )
  }
  setNewBlogForm() {
    this.newBlogForm = JSON.parse(JSON.stringify(NEW_BLOG_FORM));
  }
  fillNewBlogForm(json: any) {
    for (let key of Object.keys(json)) {
      if (typeof(json[key]) === 'object') {
        for (let value of json[key]) {
          this.addNewBlogParagraphs(value);
        }
      } else {
        this.newBlogForm.find((element: any) => element.gqlKey === key).value = json[key];
      }
    }
  }
  async getFileFromUrl(url: string, filename: string) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        return;
      }
      const blob = await response.blob();
      return new File([blob], filename, { type: blob.type, lastModified: new Date().getTime() });
    } catch (error) {
      return null;
    }
  }
  async blogGqlToJson(blog: any) {
    let blogJson: any = {};
    blogJson.title = blog.title;
    blogJson.subtitle = blog.subtitle;
    blogJson.author = blog.author;
    blogJson.paragraphs = [];
    for (let i=0; i<blog.paragraphs.length; i++) {
      let paragraph = blog.paragraphs[i];
      if (paragraph.image !== null) {
        let file = await this.getFileFromUrl(environment.client + this.getBlogImageSrc(paragraph.image), 's');
        if (file) {
          this.fileService.saveFile(`blog_image_${i}`, file);
        }
      }
      blogJson.paragraphs.push({
        title: paragraph.title,
        text: paragraph.text,
        image: paragraph.image
      });
    }
    return blogJson;
  }
  getNewBlogForm() {
    return this.newBlogForm;
  }
  addNewBlogParagraphs(savedParagraph?: any) {
    let newBlogParagraphForm = JSON.parse(JSON.stringify(NEW_BLOG_PARAGRAPH_FORM));
    if (savedParagraph !== undefined) {
      for (let key of Object.keys(savedParagraph)) {
        newBlogParagraphForm.find((element: any) => element.gqlKey === key).value = savedParagraph[key];
      }
    }
    this.newBlogParagraphsForm.push(newBlogParagraphForm);
  }
  removeParagraph(index: number) {
    this.newBlogParagraphsForm.splice(index, 1);
  }
  getNewBlogParagraphsForm() {
    return this.newBlogParagraphsForm;
  }
  resetNewBlogForm() {
    this.newBlogForm = [];
    this.newBlogParagraphsForm = [];
  }
  getBlogsObservable() {
    return this.blogs$;
  }
  setCurrentBlog(blog: any) {
    this.currentBlogTitle = blog.title;
    this.currentBlogSubtitle = blog.subtitle;
    this.currentBlogAuthor = blog.author;
    this.currentBlogParagraphs = Array.isArray(blog?.paragraphs) ? blog.paragraphs : [];
    this.currentBlogUploadedAt = blog.uploaded_at;
  }
  resetCurrentBlog() {
    this.currentBlogTitle = '';
    this.currentBlogSubtitle = '';
    this.currentBlogParagraphs = [];
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
    if (!this.sortingBlogs) {
      this.blogSorted = false;
    }
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
  toggleReviewingBlog(toggle?: boolean) {
    this.previewing = toggle !== undefined ? toggle : !this.previewing;
  }
  async setPreviewingData() {
    this.previewingData.title = this.getNewBlogForm()[0].value;
    this.previewingData.subtitle = this.getNewBlogForm()[1].value;
    this.previewingData.author = this.getNewBlogForm()[2].value;
    this.previewingData.paragraphs = [];
    for (let i=0; i<this.getNewBlogParagraphsForm().length; i++) {
      let formElement = this.getNewBlogParagraphsForm()[i];
      let file = await this.fileService.getFile(`blog_image_${i}`);
      this.previewingData.paragraphs.push({
        title: formElement[0].value,
        text: formElement[1].value,
        image: file ? URL.createObjectURL(file) : null
      })
    }
  }
  getPreviewingData() {
    return this.previewingData;
  }
  async saveToSession() {
    await this.setPreviewingData();
    sessionStorage.setItem('blogData', JSON.stringify(this.getPreviewingData()))
  }
}
