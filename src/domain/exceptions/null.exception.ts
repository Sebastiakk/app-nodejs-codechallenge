import {BaseException} from "@domain/exceptions/base.exception";

export class NullException extends BaseException {
    constructor(message: string) {
        super(message);
    }
}
