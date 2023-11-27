const createTokenOptions = () => {
    return { httpOnly: true, secure: false, sameSite: "none" }
}

export { createTokenOptions }