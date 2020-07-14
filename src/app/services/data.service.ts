import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
interface ImagesData {
  hits: any[];
  total: number;
  totalHits: number;
}
@Injectable({
  providedIn: 'root'
})

export class DataService {
  private _hits = new BehaviorSubject<any[]>([]);
  private _singleHit = new BehaviorSubject<any[]>([]);
  private baseUrl = 'https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&lang=es&image_type=photo';
  private dataImages: { hitsImages: any[] } = { hitsImages: [] }
  private dataImage: { singleImage: any[] } = { singleImage: [] }
  readonly hits = this._hits.asObservable();
  readonly singleHit = this._singleHit.asObservable();
  completeItem: string;
  completeCategory: string;
  constructor(private http: HttpClient) {

  }
  /**
   * Observable Valor de la listade imágenes
  */
  get listImage() {
    return this._hits.asObservable();
  }
  /**
   * Observable Valor del detalle de la imagen
  */
  get detailImage() {
    return this._singleHit.asObservable();
  }
  /**
   * Este es el método que lista todos las imágenes inicialmente.
   * @param {string} dataImages observable que muestra la lista {@link idImage}
   * @returns Retorna un observable.
    */
  getList() {
    this.http.get(`${this.baseUrl}`).subscribe(
      (data: ImagesData) => {
        this.dataImages.hitsImages = data.hits
        this._hits.next(Object.assign({}, this.dataImages).hitsImages);

      },
      error => console.log('Could not load todos.')

    )
    return this.dataImages.hitsImages
    // return this.http.get('https://pixabay.com/api/?key=13119377-fc7e10c6305a7de49da6ecb25&lang=es&image_type=photo')
  }

  /**
   * Método que valida si los parámetros son null o indefinidos y permite construir el endpoint 
   */
  validationValue(item: string, category: string) {
    if (item == undefined || item == null) {
      this.completeItem = ''
    } else {
      this.completeItem = `&q=${item}`
    }
    if (category == undefined || category == null) {
      this.completeCategory = ''
    } else {
      this.completeCategory = `&category=${category}`
    }
  }
  /**
   * Método que permite buscar imágenes por su nombre y categoria
   */
  searchImages(item: string, category: string) {
    this.validationValue(item, category)
    this.http.get(`${this.baseUrl}${this.completeItem}${this.completeCategory}`)
      .subscribe(
        (data: ImagesData) => {
          this.dataImages.hitsImages = data.hits
          this._hits.next(Object.assign({}, this.dataImages).hitsImages);

        },
        error => console.log('No hay imágenes.')

      )
    return this.dataImages.hitsImages
  }
  /**
   * Método que permite obtener el detalle de una imagen, por medio de un ID.
   */
  getDetailImage(id: string) {
    this.http.get(`${this.baseUrl}&id=${id}`)
      .subscribe(
        (data: ImagesData) => {
          this.dataImage.singleImage = data.hits
          this._singleHit.next(Object.assign({}, this.dataImage).singleImage);

        },
        error => console.log('No hay imágenes.')

      )
    return this.dataImage.singleImage
  }
}
