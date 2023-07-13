import { Connection } from './connection';

export interface Image {
    alt?: string;
    url: string;
    city?: string | null;
}

// ContentStack
export interface ImageConnection extends Connection {
    edges: { node: { url: string; description?: string } }[];
}
