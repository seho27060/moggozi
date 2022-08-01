import React, { useRef } from "react";

const ChallengeForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hobbiesInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const levelInputRef = useRef<HTMLInputElement>(null);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredHobbies = hobbiesInputRef.current!.value;
    const enteredImg = imgInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredContent = contentInputRef.current!.value;
    const enteredLevel = levelInputRef.current!.value;
    
    const challengeData = {
      name: enteredName,
      content: enteredContent,
      challenge_img: enteredImg,
      level: enteredLevel,
      hobbies: enteredHobbies,
      description: enteredDescription,
    }
  }
  return (
  <div>
    <h3>Challenge Form</h3>
    <form>
      <div>
        <label htmlFor=""></label>
      </div>
    </form>
  </div>
  );
};

export default ChallengeForm;
