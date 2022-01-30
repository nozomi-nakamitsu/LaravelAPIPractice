export type Photo = {
    id: number;
    user: {
        id: number;
        name: string;
        email: string;
    };
    url: string;
    favorite_count: number;
    is_favorite: boolean;
};
