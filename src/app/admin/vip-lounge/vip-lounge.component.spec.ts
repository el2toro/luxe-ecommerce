/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VipLoungeComponent } from './vip-lounge.component';

describe('VipLoungeComponent', () => {
  let component: VipLoungeComponent;
  let fixture: ComponentFixture<VipLoungeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VipLoungeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VipLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
