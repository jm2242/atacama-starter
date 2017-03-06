// @flow

export class Author {
    id: number;
    name: string;

    constructor(db_data: any) {
        this.id = db_data.id;
        this.name = db_data.name;
    }
}

export class Tag {
    id: number;
    type: string;
    value: string;

    constructor(db_data: any) {
        this.id = db_data.id;
        this.type = db_data.type;
        this.value = db_data.value;
    }
}

export class Book {
    id: number;
    title: string;
    published: Date;
    genres: string[];
    series: string[];
    viewed: boolean;
    saved: boolean;
    tags: Tag[];
    authors: Author[];

    constructor(db_data: any) {
        this.id = db_data.id;
        this.title = db_data.title;
        this.published = db_data.publish_date;
    }
}