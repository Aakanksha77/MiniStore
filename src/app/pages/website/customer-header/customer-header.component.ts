import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-header',
  imports: [],
  templateUrl: './customer-header.component.html',
  styleUrl: './customer-header.component.css'
})
export class CustomerHeaderComponent implements OnInit {
  router = inject(Router);
  currentIndex: number = 0;
  autoSlideInterval: any

  ngOnInit() {
    this.startAutoSlide()
  }

  images: string[] = [
    'https://media6.ppl-media.com/tr:dpr-2,dpr-2/mediafiles/ecomm/misc/1733820667_3_web.jpg',
    'https://www.maybelline.com/-/media/project/loreal/brand-sites/mny/americas/us/lips-makeup/lip-stick/modules/title-banner/update/1h25_clp_banners_lipstickmakeup_v2.jpg?rev=204a5a1b1f4646bb9475c7b16f2a42d1&cx=0.64&cy=0.84&cw=1320&ch=250&hash=947F0EA2D2A6991CB05160C0C312930E',
    'https://images-static.nykaa.com/uploads/5dc54ba5-f217-4879-ac79-001d29499014.jpg?tr=cm-pad_resize,w-1200',
    'https://media6.ppl-media.com/tr:dpr-2,dpr-2/mediafiles/ecomm/misc/1733820669_2_web.jpg',
    'https://publish-p33712-e119997.adobeaemcloud.com/content/dam/adityabirlafashionandretailprogram/homepage/fy-2024-2025/nov-24/18nov/plp/a20231118_Chillmodeactivated_Top%20Plp.jpg.transform/i1366x532/image.jpeg'
  ];


  prevImage() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1; // Loop to the last image
    } else {
      this.currentIndex--;
    }
  }

  nextImage() {
    if (this.currentIndex === this.images.length - 1) {
      this.currentIndex = 0; // Loop to the first image
    } else {
      this.currentIndex++;
    }
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => {
      this.nextImage();
    }, 3000); // Change image every 3 seconds
  }

  onCatergoryList(categoryName: string) {
    console.log(categoryName);
    this.router.navigateByUrl(`catergories/${categoryName}`);
  }

  
}
