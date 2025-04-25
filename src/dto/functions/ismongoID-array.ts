import { isMongoId, registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function IsMongoIDArray(validationOptions?: ValidationOptions) {
    return function(object: Object, propertyName: string) {
        registerDecorator({
            propertyName: propertyName,
            target: object.constructor,
            name: "isMongoIdArray",
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!Array.isArray(value)) return false
                    return value.every((id) => typeof id === 'string' && isMongoId(id))
                },
                defaultMessage(args: ValidationArguments) {
                    return `${args.property} must be an array of valid mongoDB object Ids`
                }
            }
        })
    }
}