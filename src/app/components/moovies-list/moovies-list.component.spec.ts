import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MooviesListComponent } from './moovies-list.component';

describe('MooviesListComponent', () => {
  let component: MooviesListComponent;
  let fixture: ComponentFixture<MooviesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MooviesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MooviesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
