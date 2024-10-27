import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';

import { CreatePaymentCommand } from '../impl';
import { PaymentEntity } from '../../../db/entities/payment.entity';
import { StripeChargeService } from '../../stripeCharge/stripe-charge.service';

import Web3 from 'web3';

const defaultCurrency = 'usd';

@CommandHandler(CreatePaymentCommand)
export class CreatePaymentHandler
  implements ICommandHandler<CreatePaymentCommand> {
  constructor(
    @InjectRepository(PaymentEntity)
    private readonly paymentRepository: Repository<PaymentEntity>,
    private readonly stripeChargeService: StripeChargeService,
    private readonly web3: Web3
  ) {
    this.web3 = new Web3(process.env.WEB3_PROVIDER_URL);
  }

  async execute(command: CreatePaymentCommand) {
    const { newPayment } = command.createPaymentDto;
    const { booking_id, customer_id } = newPayment;

    const payment = this.paymentRepository.create();

    payment.booking_id = booking_id;
    payment.customer_id = customer_id;
    payment.created_at = new Date();
    payment.amount = newPayment.amount;
    payment.currency = defaultCurrency;

    if (payment.currency === 'eth' || payment.currency === 'btc') {
      try {
        // Use your Web3 wallet or contract to send the payment
        const weiAmount = this.web3.utils.toWei(payment.amount.toString(), 'ether');
        const transaction = await this.web3.eth.sendTransaction({
          from: process.env.WEB3_WALLET_ADDRESS,
          to: payment.customer_id,
          value: weiAmount,
        });

        payment.transaction_id = transaction.transactionHash.toString();

      } catch (error) {
        payment.transaction_status = 'failed';
      }
    }
    else {
      const { id: stripeId, status: stripeStatus } =
        await this.stripeChargeService.createCharge({
          amount: payment.amount * 100, // Convert to cents
          currency: defaultCurrency,
          card_token: newPayment.card_token,
          metadata: { booking_id },
        });

      payment.transaction_id = stripeId;
      payment.transaction_status = stripeStatus;
    }
    try {
      await payment.save();
      return payment;
    } catch (error) {
      throw new RpcException({
        statusCode: 500,
        error: error,
      });
    }
  }

  // bytesToHex(hashByteType: hashByteType): string {
  //   const buffer = Buffer.from(hashByteType);
  //   const transactionHash = buffer.toString('hex');
  // }
}
