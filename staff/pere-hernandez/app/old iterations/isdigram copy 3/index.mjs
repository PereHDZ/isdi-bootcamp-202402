import logic from "./logic.mjs"

import Component from "./components/core/Component.mjs"

import Landing from "./pages/Landing.mjs"
import Register from "./pages/Register.mjs"
import Login from "./pages/Login.mjs"
import Home from "./pages/Home.mjs"

const root = new Component(document.body)

const landing = new Landing
const register = new Register
const login = new Login
let home

landing.onRegisterClick(() => root.replace(landing, register))
landing.onLoginClick(() => root.replace(landing, login))

register.onLogInClick(() => root.replace(register, login))
register.onRegistered(() => root.replace(register, login))

login.onRegisterClick(() => root.replace(login, register))
login.onUserLoggedIn(() => {
    buildHome()

    root.replace(login, home)
})

if (!logic.checkLoggedInStatus())
    root.add(landing)
else {
    buildHome()

    root.add(home)
}

//helpers

function buildHome(){
    home = new Home

    home.onLogout(() => root.replace(home, login))
}