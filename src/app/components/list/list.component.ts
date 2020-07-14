import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

interface ImagesData {
  hits: any[];
  total: number;
  totalHits: number;
}
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
  // listImages: hitsImages[] = [];
  searchItem: string
  listImages: any;
  categoryImage: any[] = [
    {name: 'science'},
    {name: 'education'},
    {name: 'people'},
    {name: 'feelings'},
    {name: 'computer'},
    {name: 'buildings'},
  ]
  categoryItem: string;
  selectedValue: string;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getList()
    this.listImages = this.dataService.listImage;
    
  }

  searchImages(item, categoryItem){
    console.log(item, categoryItem)
    this.dataService.searchImages(item, categoryItem);
    this.listImages = this.dataService.listImage
  }

}
