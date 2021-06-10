import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeAvatarComponent } from './change-avatar/change-avatar.component';
import { LyDialog } from '@alyle/ui/dialog';
import { LyIconModule, LyIconService } from '@alyle/ui/icon';
import {MatDialogModule} from "@angular/material/dialog";
import { HeaderWallComponent } from './header-wall/header-wall.component';
import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";
import { HomeprofileComponent } from './profile/homeprofile/homeprofile.component';
import { SidebarComponent } from './sidebar/sidebar.component';

/** Import animations */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Gestures
import {
  HAMMER_GESTURE_CONFIG,
  HammerModule
} from '@angular/platform-browser';

/** Import Alyle UI */
import {
  LyTheme2,
  StyleRenderer,
  LY_THEME,
  LY_THEME_NAME,
  LyHammerGestureConfig,
  LyOverlay
} from '@alyle/ui';

/** Import the component modules */
import { LyButtonModule } from '@alyle/ui/button';
import { LyToolbarModule } from '@alyle/ui/toolbar';
import { LyImageCropperModule } from '@alyle/ui/image-cropper';

/** Import themes */
import { MinimaLight, MinimaDark } from '@alyle/ui/themes/minima';
import { LySliderModule } from '@alyle/ui/slider';
import { HttpClientModule } from '@angular/common/http';
import { CropperDialogComponent } from './cropper-dialog/cropper-dialog.component';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';
import { ImgComponent } from './img/img.component';


@NgModule({
  declarations: [ChangeAvatarComponent, CropperDialogComponent, HeaderWallComponent, HomeprofileComponent, SidebarComponent, ImgComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // Add components
    LyIconModule,
    LySliderModule,
    HttpClientModule,
    // Gestures
    HammerModule,
    // Add components
    LyButtonModule,
    LyToolbarModule,
    LyImageCropperModule,
    // ...
    // Gestures
    HammerModule,
    FormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,

     CommonModule,
    AppRoutingModule,


  ], providers: [
    [ LyTheme2 ],
    [ StyleRenderer, LyDialog, LyOverlay, LyIconService],
    // Theme that will be applied to this module
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true }, // name: `minima-light`
    { provide: LY_THEME, useClass: MinimaDark, multi: true }, // name: `minima-dark`
    // Gestures
    { provide: HAMMER_GESTURE_CONFIG, useClass: LyHammerGestureConfig },
    
  ]
})
export class WallModule { }
