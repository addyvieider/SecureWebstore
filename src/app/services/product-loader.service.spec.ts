import { TestBed, inject } from '@angular/core/testing';

import { ProductLoaderService } from './product-loader.service';

describe('ProductLoaderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductLoaderService]
    });
  });

  it('should be created', inject([ProductLoaderService], (service: ProductLoaderService) => {
    expect(service).toBeTruthy();
  }));
});
