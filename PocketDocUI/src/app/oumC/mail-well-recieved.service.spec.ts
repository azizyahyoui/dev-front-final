import { TestBed } from '@angular/core/testing';

import { MailWellRecievedService } from './mail-well-recieved.service';

describe('MailWellRecievedService', () => {
  let service: MailWellRecievedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailWellRecievedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
