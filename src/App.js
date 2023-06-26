import React, { useState } from "react";
import OtpInput from "otp-input-react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { auth } from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { toast, Toaster } from "react-hot-toast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Cities } from "./Cities";
import { Home } from "./Home";

function App() {
  const [otp, setOtp] = useState("");
  const [ph, setPh] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);

  function onCaptchaVerifier() {
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
  function onSignup() {
    onCaptchaVerifier();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+${ph}`;
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setShowOTP(true);
        toast.success("OTP sent successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function onOTPVerify() {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res);
        setUser(res.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const [checked, setChecked] = useState([]);
  const checkList = [
    "Agra",
    "Delhi",
    "Dehradun",
    "Gurgaon",
    "Lucknow",
    "Mumbai",
    "Noida",
  ];

  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      if (!checked.includes(event.target.value))
        updatedList = [...checked, event.target.value];
    } else {
      updatedList = [...checked.filter((city) => city === event.target.value)];
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.sort().reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";
  return (
    <section>
      <div>
        <Toaster toastOptions={{ duration: 4000 }} />
        <div id="recaptcha-container"></div>
        {user ? (
          <div className="app">
            <Router>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Home
                      isChecked={isChecked}
                      checkList={checkList}
                      handleCheck={handleCheck}
                    />
                  }
                />
                <Route
                  path="/selected"
                  element={<Cities checkedItems={checkedItems} />}
                />
              </Routes>
            </Router>
          </div>
        ) : (
          <div>
            {showOTP ? (
              <>
                <h1>Enter OTP</h1>
                <OtpInput
                  value={otp}
                  onChange={setOtp}
                  OTPLength={6}
                  otpType="number"
                  disabled={false}
                  autoFocus
                ></OtpInput>
                <button onClick={onOTPVerify}>
                  <span>Verify OTP</span>
                </button>
              </>
            ) : (
              <>
                <h1>Enter your Mobile number</h1>
                <PhoneInput country={"in"} value={ph} onChange={setPh} />
                <button onClick={onSignup}>
                  <span>Send Code via SMS</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
