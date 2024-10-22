import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface MenuItem {
  'name' : string,
  'description' : string,
  'price' : bigint,
}
export interface _SERVICE {
  'getAbout' : ActorMethod<[], string>,
  'getMenu' : ActorMethod<[], Array<MenuItem>>,
  'getPictures' : ActorMethod<[], Array<string>>,
  'makeReservation' : ActorMethod<
    [string, string, string, string, bigint],
    undefined
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
