import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistSearchDialogComponent } from './artist-search-dialog.component';

describe('ArtistSearchDialogComponent', () => {
  let component: ArtistSearchDialogComponent;
  let fixture: ComponentFixture<ArtistSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistSearchDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtistSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
