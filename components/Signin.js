
import React from 'react'
import Link from 'next/link'


export default function Signin() {
  return (
    <>
      <div className="techwave_fn_sign">
        <div className="sign__content">
          <h1 className="logo">Designed by Frenify</h1>
          <form className="login">
            <div className="form__content">
              <div className="form__title">Sign In</div>
              <div className="form__username">
                <label htmlFor="user_login">Username or Email</label>
                <input type="text" className="input" id="user_login" autoCapitalize="off" autoComplete="username" aria-describedby="login-message" />
              </div>
              <div className="form__pass">
                <div className="pass_lab">
                  <label htmlFor="user_password">Password</label>
                  <Link href="#">Forget Password?</Link>
                </div>
                <input type="password" id="user_password" autoComplete="current-password" spellCheck="false" />
              </div>
              <div className="form__submit">
                <label className="fn__submit">
                  <input type="submit" name="submit" defaultValue="Sign In" />
                </label>
              </div>
           
            </div>
          </form>
          <div className="sign__desc">
            <p>Not a member? <Link href="/sign-up">Sign Up</Link></p>
          </div>
        </div>
      </div>

    </>
  )
}