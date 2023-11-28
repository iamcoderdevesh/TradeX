const createTokenOptions = () => {
    return { httpOnly: true, secure: true, sameSite: "none" }
}

export { createTokenOptions }