import { Routes } from '@angular/router';
import {Blogs} from './pages/blogs/blogs';
import {BlogDetail} from './pages/blog-detail/blog-detail';
import {HomePage} from './pages/home-page/home-page';
import {LoginPage} from './pages/login-page/login-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'blogs',
    component: Blogs
  },
  {
    path: 'blog/:id',
    component: BlogDetail
  },
  {
    path: 'login',
    component: LoginPage
  }
];
