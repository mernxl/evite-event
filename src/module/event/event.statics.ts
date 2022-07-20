import { Types } from 'mongoose';
import { File } from 'tsoa';

import { config } from '../../config';
import { cryptoService } from '../../config/grpc';
import { minioClient } from '../../config/minio';
import { DocMetaConfig, ErrorResponse, grpcCallWrapper } from '../../utils';
import { CreateOneEventInput } from '../event.types';
import { getTicketObjectKey } from '../utils';
import { IEvent, IEventModel } from './event.types';

export type EventStaticsType = typeof EventStatics;

export const EventStatics = {
  async createOne(
    this: IEventModel,
    createOneEventInput: CreateOneEventInput,
    docMetaConfig: DocMetaConfig,
  ): Promise<IEvent> {
    const signingKeyOutputOutput = await grpcCallWrapper(
      cryptoService,
      'createOneSigningKey',
      cryptoService.createOneSigningKey,
      {
        keyword: createOneEventInput.keyword,
      },
    );

    return this.create({
      _id: new Types.ObjectId(),
      organizerId: docMetaConfig.userId,

      ...createOneEventInput,

      hasKeyword: !!createOneEventInput.keyword,
      authorityIds: createOneEventInput.authorityIds?.map((id) => new Types.ObjectId(id)) || [],

      signingKeyIdHash: signingKeyOutputOutput.idHash,
    });
  },

  async getById(this: IEventModel, eventId: string | Types.ObjectId): Promise<IEvent> {
    const event = await this.findById(eventId).exec();

    if (!event) {
      throw new ErrorResponse('Event not found', undefined, {
        eventId,
      });
    }

    return event;
  },

  async saveTicketImage(this: IEventModel, eventId: string | Types.ObjectId, image: File) {
    const event = await this.getById(eventId);

    await minioClient.putObject(
      config.EVENT.BUCKET_NAME,
      getTicketObjectKey(event._id),
      image.buffer,
      {
        'Content-Type': image.mimetype,
      },
    );

    event.hasTicket = true;

    await event.save();

    return event;
  },
};
