import * as grpc from '@grpc/grpc-js';

import { ProtoGrpcType as CryptoProtoGrpcType } from '../proto/crypto';
import { ProtoGrpcType as EventImageProtoGrpcType } from '../proto/event-imager';
import { loadGRPCClient } from '../utils';
import { config } from './config';

const cryptoProto = loadGRPCClient<CryptoProtoGrpcType>('crypto.proto');
const eventProto = loadGRPCClient<EventImageProtoGrpcType>('event-imager.proto');

export const cryptoService = new cryptoProto.crypto.Crypto(
  config.CRYPTO_GRPC_ADDRESS,
  grpc.credentials.createInsecure(),
);

export const eventImagerService = new eventProto.event_imager.EventImager(
  config.EVENT_IMAGER_GRPC_ADDRESS,
  grpc.credentials.createInsecure(),
);
