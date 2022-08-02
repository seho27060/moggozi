import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

const ChallengeForm: React.FC = () => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const hobbiesInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLInputElement>(null);
  const levelInputRef = useRef<HTMLInputElement>(null);
  const userId = useSelector((state: RootState) => state.auth.userInfo.id);
  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    const enteredName = nameInputRef.current!.value;
    const enteredHobbies = hobbiesInputRef.current!.value;
    const enteredImg = imgInputRef.current!.value;
    const enteredDescription = descriptionInputRef.current!.value;
    const enteredContent = contentInputRef.current!.value;
    const enteredLevel = levelInputRef.current!.value;

    const challengeData = {
      memberId: userId,
      name: enteredName,
      content: enteredContent,
      challengeImg: enteredImg,
      level: enteredLevel,
      hobbyList: { id: 1, tag: enteredHobbies },
      description: enteredDescription,
    };
    
  }
  return (
    <div>
      <h3>Challenge Form</h3>
      <HobbyForm />
      <HobbySetList hobbies={hobbyList}/>
      <form>
        <div>
          <label htmlFor=""></label>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;
