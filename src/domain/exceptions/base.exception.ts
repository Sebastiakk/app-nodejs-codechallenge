export class BaseException extends Error {

    constructor(
        public readonly message: string,
        public readonly httpErrorCode = 400
    ) {
        super(message);
    }
}
