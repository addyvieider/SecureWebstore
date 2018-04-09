import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CataloguePageComponent } from './catalogue-page.component';

describe('CataloguePageComponent', () => {
  let component: CataloguePageComponent;
  let fixture: ComponentFixture<CataloguePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CataloguePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CataloguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
