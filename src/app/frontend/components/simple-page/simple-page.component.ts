import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-simple-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './simple-page.component.html',
  styleUrl: './simple-page.component.css'
})
export class SimplePageComponent implements OnInit {
  title = '';
  content = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.title = data['title'] || '';
      this.content = data['content'] || '';
    });
  }
}
