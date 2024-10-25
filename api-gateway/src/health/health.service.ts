import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import {
  HealthCheckService,
  HttpHealthIndicator,
  MemoryHealthIndicator,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly httpHealthIndicator: HttpHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly microserviceHealthIndicator: MicroserviceHealthIndicator   
  ) {}

  checkHealth(): string {
    return 'API Gateway is working correctly';
  }

  checkPing() {
    return this.healthCheckService.check([
      () =>
        this.httpHealthIndicator.pingCheck(
          'thrillers-api',
          process.env.API_URL,
        ),
    ]);
  }

  checkMemory() {
    return this.healthCheckService.check([
      () =>
        this.memoryHealthIndicator.checkHeap('memory_heap', 150 * 1024 * 1024),
      () =>
        this.memoryHealthIndicator.checkRSS('memory_rss', 150 * 1024 * 1024),
    ]);
  }

  checkMicroservice(microserviceName: string) {
    return this.healthCheckService.check([
      () =>
        this.microserviceHealthIndicator.pingCheck(
          `rabbitmq-${microserviceName}`,
          {
            transport: Transport.RMQ,
            options: {
              urls: [process.env.RABBITMQ_URL],
              queue: `${microserviceName}_queue`,
              queueOptions: {
                durable: false,
              },
            },
          },
        ),
    ]);
  }
}
