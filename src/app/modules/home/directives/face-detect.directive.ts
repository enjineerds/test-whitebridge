import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { FaceDetectionModel } from '@home/data-access';
import { debounceTime, Subject, tap } from 'rxjs';

@Directive({
  selector: '[appFaceDetect]',
  standalone: true,
})
export class FaceDetectDirective implements AfterViewInit, OnInit, OnDestroy {
  @Input() set appFaceDetect(data: FaceDetectionModel | null) {
    this.removeRectangle();
    this.removeInfo();

    if (!data) return;

    this.data = data;
    this.drawRectangle();
    this.addInfo();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (!this.data) return;
    this.removeRectangle();
    this.removeInfo();
    this.debounce$.next(true);
  }

  readonly renderer = inject(Renderer2);
  readonly host: ElementRef = inject(ElementRef);
  readonly debounce$ = new Subject();

  private data: FaceDetectionModel | null = null;

  ngOnInit(): void {
    this.debounce$
      .pipe(
        debounceTime(300),
        tap(() => {
          this.drawRectangle();
          this.addInfo();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.debounce$.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.drawRectangle();
    this.addInfo();
  }

  private drawRectangle() {
    if (!this.data) return;

    const dimension = this.getNormalizeDimension(this.data);
    const position = this.getFaceDetectorPosition(this.data);

    console.debug(dimension, position);
    const rectangle = this.renderer.createElement('div');
    rectangle.className = 'rectangle';
    rectangle.style.position = 'absolute';
    rectangle.style.height = `${dimension?.height}px`;
    rectangle.style.width = `${dimension?.width}px`;
    rectangle.style.top = `${position?.y}px`;
    rectangle.style.left = `${position?.x}px`;
    rectangle.style.border = `1px solid red`;
    this.renderer.appendChild(this.host.nativeElement, rectangle);
  }

  private removeRectangle() {
    this.removeElement('.rectangle');
  }

  private addInfo() {
    if (!this.data) return;

    const position = this.getFaceDetectorPosition(this.data);
    const info = this.renderer.createElement('div');
    const offet = 30;
    info.className = 'info';
    info.style.position = 'absolute';
    info.style.background = 'red';
    info.style.color = 'white';
    info.style.top = `${(position?.y || offet) - offet}px`;
    info.style.left = `${position?.x}px`;
    info.style.padding = `4px 8px`;
    info.innerHTML = `<i class="bi bi-gender-${this.data?.gender}"></i><span class="ms-1">${this.data?.age}</span>`;
    this.renderer.appendChild(this.host.nativeElement, info);
  }

  private removeInfo() {
    this.removeElement('.info');
  }

  private getNormalizeDimension(data: FaceDetectionModel | null) {
    if (!data) return null;

    const { height, width } = this.host.nativeElement.getBoundingClientRect();
    const { rectangle, image } = data;
    console.debug('CONTAINER ' + 'HEIGHT: ' + height + ' WIDTH: ' + width);

    if (!rectangle) return null;

    return {
      height:
        Number(height) * ((rectangle.bottom - rectangle.top) / image.rawHeight),
      width:
        Number(width) * ((rectangle.right - rectangle.left) / image.rawWidth),
    };
  }

  private getFaceDetectorPosition(data: FaceDetectionModel | null) {
    if (!data) return null;

    const { height, width } = this.host.nativeElement.getBoundingClientRect();
    const { rectangle, image } = data;

    if (!rectangle) return null;

    return {
      x: Number(width) * (rectangle.left / image.rawWidth),
      y: Number(height) * (rectangle.top / image.rawHeight),
    };
  }

  private removeElement(className: string) {
    const element = this.host.nativeElement.querySelector(className);
    if (!element) return;

    this.renderer.removeChild(this.host.nativeElement, element);
  }
}
