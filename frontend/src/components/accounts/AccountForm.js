import { useRef } from "react";

function AccountForm() {

  const emailInputRef = useRef()
  const usernameInputRef = useRef()
  const nicknameInputRef = useRef()
  const introduceInputRef = useRef()
  const passwordInputRef = useRef()
  const isPrivateInputRef = useRef()
  const userImgInputRef = useRef()

    function submitHandler(event) {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredUsername = usernameInputRef.current.value
    const enteredNickname = nicknameInputRef.current.value
    const enteredIntroduce = introduceInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredIsPrivate = isPrivateInputRef.current.value
    const enteredUserImg = userImgInputRef.current.value

    const meetupData = {
      email : enteredEmail,
      username: enteredUsername,
      nickname : enteredNickname,
      introduce : enteredIntroduce,
      password: enteredPassword,
      is_private : enteredIsPrivate,
      user_img : enteredUserImg,
    }
    
    console.log(meetupData)

  }
  return (
    <div>
      <h3>Account form</h3>
      <div>
        <form>
          <div>
            <label htmlFor="email">email : </label>
            <input
              type="text"
              required
              id="email"
              ref={emailInputRef}
              placeholder ="email"
            />
          </div>
          <div>
            <label htmlFor="password">password : </label>
            <input
              type="password"
              required
              id="password"
              ref={passwordInputRef}
            />
          </div>
          <div>
            <label htmlFor="username">username : </label>
            <input
              type="text"
              required
              id="username"
              ref={usernameInputRef}
            />
          </div>
          <div>
            <label htmlFor="nickname">nickname : </label>
            <input
              type="text"
              required
              id="nickname"
              ref={nicknameInputRef}
            />
          </div>
          <div>
            <label htmlFor="introduce">introduce : </label>
            <textarea
              required
              id="introduce"
              rows="5"
              ref={introduceInputRef}
            />
          </div>
          <div>
            <label htmlFor="is_private">is_private : </label>
            <input
              type="check"
              required
              id="is_private"
              ref={isPrivateInputRef}
            />
          </div>
          <div>
            <label htmlFor="user_img">user_img : </label>
            <input
              type="url"
              required
              id="user_img"
              ref={userImgInputRef}
            />
          </div>
          <button type="button" onClick={submitHandler}>
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
