import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule,FormsModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidePanelVisible: boolean = false;

  productObj: any = {
    "id": 0,
    "title": " ",
    "description": "",
    "category": "",
    "price": 0,
    "rating": 0,
    "brand": "",
    "sku": "",
    "weight": 0,
    "warrantyInformation": "",
    "returnPolicy": "",
    "thumbnail": "",
  }


  openSidePanel() {
    this.isSidePanelVisible = true
  }

  closeSidePanel() {
    this.isSidePanelVisible = false
  }

  onSubmit(){}
}
