import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMoovieComponent } from './item-moovie.component';

describe('ItemMoovieComponent', () => {
  let component: ItemMoovieComponent;
  let fixture: ComponentFixture<ItemMoovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemMoovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ItemMoovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
