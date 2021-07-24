export type FieldValidatorsType = (value: string) => string | undefined

export const required: FieldValidatorsType = (value) => {
    if(value) {
        return undefined
    } else {
        return "Field is required"
    }
}

export const maxLengthCreator = (maxLength: number): FieldValidatorsType => (value) => {
    if(value && value.length > maxLength) {
        return `Max length is ${maxLength} symbols`
    } else {
        return undefined
    }
}