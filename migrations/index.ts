import * as migration_20260307_024232 from './20260307_024232';
import * as migration_20260307_025052 from './20260307_025052';

export const migrations = [
  {
    up: migration_20260307_024232.up,
    down: migration_20260307_024232.down,
    name: '20260307_024232',
  },
  {
    up: migration_20260307_025052.up,
    down: migration_20260307_025052.down,
    name: '20260307_025052'
  },
];
