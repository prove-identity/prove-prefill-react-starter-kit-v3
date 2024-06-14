// Super simple email validation that just checks for characters between an @ and .
// Probably no need to go more complex then this for now
export const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
}