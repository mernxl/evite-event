import { Types } from 'mongoose';

export const getTicketObjectKey = (eventId: Types.ObjectId) => `tickets/${eventId.toHexString()}`;
export const getEviteObjectKey = (eviteId: Types.ObjectId) => `evites/${eviteId.toHexString()}.png`;
