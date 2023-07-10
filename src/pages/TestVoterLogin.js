import { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import OTPInput, { ResendOTP } from "otp-input-react";
import { auth } from "../firebase_config/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

export default function VoterLogin() {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const informationText = useRef(null);
    const [vari, setVari] = useState(false);
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState("");
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);

    const loginButton = async (e) => {

        const email = emailInput.current.value;
        const password = passwordInput.current.value;

        let result = await fetch('http://localhost:5000/v1/user/userlogin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, userID: password })
        }).then(res => res.json()).then(
            async data => {
                console.log(data);
                if (data.success == false) {
                } else if (data.success == true) {
                    console.log(data.data.phone);
                    localStorage.setItem('VoterType', (data.data.userID));
                    localStorage.setItem('VoterID', (data.data.id));
                    localStorage.setItem('VoterName', (data.data.name));
                    // window.location.href = '/userVotingPage'
                    setPh(data.data.phone);
                    onSignup(data.data.phone);
                    setVari(true);

                }
            }
        ).catch(err => {
            console.log(err);
        })
    }

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible",
              callback: (response) => {
                onSignup();
              },
              "expired-callback": () => {},
            },
            auth
          );
        }
      }
    
      function onSignup(phoneno) {
        setLoading(true);
        onCaptchVerify();
    
        const appVerifier = window.recaptchaVerifier;
    
        const formatPh = "+91" +phoneno ;
    
        signInWithPhoneNumber(auth, formatPh, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            setLoading(false);
            setShowOTP(true);
            toast.success("OTP sended successfully!");
          })
          .catch((error) => {
            console.log(error);
            setLoading(false);
          });
      }
    
      function onOTPVerify() {
        setLoading(true);
        window.confirmationResult
          .confirm(otp)
          .then(async (res) => {
            console.log(res);
            setUser(res.user);
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setLoading(false);
          });
      }
 

    useEffect(() => {

    }, []);

    const [OTP, setOTP] = useState("");

    return (
        <>
            {!vari && (
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
                                        Voter Login
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
                                    <button onClick={loginButton} class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" href="../index.html">
                                        Log in
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {
                !vari && (

                    <div class="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900 ">
                        <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} class="bg-red-400 w-100 h-100 p-10" />
                        <br></br>
                        {/* <ResendOTP onResendClick={() => console.log("Resend clicked")} /> */}
                        <button class="bg-blue-400 py-1 px-8 rounded">
                            <span>Verify Otp</span>
                        </button>
                    </div>
                )
            }
        </>
    );
}