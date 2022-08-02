import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { addHobby } from "../../store/challenge";

const HobbyForm: React.FC = () => {
  const dispatch = useDispatch();
  const hobbyInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();

    const enteredHobby = hobbyInputRef.current!.value;
    dispatch(addHobby(enteredHobby))
  }
  return <div>
    <h3>Hobby 생성</h3>
    <form>
      <label htmlFor="hobby">hobby : </label>
      <input type="text" required id="hobby" ref={hobbyInputRef}/>
      <button type="button" onClick={submitHandler}>add</button>
    </form>
  </div>;
};

export default HobbyForm;
