import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  /**
    * snapshot route parámetro enviado desde la lista de hits hacia el detalle.
  */
  idImage: string
  /**
    * variable que guarda la lista del detalle de la imágen o hit.
  */
  itemImage: any


  constructor(private route: ActivatedRoute, private dataService: DataService) {
    /**
    * variable que guarda el id de la imágen.
    */
    this.idImage = this.route.snapshot.paramMap.get('id')
  }


  ngOnInit(): void {
    /**
    * llamado a el servicio de detalle de el hit o imágen, con su parámetro 
    * @param {string} idImage.
    */
    this.dataService.getDetailImage(this.idImage)
    this.itemImage = this.dataService.singleHit;
  }

}
