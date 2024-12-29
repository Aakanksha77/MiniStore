import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterModule,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidePanelVisible : boolean = false;

  openSidePanel(){
    this.isSidePanelVisible =  true
  }

  closeSidePanel(){
    this.isSidePanelVisible = false
  }
}
