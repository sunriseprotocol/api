// Copyright 2017-2020 @polkadot/api-derive authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { of, timer } from '@polkadot/x-rxjs';

import { drr } from '.';

describe('drr', (): void => {
  it('should not fire twice the same value', (done): void => {
    let count = 0;

    of(1, 1).pipe(drr()).subscribe((): void => { ++count; });

    setTimeout((): void => {
      expect(count).toBe(1);
      done();
    }, 50);
  });

  it('should be a ReplaySubject(1)', (done): void => {
    const obs = timer(0, 100).pipe(drr()); // Starts at 0, increments every 100ms

    obs.subscribe(); // Fire the observable

    // Subscribe another time after some time, i.e. after the observable has fired
    setTimeout((): void => {
      obs.subscribe((value): void => {
        expect(value > 1).toBe(true);
        done();
      });
    }, 500);
  });
});
