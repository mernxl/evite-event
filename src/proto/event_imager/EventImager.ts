// Original file: proto/event-imager.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { EventEviteTicketInfo as _event_imager_EventEviteTicketInfo, EventEviteTicketInfo__Output as _event_imager_EventEviteTicketInfo__Output } from '../event_imager/EventEviteTicketInfo';
import type { EventEviteTicketInput as _event_imager_EventEviteTicketInput, EventEviteTicketInput__Output as _event_imager_EventEviteTicketInput__Output } from '../event_imager/EventEviteTicketInput';

export interface EventImagerClient extends grpc.Client {
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, options: grpc.CallOptions, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, metadata: grpc.Metadata, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, options: grpc.CallOptions, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  getTicketUrl(argument: _event_imager_EventEviteTicketInput, callback: grpc.requestCallback<_event_imager_EventEviteTicketInfo__Output>): grpc.ClientUnaryCall;
  
}

export interface EventImagerHandlers extends grpc.UntypedServiceImplementation {
  getTicketUrl: grpc.handleUnaryCall<_event_imager_EventEviteTicketInput__Output, _event_imager_EventEviteTicketInfo>;
  
}

export interface EventImagerDefinition extends grpc.ServiceDefinition {
  getTicketUrl: MethodDefinition<_event_imager_EventEviteTicketInput, _event_imager_EventEviteTicketInfo, _event_imager_EventEviteTicketInput__Output, _event_imager_EventEviteTicketInfo__Output>
}
