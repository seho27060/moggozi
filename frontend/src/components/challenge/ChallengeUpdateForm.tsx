import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { challengeUpdate } from "../../lib/withTokenApi";
import { fetchHobby, ChallengeDetailState } from "../../store/challenge";
import { RootState } from "../../store/store";
import HobbyForm from "./HobbyForm";
import HobbySetList from "./HobbySetList";

const ChallengeUpdateForm: React.FC<{ challenge: ChallengeDetailState }> = (
  props
) => {
  const dispatch = useDispatch();

  // 처음 켤 때 취미를 저장소에 넣어준다.
  useEffect(() => {
    dispatch(fetchHobby(props.challenge.hobbyList));
  }, [dispatch, props]);

  const nameInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLInputElement>(null);
  const contentInputRef = useRef<HTMLTextAreaElement>(null);
  const levelSelectRef = useRef<HTMLSelectElement>(null);

  const hobbyList = useSelector((state: RootState) => state.hobby.hobbyList);
  const hobbyCnt = useSelector((state: RootState) => state.hobby.hobbyCnt);

  const navigate = useNavigate();

  function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    if (hobbyCnt === 0) {
      alert("취미를 입력해주세요!");
    } else {
      const enteredName = nameInputRef.current!.value;
      const enteredImg = imgInputRef.current!.value;
      const enteredDescription = descriptionInputRef.current!.value;
      const enteredContent = contentInputRef.current!.value;
      const enteredLevel = levelSelectRef.current!.value;

      const challengeData = {
        name: enteredName,
        content: enteredContent,
        img: enteredImg,
        level: Number(enteredLevel),
        description: enteredDescription,
        hobbyList: hobbyList,
      };
      if (props.challenge.id) {
        // 챌린지 id가 존재하는 경우만
        challengeUpdate(challengeData, props.challenge.id)
          .then((res) => {
            console.log(res);
            alert("챌린지 수정이 완료되었습니다.");
            navigate(`/challenge/${res.id}`, { replace: true }); // 뒤로가기 안 먹도록!
          })
          .catch((err) => {
            alert(err.response);
          });
      }
    }
  }

  return (
    <div>
      <h3>Challenge Form</h3>
      <HobbyForm />
      <HobbySetList hobbies={hobbyList} />
      <form>
        <label htmlFor="name">챌린지 이름: </label>
        <input
          type="text"
          required
          id="name"
          ref={nameInputRef}
          defaultValue={props.challenge.name || ""}
        />
        <br />
        <label htmlFor="img">챌린지 이미지 등록: </label>
        <input
          type="text"
          required
          id="img"
          ref={imgInputRef}
          defaultValue={props.challenge.img || ""}
        />
        <br />
        <label htmlFor="description">챌린지 간단 설명: </label>
        <input
          type="text"
          required
          id="description"
          ref={descriptionInputRef}
          defaultValue={props.challenge.description || ""}
        />
        <br />
        <label htmlFor="content">챌린지 상세 내용: </label>
        <textarea
          rows={5}
          id="content"
          required
          ref={contentInputRef}
          defaultValue={props.challenge.content || ""}
        />
        <br />
        <label htmlFor="level">챌린지 level</label>
        <select
          name="level"
          id="level"
          ref={levelSelectRef}
          defaultValue={props.challenge.level || ""}
        >
          <option value="1">매우 쉬움</option>
          <option value="2">쉬움</option>
          <option value="3">보통</option>
          <option value="4">어려움</option>
          <option value="5">매우 어려움</option>
        </select>
        <br />
        <button type="button" onClick={submitHandler}>
          생성
        </button>
      </form>
    </div>
  );
};
export default ChallengeUpdateForm;
