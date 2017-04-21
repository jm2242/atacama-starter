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
        this.type = (db_data.type || '').toLowerCase() ;
        this.value = (db_data.value || '').toLowerCase();
    }

    withId(id: number) {
        this.id = id;
        return this;
    }
}

export class Book {
    id: number;
    title: string;
    published: Date;
    genres: string[];
    series: string[];
    viewed: Date;
    saved: boolean;
    tags: Tag[];
    authors: Author[];
    hasFullText: boolean;

    constructor(db_data: any) {
        this.id = db_data.id;
        this.title = db_data.title;
        this.published = db_data.publish_date;
        this.viewed = db_data.date;
        this.saved = !!db_data.saved;
        this.hasFullText = !!db_data.has_fulltext;
    }
}

export class BookList {
    id: number;
    name: string;
    description: string;
    created: Date;
    books: Book[];

    constructor(db_data: any) {
        this.id = db_data.id;
        this.name = db_data.name;
        this.description = db_data.description;
        this.created = db_data.created;
    }

    withBooks(books: Book[]): BookList {
        this.books = books;
        return this;
    }
}


export class User {
    id: number;
    name: string;
    email: string;
    photo: string;

    constructor(db_data: any) {
        this.id = db_data.id;
        this.name = db_data.name;
        this.email = db_data.email;
        this.photo = db_data.photo;
    }

    copyWithNewId(id: number) {
        const other = new User(this);
        other.id = id;
        return other;
    }
}

export class Facet {
    name: string;
    values: FacetValue[];

    constructor(name: string, data: any[]) {
        this.name = name;

        let cpy = data.slice();
        let reshaped: any[][] = [];
        while(cpy.length) reshaped.push(cpy.splice(0, 2));

        this.values = reshaped.map((elem) => new FacetValue(elem));
    }
}

export class FacetValue {
    key: string;
    count: number;

    constructor(data: any[]) {
        this.key = data[0];
        this.count = data[1];
    }
}
