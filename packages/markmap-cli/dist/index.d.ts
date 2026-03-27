import { type IMarkmapCreateOptions } from 'markmap-lib';
import { IDevelopOptions } from './types';
import { config } from './util/common';
export * from './types';
export * from './util/dev-server';
export { config };
export * as markmap from 'markmap-lib';
export declare function createMarkmap(
  options: IMarkmapCreateOptions &
    IDevelopOptions & {
      open: boolean;
    },
): Promise<void>;
