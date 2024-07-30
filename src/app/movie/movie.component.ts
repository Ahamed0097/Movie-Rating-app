import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss'],
})
export class MovieComponent implements OnInit {
  @ViewChild('dialogTemplate') dialogTemplate!: TemplateRef<any>;

  moviee = {
    name: 'Movie Name',
    rating: 4.5,
    cover: '../../assets/filim4.jpeg',
    reviews: []
  };


  type = '';
  id = '';
  url = '';
  movies: any;
  movie: any;
  form: any;
  ratingForm: any;

  constructor(private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.params['type'];
    this.id = this.route.snapshot.params['id'];
    if (this.type === 'trending') {
      this.url = 'http://localhost:4200/assets/data/trending-movies.json';
    }
    if (this.type === 'theatre') {
      this.url = 'http://localhost:4200/assets/data/theatre-movies.json';
    }
    if (this.type === 'popular') {
      this.url = 'http://localhost:4200/assets/data/popular-movies.json';
    }
    this.getMovie();
  }

  onSubmit(form: NgForm) {
    // Handle form submission logic
    const newReview = {
      author: form.value.uname,
      rating: form.value.rating,
      text: form.value.review,
      published_on: new Date()
    };

    // Add the new review to the movie reviews array
    this.movie.reviews.push(newReview);

    // Reset the form
    form.resetForm();

    // Show a popup message
    this.dialog.open(this.dialogTemplate);
    // If you don't want to use Angular Material dialog, use the following line instead:
    // alert('Review submitted successfully');
  }

  getMovie() {
    this.http.get(this.url).subscribe((movies) => {
      this.movies = movies;
      let index = this.movies.findIndex(
        (movie: { id: string }) => movie.id == this.id
      );
      if (index > -1) {
        this.movie = this.movies[index];
      }
    });
  }
}