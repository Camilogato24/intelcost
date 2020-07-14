import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  idImage: string
  itemImage: any

 
  constructor(private route: ActivatedRoute, private dataService: DataService) {
    this.idImage = this.route.snapshot.paramMap.get('id')
  }


  ngOnInit(): void {
    this.dataService.getDetailImage(this.idImage)
    this.itemImage = this.dataService.singleHit;
  }

}
