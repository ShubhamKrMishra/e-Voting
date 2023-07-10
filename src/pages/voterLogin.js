import OtpInput from "otp-input-react";
import { useState, useRef } from "react";
import { auth } from "../firebase_config/config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";

const VoterLogin = () => {
    const emailInput = useRef(null);
    const passwordInput = useRef(null);
    const [otp, setOtp] = useState("");
    const [ph, setPh] = useState();
    const [loading, setLoading] = useState(false);
    const [showOTP, setShowOTP] = useState(false);
    const [user, setUser] = useState(null);
    const [voterType, setVoterType] = useState();
    const [voterID, setVoterID] = useState();
    const [voterName, setVoterName] = useState();

    function onCaptchVerify() {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(
                "recaptcha-container",
                {
                    size: "invisible",
                    callback: (response) => {
                        onSignup();
                    },
                    "expired-callback": () => { },
                },
                auth
            );
        }
    }

    async function onSignup() {
        onCaptchVerify();
        const appVerifier = window.recaptchaVerifier;
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
                    setVoterID(data.data.id);
                    setVoterType(data.data.userID);
                    setVoterName(data.data.name)
                    // window.location.href = '/userVotingPage'
                    setPh(data.data.phone);
                    // setVari(true);

                }
            }
        ).catch(err => {
            console.log(err);
        })


        setLoading(true);


        console.log(ph);
        const formatPh = "+91" + ph;

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
                localStorage.setItem('VoterType', voterType);
                localStorage.setItem('VoterID', voterID);
                localStorage.setItem('VoterName', voterName);
                window.location.href = '/userVotingPage'

            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }

    return (
        <section className="flex items-center justify-center h-screen" class="w-full">
            <div>
                <Toaster toastOptions={{ duration: 4000 }} />
                <div id="recaptcha-container"></div>
                {user ? (
                    <h2 className="text-center text-white font-medium text-2xl">
                        👍Login Success
                    </h2>
                ) : (
                    <div className="w-400 flex flex-col gap-4 rounded-lg p-4">
                        <h1 className="text-center leading-normal text-white font-medium text-3xl mb-6">
                            Welcome to <br /> CODE A PROGRAM
                        </h1>
                        {showOTP ? (
                            <>
                                <div className="bg-white text-emerald-500 w-fit mx-auto p-4 rounded-full">
                                    {/* <BsFillShieldLockFill size={30} /> */}
                                </div>
                                <label
                                    htmlFor="otp"
                                    className="font-bold text-xl text-white text-center"
                                >
                                    Enter your OTP
                                </label>
                                <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    OTPLength={6}
                                    otpType="number"
                                    disabled={false}
                                    autoFocus
                                    className="opt-container "
                                ></OtpInput>
                                <button
                                    onClick={onOTPVerify}
                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && (
                                        // <CgSpinner size={20} className="mt-1 animate-spin" />
                                        <p></p>
                                    )}
                                    <span>Verify OTP</span>
                                </button>
                            </>
                        ) : (
                            <>
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
                                                            onKeyDown={e => { e.key === 'Enter' && onSignup() }} />
                                                    </label>
                                                    <button onClick={onSignup} class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple" href="../index.html">
                                                        Log in
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={onSignup}
                                    className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                                >
                                    {loading && (
                                        // <CgSpinner size={20} className="mt-1 animate-spin" />
                                        <p></p>
                                    )}
                                    <span>Send code via SMS</span>
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

export default VoterLogin;