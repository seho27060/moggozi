import React, { useRef } from "react";
import { Hobby } from "../../store/challenge";

const HobbyForm: React.FC = () => {
  const hobbyInputRef = useRef<HTMLInputElement>(null);
  const hobby: Hobby[] = [];

  let order = 0
  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    order += 1
    const enteredHobby = hobbyInputRef.current!.value;
    hobby.push({"id": order, "name": enteredHobby})
    console.log(hobby)
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
