export function validateMobileNumber(mobileNumber, toast) {
    const regex = /^\d{10}$/;
    if (!regex.test(mobileNumber)) {
        toast({ type: 'error', message: 'Invalid Number' })
    }
    return regex.test(mobileNumber);
}