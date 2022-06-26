import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'client-gallery',
  templateUrl: './gallery.component.html',
})
export class GalleryComponent implements OnInit {
  @Input() images: string[] = [];
  ngOnInit(): void {
    console.log(this.images)
  }
}
