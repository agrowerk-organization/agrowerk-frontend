import { ICONS_ADMIN_CROPS } from '@core/ui/icons/icons-admin/icons-admin-crops/icons-admin-crops';

const icons = ICONS_ADMIN_CROPS;

export const CROP_CATEGORIES = [
    { key: 'ALL',        value: 'ALL',        label: 'Todas',        icon: icons.GRIP  },
    { key: 'CEREAL',     value: 'CEREAL',     label: 'Cereal',       icon: icons.WHEAT_ALT   },
    { key: 'LEGUME',     value: 'LEGUME',     label: 'Leguminosa',   icon: icons.SEEDLING },
    { key: 'OILSEED',    value: 'OILSEED',    label: 'Oleaginosa',   icon: icons.DROPLET      },
    { key: 'FRUIT',      value: 'FRUIT',      label: 'Frutífera',    icon: icons.APPLE_WHOLE   },
    { key: 'VEGETABLE',  value: 'VEGETABLE',  label: 'Hortaliça',    icon: icons.CARROT       },
    { key: 'FIBER',      value: 'FIBER',      label: 'Fibra',        icon: icons.LEAF         },
    { key: 'SUGARCANE',  value: 'SUGARCANE',  label: 'Cana-de-açúcar', icon: icons.CANDY_CANE  },
    { key: 'OTHER',      value: 'OTHER',      label: 'Outro',        icon: icons.GRIP        },
];