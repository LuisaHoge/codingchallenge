import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareartistsComponent } from './compareartists.component';

describe('CompareartistsComponent', () => {
  let component: CompareartistsComponent;
  let fixture: ComponentFixture<CompareartistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareartistsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompareartistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
