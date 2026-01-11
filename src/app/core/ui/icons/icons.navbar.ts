import {
    faLayerGroup,
    faCogs,
    faUsers,
    faCircleQuestion,
    faUserPlus,
    faUserTie,
    faRightToBracket,
    faChevronDown,
    faUser,
    faTractor,
    faUserShield,
    faUserGraduate
}  from '@fortawesome/free-solid-svg-icons';

export const ICONS_NAVBAR = {
    LAYERGROUP: faLayerGroup,
    COGS: faCogs,
    USERS: faUsers,
    CIRCLEQUESTION: faCircleQuestion,
    RIGHTTOBRACKET: faRightToBracket,
    CHEVRONDOWN: faChevronDown,
    USERTIE: faUserTie,
    USERPLUS: faUserPlus,
    USER: faUser,
    TRACTOR: faTractor,
    USERSHIELD: faUserShield,
    USERGRADUATE: faUserGraduate
} as const;

export type IconKey = keyof typeof ICONS_NAVBAR;