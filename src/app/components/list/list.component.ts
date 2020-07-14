import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
/**
  * interface o clase del array de respuesta del observable principal.
  */
interface ImagesData {
  hits: any[];
  total: number;
  totalHits: number;
}
/**
  * interface o clase de los hits o imágenes detalle.
  */
interface hitsImages {
  comments?: number
  downloads?: number
  favorites?: number
  id: number
  imageHeight?: number
  imageSize?: number
  imageWidth?: number
  largeImageURL: string
  likes: number
  pageURL: string
  previewHeight: number
  previewURL: number
  previewWidth: number
  tags: string
  type: string
  user: string
  userImageURL: string
  user_id: number
  views: number
  webformatHeight: number
  webformatURL: string
  webformatWidth: number
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  /**
  * variable que interpola los valores de la búsqueda de imágenes.
  */
  searchItem: string
  /**
  * variable que muestra los valores del observable del servicio de imágenes.
  */
  listImages: any;
  /**
  * Array del dropdown de categorias.
  */
  categoryImage: any[] = [
    { name: 'science' },
    { name: 'education' },
    { name: 'people' },
    { name: 'feelings' },
    { name: 'computer' },
    { name: 'buildings' },
  ]
  /**
  * variable que guarda los valores preseleccionados del dropdown de categoria.
  */
  categoryItem: string;
  /**
  * variable que guarda todos los valores seleccionados en el dropdown de categoria.
  */
  selectedValue: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    /**
    * función que llama la lista completa de imágenes.
    */
    this.dataService.getList()
    this.listImages = this.dataService.listImage;

  }
  /**
    * Método que se dispara cuando buscas en el input, con el criterio q="$string", y category.
   */
  searchImages(item, categoryItem) {
    console.log(item, categoryItem)
    this.dataService.searchImages(item, categoryItem);
    this.listImages = this.dataService.listImage
  }

  /**
   * Método que se dispara cuando abres o cierras el Dropdown de categoria y busca por ese mismo criterio.
  */
  methodToggle(categoryItem) {
    console.log("oli", categoryItem)
    this.dataService.toggleCategory(categoryItem)
    this.listImages = this.dataService.listImage
    this.searchItem = ''
  }

}
