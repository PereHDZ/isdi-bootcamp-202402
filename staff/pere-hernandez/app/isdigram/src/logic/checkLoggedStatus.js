function checkLoggedStatus() {
    return !!sessionStorage.userId
}

export default checkLoggedStatus