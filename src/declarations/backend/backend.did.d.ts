import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface GalleryImage {
  'url' : string,
  'description' : string,
  'category' : string,
}
export interface MenuItem {
  'name' : string,
  'description' : string,
  'category' : string,
  'price' : bigint,
}
export interface _SERVICE {
  'getAbout' : ActorMethod<[], string>,
  'getGalleryImages' : ActorMethod<[], Array<GalleryImage>>,
  'getMenu' : ActorMethod<[], Array<MenuItem>>,
  'makeReservation' : ActorMethod<
    [string, string, string, string, bigint],
    undefined
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
