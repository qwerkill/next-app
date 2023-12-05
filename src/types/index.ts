

export interface IPost {
    id: number;
    title: string;
    content: string;
    category: ICategories;
    categoryId: number;
}


export interface ICategories {
    id: number;
    name: string;
}