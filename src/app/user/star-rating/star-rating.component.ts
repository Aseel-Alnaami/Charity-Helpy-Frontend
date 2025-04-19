import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.component.html',
  styleUrls: ['./star-rating.component.css']
})
export class StarRatingComponent {
  @Output() ratingChanged = new EventEmitter<number>();

  rating: number = 0;
  stars: boolean[] = [false, false, false, false, false]; 

  onStarClick(index: number): void {
    this.rating = index + 1;
    this.updateStars(this.rating);
    this.ratingChanged.emit(this.rating);
  }

  updateStars(rating: number): void {
    for (let i = 0; i < 5; i++) {
      this.stars[i] = i < rating;
    }
  }
}
