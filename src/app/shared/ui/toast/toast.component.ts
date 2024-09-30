import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit, OnDestroy {
  @Input() status: 'danger' | 'primary' | 'warning' = 'primary';
  @Input() message: string | null = null;
  @Output() handleDismiss = new EventEmitter();

  private timeout: any = null;

  ngOnInit(): void {
    this.timeout = setTimeout(() => this.dismiss(), 2000);
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeout);
  }

  dismiss() {
    this.message = null;
    this.handleDismiss.emit();
  }
}
