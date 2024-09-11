import './style.css'
import {account} from './appwrite'
import { render } from '@testing-library/react'

const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')
const profileScreen = document.getElementById('profile-screen')
const loginScreen = document.getElementById('login-screen')

async function handleLogin (){

}

async function getUser() {
  try {
    const user = await account.get()
    renderProfileScreen(user)
  }
  catch(error){
    renderLoginScreen()
  }
}