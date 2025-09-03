import { TestBed } from '@angular/core/testing';

import { GqlService } from './gql-service';

describe('GqlService', () => {
  let service: GqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
