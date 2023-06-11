import { Component, Input } from '@angular/core';
import { Hero } from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent {
  private _route: ActivatedRoute;
  private _heroService: HeroService;
  private _location: Location;

  constructor(
    route: ActivatedRoute,
    heroService: HeroService,
    location: Location
  ) {
    this._route = route;
    this._heroService = heroService;
    this._location = location;
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this._heroService.getHero(id).subscribe((hero) => (this.hero = hero));
  }

  save(): void {
    if (this.hero) {
      this._heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }

  goBack(): void {
    this._location.back();
  }

  // constructor(
  //   private route: ActivatedRoute,
  //   private heroService: HeroService,
  //   private location: Location
  // ) {}

  @Input() hero?: Hero;
}
