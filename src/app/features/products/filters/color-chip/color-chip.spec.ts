import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorChip } from './color-chip';

describe('ColorChip', () => {
  let component: ColorChip;
  let fixture: ComponentFixture<ColorChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorChip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
