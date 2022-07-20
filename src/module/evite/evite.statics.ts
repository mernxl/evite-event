import { Types } from 'mongoose';

import { cryptoService, eventImagerService } from '../../config/grpc';
import { DocMetaConfig, ErrorResponse, grpcCallWrapper } from '../../utils';
import { EventServices } from '../event.config';
import { CreateOneEviteInput, EviteTicketOutput, VerifyEviteInput } from '../event.types';
import { IEvite, IEviteModel } from './evite.types';

export type EviteStaticsType = typeof EviteStatics;

export const EviteStatics = {
  async createOne(
    this: IEviteModel,
    createOneEviteInput: CreateOneEviteInput,
    docMetaConfig: DocMetaConfig,
  ): Promise<IEvite> {
    const event = await EventServices.Event().getById(createOneEviteInput.eventId);

    // check if this person is authorized
    await event.checkAuthorized(docMetaConfig.userId);

    const eviteId = new Types.ObjectId();

    const oneSignatureOutputOutput = await grpcCallWrapper(
      cryptoService,
      'createOneSignature',
      cryptoService.createOneSignature,
      {
        eviteId: eviteId.toHexString(),
        signingKeyIdHash: event.signingKeyIdHash,
        keyword: createOneEviteInput.keyword,
      },
    );

    return this.create({
      _id: eviteId,
      eventId: new Types.ObjectId(createOneEviteInput.eventId),

      signatureIdHash: oneSignatureOutputOutput.idHash,
      hasKeyword: !!createOneEviteInput.keyword,

      createdById: docMetaConfig.userId,
    });
  },

  async getById(this: IEviteModel, eviteId: string | Types.ObjectId): Promise<IEvite> {
    const evite = await this.findById(eviteId).exec();

    if (!evite) {
      throw new ErrorResponse('Evite not found', undefined, {
        eviteId,
      });
    }

    return evite;
  },

  async verifyEvite(
    this: IEviteModel,
    verifyEviteInput: VerifyEviteInput,
    docMetaConfig: DocMetaConfig,
  ): Promise<boolean> {
    const evite = await this.getById(verifyEviteInput.eviteId);
    const event = await EventServices.Event().getById(evite.eventId);

    // check if this person is authorized
    await event.checkAuthorized(docMetaConfig.userId);

    if ((evite.hasKeyword || event.hasKeyword) && !verifyEviteInput.keyword) {
      throw new ErrorResponse('Must provide keyword to verify event.', undefined, {
        evite: evite.hasKeyword,
        event: event.hasKeyword,
      });
    }

    const signatureOutputOutput = await grpcCallWrapper(
      cryptoService,
      'verifySignature',
      cryptoService.verifySignature,
      {
        eviteId: evite._id.toHexString(),
        keyword: verifyEviteInput.keyword,
        signatureIdHash: evite.signatureIdHash,
        signingKeyIdHash: event.signingKeyIdHash,
      },
    );

    return signatureOutputOutput.isValid;
  },

  async getTicketUrl(this: IEviteModel, eviteId: string): Promise<EviteTicketOutput> {
    const evite = await this.getById(eviteId);
    const event = await EventServices.Event().getById(evite.eventId);

    if (!event.hasTicket || !event.ticket) {
      throw new ErrorResponse('No Event ticket to generate evite Ticket.');
    }

    const response = await grpcCallWrapper(
      eventImagerService,
      'getTicketUrl',
      eventImagerService.getTicketUrl,
      {
        eviteId,
        eventId: event._id.toHexString(),
        ticketMeta: {
          qrSize: event.ticket.qrSize,
          qrPositionX: event.ticket.qrPosition.x,
          qrPositionY: event.ticket.qrPosition.y,
        },
      },
    );

    if (!response) {
      throw new ErrorResponse(undefined, undefined, 'Error reaching event-imager service');
    }

    return { eviteId: evite._id.toHexString(), url: response.ticketUrl };
  },
};
