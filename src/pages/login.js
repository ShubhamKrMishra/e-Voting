import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function Login({ tokenExpired }) {
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const informationText = useRef(null);
  const [isAuth, setIsAuth] = useState(false);

  const loginButton = async (e) => {

    const email = emailInput.current.value;
    const password = passwordInput.current.value;

    let result = await fetch('http://localhost:5000/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then(res => res.json()).then(
      async data => {
        console.log(data);
        if (data.success == false) {
          let result1 = await fetch('http://localhost:5000/v1/user/userlogin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          }).then(res => res.json()).then(
            async data => {
              console.log(data);
              if (data.success == false) {
              } else if (data.success == true) {
                setIsAuth(true);
              }
            }
          ).catch(err => {
            console.log(err);
          })
        } else if (data.success == true) {
          console.log(data.data);
          localStorage.setItem('UserType', (data.data.userType));
          localStorage.setItem('UserID', (data.data.id));
          localStorage.setItem('UserName', (data.data.name));

          window.location.href = '/dashboard';

        }
      }
    ).catch(err => {
      console.log(err);
    })

  }

  useEffect(() => {
    if (tokenExpired) {
      informationText.current.innerText = 'Session expired, please log in again!'
      informationText.current.style.color = 'red'
      informationText.current.style.display = 'block'
    }
  }, []);

  return (
    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div class="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div class="flex flex-col overflow-y-auto md:flex-row">
          <div class="h-32 md:h-auto md:w-1/2">
            <img aria-hidden="true" class="object-cover w-full h-full dark:hidden" src="../assets/img/login-office.jpeg" alt="Office" />
            <img aria-hidden="true" class="hidden object-cover w-full h-full dark:block" src="../assets/img/login-office-dark.jpeg" alt="Office" />
          </div>
          <div class="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div class="w-full">
              <h1 class="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <label class="block text-sm">
                <span class="text-gray-700 dark:text-gray-400">Email</span>
                <input ref={emailInput} class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Email" />
              </label>
              <label class="block mt-4 text-sm">
                <span class="text-gray-700 dark:text-gray-400">Password</span>
                <input ref={passwordInput} class="block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input" placeholder="Password" type="password"
                  onKeyDown={e => { e.key === 'Enter' && loginButton() }} />
              </label>

              {/* <div class="flex mt-6 text-sm hidden" ref={informationText}>
                <label class="flex items-center dark:text-red-400">
                  <span class="ml-2">
                    Lorem ipsum dolor sit amet
                  </span>
                </label>
              </div> */}

              <button onClick={loginButton} class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" href="../index.html">
                Log in
              </button>
              <p class="mt-4">
                <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="/forgot_password">
                  Forgot your password?
                </a>
              </p>
              <p class="mt-1">
                <a class="text-sm font-medium text-purple-600 dark:text-purple-400 hover:underline" href="/register">
                  Create account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}