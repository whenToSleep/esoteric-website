import * as migration_20260307_024232 from './20260307_024232';
import * as migration_20260307_025052 from './20260307_025052';
import * as migration_20260307_135946_add_timeline_to_pages from './20260307_135946_add_timeline_to_pages';
import * as migration_20260307_145738 from './20260307_145738';

export const migrations = [
  {
    up: migration_20260307_024232.up,
    down: migration_20260307_024232.down,
    name: '20260307_024232',
  },
  {
    up: migration_20260307_025052.up,
    down: migration_20260307_025052.down,
    name: '20260307_025052',
  },
  {
    up: migration_20260307_135946_add_timeline_to_pages.up,
    down: migration_20260307_135946_add_timeline_to_pages.down,
    name: '20260307_135946_add_timeline_to_pages',
  },
  {
    up: migration_20260307_145738.up,
    down: migration_20260307_145738.down,
    name: '20260307_145738'
  },
];
