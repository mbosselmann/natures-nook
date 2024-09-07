import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, Producer } from 'kafkajs';

@Injectable()
export class KafkaService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private producer: Producer;
  private consumer: Consumer;

  constructor() {
    this.kafka = new Kafka({
      clientId: 'catalog',
      brokers: ['kafka:9092'],
    });
  }

  async onModuleInit() {
    this.producer = this.kafka.producer();
    await this.producer.connect();
    this.consumer = this.kafka.consumer({ groupId: 'catalog' });
    await this.consumer.connect();
  }

  async onModuleDestroy() {
    await this.producer.disconnect();
    await this.consumer.disconnect();
  }

  send(topic: string, key: string, message: string) {
    this.producer.send({
      topic,
      messages: [{ key, value: message }],
    });
  }

  consume(topic: string, callback: (message: string) => void) {
    this.consumer.subscribe({ topic, fromBeginning: true });
    this.consumer.run({
      eachMessage: async ({ message }) => {
        callback(message.value.toString());
      },
    });
  }
}
