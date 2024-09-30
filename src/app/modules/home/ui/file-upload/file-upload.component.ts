import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { UploadImageModel } from '../../data-access/models/upload-image.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadComponent {
  @ViewChild('image', { read: ElementRef, static: false })
  image: ElementRef | null = null;

  @Input() disabled = false;
  @Output() handleChange = new EventEmitter<UploadImageModel>();
  @Output() handleError = new EventEmitter<string>();

  selectedFile: File | null = null;
  imagePreview: string | null = null;

  readonly renderer = inject(Renderer2);
  readonly ref = inject(ChangeDetectorRef);

  onFileChange(event: any): void {
    const file = event.target.files[0] as File | null;
    this.uploadFile(file);
  }

  onFileDrop(event: DragEvent): void {
    event.preventDefault();
    const file = event.dataTransfer?.files[0] as File | null;
    this.uploadFile(file);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
  }

  uploadFile(file: File | null): void {
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;
      const size = Math.round(file.size / 1024);

      if (size > 5000) {
        this.handleError.emit('File size exceeded. Max 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreview = event.target?.result as string;
        this.ref.markForCheck();

        setTimeout(() => {
          this.handleChange.emit({
            size,
            rawWidth: this.image?.nativeElement.naturalWidth,
            rawHeight: this.image?.nativeElement.naturalHeight,
            base64: this.imagePreview as string,
            name: file.name,
          });
        }, 300);
      };

      reader.onerror = (error) => console.debug('error ', error);
      reader.readAsDataURL(file);
    } else {
      console.info('Unsupported file type');
    }
  }
}
