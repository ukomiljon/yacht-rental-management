import { Injectable, Logger, LoggerService } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RpcExceptionService } from '../exception-handling';
import { validate, ValidationError } from 'class-validator';
import { isNull, isUndefined } from '../validation.utils';
 
@Injectable()
export class CommonService {
  private readonly loggerService: LoggerService;

  constructor(private readonly rpcException: RpcExceptionService) {
    this.loggerService = new Logger(CommonService.name);
  }

  acknowledgeMessage(context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);
  }

  /**
   * Validate Entity
   *
   * Validates an entities with the class-validator library
   */
  public async validateEntity(entity: Record<string, any>): Promise<void> {
    const errors: ValidationError[] = await validate(entity);
    const messages: string[] = [];

    for (const error of errors) {
      if (error.constraints) {
        messages.push(...Object.values(error.constraints));
      }
    }

    if (messages.length > 0) {
      this.rpcException.throwBadRequest(messages.join(',\n'));
    }
  }

  /**
   * Check Entity Existence
   *
   * Checks if a findOne query didn't return null or undefined
   */
  public checkEntityExistence<T>(
    entity: T | null | undefined,
    name: string,
  ): void {
    if (isNull(entity) || isUndefined(entity)) {
      this.rpcException.throwNotFound(`${name} not found`);
    }
  }

  /**
   * Save Entity
   *
   * Validates entities before saving into the DB
   */
  public async saveEntity<T>(entity: T): Promise<void> {
    try {
      await this.validateEntity(entity);
    } catch (error) {
      this.loggerService.error(error);
      this.rpcException.throwBadRequest(error.message);
    }
  }
 

  /**
   * Format Name
   *
   * Takes a string trims it and capitalizes every word
   */
  public formatName(title: string): string {
    return title
      .trim()
      .replace(/\n/g, ' ')
      .replace(/\s\s+/g, ' ')
      .replace(/\w\S*/g, (w) => w.replace(/^\w/, (l) => l.toUpperCase()));
  }

 
  /**
   * Method used to send the request to the corresponding microservice. It accepts following parameters:
   *
   * - @param {ClientProxy} client - microservice client to send the message to
   * - @param {IMessagePattern} pattern - object containing the pattern for a message (i.e. `{cmd: 'create' }`)
   * - @param {*} data - data to send to the microservice client
   *
   * @return {*} Promise<any> - returned response from a microservice or an adequate HTTP exception
   */
 
}
