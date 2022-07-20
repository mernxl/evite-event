import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { EventImagerClient as _event_imager_EventImagerClient, EventImagerDefinition as _event_imager_EventImagerDefinition } from './event_imager/EventImager';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  event_imager: {
    EventEviteTicketInfo: MessageTypeDefinition
    EventEviteTicketInput: MessageTypeDefinition
    EventEviteTicketMeta: MessageTypeDefinition
    EventImager: SubtypeConstructor<typeof grpc.Client, _event_imager_EventImagerClient> & { service: _event_imager_EventImagerDefinition }
  }
}

