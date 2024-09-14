import {BaseException} from "@domain/exceptions/base.exception";

export class UuidException extends BaseException {

    constructor(message: string) {
        super(message);
    }
}
