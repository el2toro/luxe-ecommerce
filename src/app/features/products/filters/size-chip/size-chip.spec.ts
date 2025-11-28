import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeChip } from './size-chip';

describe('SizeChip', () => {
  let component: SizeChip;
  let fixture: ComponentFixture<SizeChip>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SizeChip]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SizeChip);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
