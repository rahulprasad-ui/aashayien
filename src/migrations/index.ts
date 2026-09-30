import * as migration_20260112_114252 from './20260112_114252';
import * as migration_20260122_131801 from './20260122_131801';
import * as migration_20260127_055227_add_resources_and_freestudy from './20260127_055227_add_resources_and_freestudy';
import * as migration_20260424_132500_add_post_image_display_columns from './20260424_132500_add_post_image_display_columns';
import * as migration_20260425_000000_fix_pages_hero_enum from './20260425_000000_fix_pages_hero_enum';
import * as migration_20260508_000000_add_rbac_to_users from './20260508_000000_add_rbac_to_users';
import * as migration_20260508_010000_make_rbac_modules_multi_select from './20260508_010000_make_rbac_modules_multi_select';
import * as migration_20260508_020000_add_form_crm_toggle from './20260508_020000_add_form_crm_toggle';
import * as migration_20260508_030000_add_leads_event_type from './20260508_030000_add_leads_event_type';
import * as migration_20260511_070000_add_structured_data_dynamic_fields from './20260511_070000_add_structured_data_dynamic_fields';
import * as migration_20260603_000000_add_seo_verification_and_robots_fields from './20260603_000000_add_seo_verification_and_robots_fields';
import * as migration_20260911_105219 from './20260911_105219';
import * as migration_20260912_092339 from './20260912_092339';

export const migrations = [
  {
    up: migration_20260112_114252.up,
    down: migration_20260112_114252.down,
    name: '20260112_114252',
  },
  {
    up: migration_20260122_131801.up,
    down: migration_20260122_131801.down,
    name: '20260122_131801',
  },
  {
    up: migration_20260127_055227_add_resources_and_freestudy.up,
    down: migration_20260127_055227_add_resources_and_freestudy.down,
    name: '20260127_055227_add_resources_and_freestudy',
  },
  {
    up: migration_20260424_132500_add_post_image_display_columns.up,
    down: migration_20260424_132500_add_post_image_display_columns.down,
    name: '20260424_132500_add_post_image_display_columns',
  },
  {
    up: migration_20260425_000000_fix_pages_hero_enum.up,
    down: migration_20260425_000000_fix_pages_hero_enum.down,
    name: '20260425_000000_fix_pages_hero_enum',
  },
  {
    up: migration_20260508_000000_add_rbac_to_users.up,
    down: migration_20260508_000000_add_rbac_to_users.down,
    name: '20260508_000000_add_rbac_to_users',
  },
  {
    up: migration_20260508_010000_make_rbac_modules_multi_select.up,
    down: migration_20260508_010000_make_rbac_modules_multi_select.down,
    name: '20260508_010000_make_rbac_modules_multi_select',
  },
  {
    up: migration_20260508_020000_add_form_crm_toggle.up,
    down: migration_20260508_020000_add_form_crm_toggle.down,
    name: '20260508_020000_add_form_crm_toggle',
  },
  {
    up: migration_20260508_030000_add_leads_event_type.up,
    down: migration_20260508_030000_add_leads_event_type.down,
    name: '20260508_030000_add_leads_event_type',
  },
  {
    up: migration_20260511_070000_add_structured_data_dynamic_fields.up,
    down: migration_20260511_070000_add_structured_data_dynamic_fields.down,
    name: '20260511_070000_add_structured_data_dynamic_fields',
  },
  {
    up: migration_20260603_000000_add_seo_verification_and_robots_fields.up,
    down: migration_20260603_000000_add_seo_verification_and_robots_fields.down,
    name: '20260603_000000_add_seo_verification_and_robots_fields',
  },
  {
    up: migration_20260911_105219.up,
    down: migration_20260911_105219.down,
    name: '20260911_105219',
  },
  {
    up: migration_20260912_092339.up,
    down: migration_20260912_092339.down,
    name: '20260912_092339'
  },
];
