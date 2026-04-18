import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';

const icons = ICONS_ADMIN_CROPS;

export const CROP_CATEGORIES = [
    { key: 'GRAIN',      value: 'GRAIN',      label: 'Grãos',           icon: icons.WHEAT_ALT   },
    { key: 'SUGAR_CROP', value: 'SUGAR_CROP', label: 'Cana-de-açúcar',  icon: icons.CANDY_CANE  },
    { key: 'FRUIT',      value: 'FRUIT',      label: 'Frutífera',       icon: icons.APPLE_WHOLE },
    { key: 'FIBER',      value: 'FIBER',      label: 'Fibra',           icon: icons.LEAF         },
    { key: 'VEGETABLE',  value: 'VEGETABLE',  label: 'Hortaliça',       icon: icons.CARROT       },
    { key: 'TUBER',      value: 'TUBER',      label: 'Tubérculo',       icon: icons.SEEDLING     },
    { key: 'OILSEED',    value: 'OILSEED',    label: 'Oleaginosa',      icon: icons.DROPLET      },
    { key: 'LEGUME',     value: 'LEGUME',     label: 'Leguminosa',      icon: icons.SEEDLING     },
    { key: 'INDUSTRIAL', value: 'INDUSTRIAL', label: 'Industrial',      icon: icons.GRIP         },
    { key: 'FORESTRY',   value: 'FORESTRY',   label: 'Silvicultura',    icon: icons.LEAF         },
    { key: 'OTHER',      value: 'OTHER',      label: 'Outro',           icon: icons.GRIP         },
];