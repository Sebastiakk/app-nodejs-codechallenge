import {BaseException} from "@domain/exceptions/base.exception";

export class NumberException extends BaseException {
    constructor(message: string) {
        super(message);
    }
}
