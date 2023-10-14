// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-image-slider',
//   templateUrl: './image-slider.component.html',
//   styleUrls: ['./image-slider.component.css']
// })
// export class ImageSliderComponent implements OnInit {
//   images: string[] = [
//     'https://content3.jdmagicbox.com/comp/kozhikode/g4/0495px495.x495.131128104344.z4g4/catalogue/greenline-architects-and-builders-calicut-ho-kozhikode-architects-3cc25w8vvl.jpg',
//     'https://wallpaperaccess.com/full/1126755.jpg',
//     'https://www.greenlinearchitects.in/greenline_admin39096/uploads/sub_gallery/54ABBACE-DADB-4480-B696-EFE629E54BCD.jpg',
//     'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhV9hRGcyW6c5n-e5pgovB5NbyX6A3kJOwYRuo3SBl9AmKuJnS7paRijqPHZEveSs5LMulGIViUnK6-mvz3QEhKfHmDtWKDqD0Vd6iqKlb6xqXd5za91odORyPB3WfTOsdVFsLvieM0v46D3_WYmS3aQsGn8FPLY7uRs1d9ZE680QGK7DQi_3oVdvdL/s1600/calicut-tropical-home-05.jpg',
//     'https://wallup.net/wp-content/uploads/2018/09/30/761246-mansion-house-building-architecture-interior-design-swimming-pool.jpg',
//   ];

//   currentSlideIndex = 0;

//   ngOnInit() {
//     this.showSlide(this.currentSlideIndex);
//   }

//   showSlide(index: number) {
//     const container = document.querySelector('.slider-container') as HTMLElement;
//     if (container) {
//       container.style.transform = `translateX(-${index * 100}%)`;
//     }
//   }

//   nextSlide() {
//     this.currentSlideIndex = (this.currentSlideIndex + 1) % this.images.length;
//     this.showSlide(this.currentSlideIndex);
//   }

//   prevSlide() {
//     this.currentSlideIndex = (this.currentSlideIndex - 1 + this.images.length) % this.images.length;
//     this.showSlide(this.currentSlideIndex);
//   }
// }


import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  interval,
  Observable,
  startWith,
  Subject,
  switchMap,
  timer,
} from 'rxjs';
import { SlideInterface } from './imageSlider.module';

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent implements OnInit, OnDestroy {
  @Input() slides: SlideInterface[] = [];

  currentIndex: number = 0;
  timeoutId?: number;

  ngOnInit(): void {
    this.resetTimer();
  }
  ngOnDestroy() {
    window.clearTimeout(this.timeoutId);
  }
  resetTimer() {
    if (this.timeoutId) {
      window.clearTimeout(this.timeoutId);
    }
    this.timeoutId = window.setTimeout(() => this.goToNext(), 3000);
  }

  goToPrevious(): void {
    const isFirstSlide = this.currentIndex === 0;
    const newIndex = isFirstSlide
      ? this.slides.length - 1
      : this.currentIndex - 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToNext(): void {
    const isLastSlide = this.currentIndex === this.slides.length - 1;
    const newIndex = isLastSlide ? 0 : this.currentIndex + 1;

    this.resetTimer();
    this.currentIndex = newIndex;
  }

  goToSlide(slideIndex: number): void {
    this.resetTimer();
    this.currentIndex = slideIndex;
  }

  getCurrentSlideUrl() {
    return `url('${this.slides[this.currentIndex].url}')`;
  }
}