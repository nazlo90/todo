import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallpaperlistingComponent } from './wallpaperlisting.component';

describe('WallpaperlistingComponent', () => {
  let component: WallpaperlistingComponent;
  let fixture: ComponentFixture<WallpaperlistingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallpaperlistingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallpaperlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
