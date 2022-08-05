import validator from 'validator'

function Validator(rules, fields) {
    let errors = {}
    rules.forEach((rule) => {
        const fieldValue = typeof fields == 'object' && fields !== null ? fields[rule.field] : fields
        const args = rule.args || []

        const validationMethod = validator[rule.method]
        if (validationMethod(fieldValue, ...args) !== rule.validWhen) {
            errors[rule.field] = rule.message
        }
    })

    return errors
}

export default Validator
