import { TestBed } from '@angular/core/testing';

import { AssistantService } from './assistant.service';

describe('Assistant', () => {
  let service: AssistantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
