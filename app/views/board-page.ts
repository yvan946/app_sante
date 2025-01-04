import { NavigatedData, Page } from '@nativescript/core';

export function onNavigatingTo(args: NavigatedData) {
  const page = args.object as Page;
}