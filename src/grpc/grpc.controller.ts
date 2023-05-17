import { Metadata } from '@grpc/grpc-js';
import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, Subject } from 'rxjs';

@Controller()
export class GrpcController {
  @GrpcMethod('ExampleService')
  version(data: object, metadata: Metadata): Observable<any> {
    console.info(data, metadata);
    const subject = new Subject();
    let i = 0;
    const id = setInterval(() => {
      if (i > 3) {
        clearInterval(id);
        subject.complete();
      }
      subject.next({
        current: ++i,
      });
    }, 1000);
    return subject.asObservable();
  }
  // @GrpcMethod('ExampleService')
  // version(data: object, metadata: Metadata) {
  //   console.info(data, metadata.toJSON());
  //   return { current: 1 };
  // }
}
