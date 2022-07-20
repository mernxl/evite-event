// Original file: proto/event-imager.proto

import type { EventEviteTicketMeta as _event_imager_EventEviteTicketMeta, EventEviteTicketMeta__Output as _event_imager_EventEviteTicketMeta__Output } from '../event_imager/EventEviteTicketMeta';

export interface EventEviteTicketInput {
  'eventId'?: (string);
  'eviteId'?: (string);
  'ticketMeta'?: (_event_imager_EventEviteTicketMeta | null);
}

export interface EventEviteTicketInput__Output {
  'eventId': (string);
  'eviteId': (string);
  'ticketMeta': (_event_imager_EventEviteTicketMeta__Output | null);
}
