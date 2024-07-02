import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-producto-modal',
  template: `
    <dialog #modal class="modal">
      <div class="modal-box" *ngIf="!loading && !error">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <figure class="flex items-center justify-center py-5">
          <img *ngIf="producto.imagen !== ''" class="rounded-lg" [src]="producto.imagen" alt="Imagen del producto" />
          <img *ngIf="producto.imagen == ''" class="rounded-lg" src="/assets/no-image.png" alt="Imagen del producto" />
        </figure>
        <div class="prose">
          <h1>{{producto?.nombre}}</h1>
          <p>{{producto?.descripcion}}</p>
          <h3 class="text-primary font-bold">Precio: &#36;{{producto.precio}} UYU</h3>
          <h3 class="font-bold">Ingredientes:</h3>
          <ul>
            <li *ngFor="let ingrediente of producto?.ingredientes">
              {{ingrediente.nombre}} - {{ingrediente.cantidad}}{{ingrediente.unidad}}
            </li>
          </ul>
          <h3 *ngIf="producto?.ingredientes.length == 0" class="text-center text-3xl m-0 p-0">Aire al parecer...</h3>
        </div>
      </div>
      <div class="modal-box" *ngIf="error">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>
        <div class="prose">
          <h1>Upss, parece que hubo un error!</h1>
          <p>No encontramos tu producto o hubo un problema en el camino, intenta nuevamente más tarde!</p>
        </div>
      </div>
    </dialog>
  `,
  styles: ``
})
export class ProductoModalComponent implements OnChanges {
  @Input() producto: any;
  @ViewChild('modal') modal!: ElementRef<HTMLDialogElement>;
  loading: boolean = true;
  error: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.loading = false;
      this.error = false;
      this.showModal();
    }
  }

  showModal() {
    this.modal.nativeElement.showModal();
  }

  closeModal() {
    this.modal.nativeElement.close();
  }
}
