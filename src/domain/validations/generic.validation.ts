import {UuidException} from "@domain/exceptions/uuid.exception";
import {NullException} from "@domain/exceptions/null.exception";
import {NumberException} from "@domain/exceptions/number.exception";

export class GenericValidation {

    public static ensureIsUuid(data: string, fieldName: string): void {
        const message = `El valor proporcionado en el campo "${fieldName}" no es un UUID válido`;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(data)) {
            throw new UuidException(message);
        }
    }

    public static ensureNotNull(data: any, fieldName: string): void {
        if (data === null || data === undefined || data === '') {
            throw new NullException(
                `${fieldName} no debe ser nulo, indefinido o vacío`
            );
        }

        if (typeof data === 'object' && Object.keys(data).length === 0) {
            throw new NullException(
                `${fieldName} no debe ser un objeto vacío`
            );
        }
    }

    public static ensureIsPositiveInteger(data: any, fieldName: string): void {
        if (typeof data !== 'number' || !Number.isInteger(data) || data < 0) {
            throw new NumberException(
                `${fieldName} debe ser un número entero positivo`
            );
        }
    }
}
