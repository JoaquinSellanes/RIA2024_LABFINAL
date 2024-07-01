import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  @Input() message: string = 'error toast';
  @Input() toastClass: string = 'alert alert-info';
  visible: boolean = false;

  ngOnInit(): void { }

  showToast(message: string, toastClass: string = 'alert alert-info', duration: number = 3000) {
    this.message = message;
    this.toastClass = toastClass;
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
    }, duration);
  }
}
