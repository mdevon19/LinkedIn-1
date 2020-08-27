import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { YourPostsComponent } from './components/your-posts/your-posts.component';
import { AboutComponent } from './components/about/about.component';
import { WallComponent } from './components/wall/wall.component';
import { EachPostComponent } from './components/each-post/each-post.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { EachCategoryComponent } from './components/each-category/each-category.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    YourPostsComponent,
    AboutComponent,
    WallComponent,
    EachPostComponent,
    CategoriesComponent,
    EachCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
