function checkLoggedStatus () {
    return !!sessionStorage.token
}

export default checkLoggedStatus