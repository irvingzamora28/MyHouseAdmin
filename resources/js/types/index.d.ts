import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export interface Category {
    id: number;
    name: string;
}

export interface Location {
    id: number;
    name: string;
    description?: string;
    parent_id?: number;
    location_type_id?: number;
    location_type?: LocationType;
    parent?: Location;
    children?: Location[];
}

export interface LocationsData {
    data: Location[];
}

export interface LocationType {
    id: number;
    name: string;
    icon_package: string;
    icon_name: string;
}

export interface Icon {
    id: number;
    name: string;
    icon_package: string;
    icon_name: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
