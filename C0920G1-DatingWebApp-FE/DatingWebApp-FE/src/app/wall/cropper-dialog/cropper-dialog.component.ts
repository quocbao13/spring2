import { lyl, StyleRenderer, ThemeRef, ThemeVariables, WithStyles } from '@alyle/ui';
import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { STYLES as SLIDER_STYLES } from '@alyle/ui/slider';
import {
  STYLES as CROPPER_STYLES,
  LyImageCropper,
  ImgCropperConfig,
  ImgCropperEvent,
  ImgCropperErrorEvent
} from '@alyle/ui/image-cropper';
import { LyDialogRef, LY_DIALOG_DATA } from '@alyle/ui/dialog';

const STYLES = (_theme: ThemeVariables, ref: ThemeRef) => {
  ref.renderStyleSheet(SLIDER_STYLES);
  ref.renderStyleSheet(CROPPER_STYLES);
  const slider = ref.selectorsOf(SLIDER_STYLES);
  const cropper = ref.selectorsOf(CROPPER_STYLES);

  return {
    root: lyl `{
      ${cropper.root} {
        max-width: 320px
        height: 320px
      }
    }`,
    sliderContainer: lyl `{
      position: relative
      ${slider.root} {
        width: 80%
        position: absolute
        left: 0
        right: 0
        margin: auto
        top: -32px
      }
    }`,
    slider: lyl `{
      padding: 1em
    }`
  };
};

@Component({
  selector: 'app-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    StyleRenderer
  ]
})
export class CropperDialogComponent implements WithStyles, AfterViewInit {

    
  constructor(
    @Inject(LY_DIALOG_DATA) private event: Event,
    readonly sRenderer: StyleRenderer,
    public dialogRef: LyDialogRef
  ) { }

  ngOnInit(): void {
  }

  readonly classes = this.sRenderer.renderSheet(STYLES, 'root');
  ready: boolean;
  scale: number;
  minScale: number;
  @ViewChild(LyImageCropper, { static: true }) cropper: LyImageCropper;
  myConfig: ImgCropperConfig = {
    width: 150,
    height: 150,
    // type: 'image/png',
    keepAspectRatio: true,
    responsiveArea: true,
    output: {
      width: 200,
      height: 200
    },
    resizableArea: true
  };

  ngAfterViewInit() {
    // Load image when dialog animation has finished
    this.dialogRef.afterOpened.subscribe(() => {
      this.cropper.selectInputEvent(this.event);
    });
  }

  onCropped(e: ImgCropperEvent) {
    console.log('cropped img: ', e);
  }
  onLoaded(e: ImgCropperEvent) {
    console.log('img loaded', e);
  }
  onError(e: ImgCropperErrorEvent) {
    console.warn(`'${e.name}' is not a valid image`, e);
    // Close the dialog if it fails
    this.dialogRef.close();
  }

}
