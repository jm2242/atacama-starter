class HttpError extends Error {
    status: number;
    status: string;

    constructor(message, status) {
        super(message);
        this.msg = message;
        this.status = status;
        this.name = this.constructor.name;
        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export class NotFound extends HttpError {
    constructor(msg) {
        super(msg, 404);
    }
}

export class NotModified extends HttpError {
    constructor(msg) {
        super(msg, 304);
    }
}

export class BadRequest extends HttpError {
    constructor(msg) {
        super(msg, 400);
    }
}

export class Forbidden extends HttpError {
    constructor(msg) {
        super(msg, 403);
    }
}
