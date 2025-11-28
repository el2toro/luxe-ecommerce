/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ArTryonComponent } from './ar-tryon.component';

describe('ArTryonComponent', () => {
  let component: ArTryonComponent;
  let fixture: ComponentFixture<ArTryonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArTryonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArTryonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
