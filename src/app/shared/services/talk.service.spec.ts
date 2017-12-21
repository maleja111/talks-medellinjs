import { TestBed,getTestBed, inject,async } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import {
  ResponseOptions,
  BaseRequestOptions,
  Response,
  HttpModule,
  Http,
  XHRBackend,
  RequestMethod
} from '@angular/http';

import { TalkService } from './talk.service';

describe('TalkTableService', () => {
  let mockBackend: MockBackend;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			providers: [
        TalkService,
        BaseRequestOptions,
        MockBackend,
				{
					provide: Http,
          deps: [MockBackend, BaseRequestOptions],
					useFactory:
					(backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
						return new Http(backend, defaultOptions);
					}
				}
			],
			imports: [
				HttpModule
			]
    });
    mockBackend = getTestBed().get(MockBackend);
	}));

  it('if i do a GET http://localhost:8081/talks it should fetch speakers list',
  async(inject([TalkService], (service: TalkService) => {
    mockBackend.connections.subscribe(
      (connection: MockConnection) => {
        expect(connection.request.url).toContain(`http://localhost:8081/talks`);
        expect(connection.request.method).toEqual(RequestMethod.Get);
        connection.mockRespond(new Response(
          new ResponseOptions({
            body: [{
              id: '0'
            }]
          })));
      });

      service.getTalks().subscribe(
      (data) => {
        expect(data.length).toBeDefined();
        expect(data.length).toEqual(1);
        expect(data[0].id).toEqual('0');
      });
  })));
});
