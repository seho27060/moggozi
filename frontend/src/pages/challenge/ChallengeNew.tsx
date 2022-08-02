import ChallengeForm from "../../components/challenge/ChallengeForm";
import HobbyForm from "../../components/challenge/HobbyForm";


const ChallengeNew: React.FC = () => {
  // const dispatch = useDispatch();
  // const challengeState = useSelector((state: RootState) => state.challenge);
  // function addHandler(event: React.FormEvent) {
  //   const data = {
  //     id: 1,
  //     name: '브롤스타즈',
  //     img: 'https://dullyshin.github.io/2018/08/30/HTML-imgLink/',
  //     description: '아주 재밌는 브롤스타즈 놀이에요',
  //     hobbies: [{id : 11, name: '게임'}, {id : 2, name: '놀이'}],
  //     writer: {id: 24, name: '허재영'},
  //     level: 3,
  //     userProgress: 2
  //   }
  //   event.preventDefault();

  // }

  return (
    <div>
      <h3>ChallengeNew</h3>
      {/* <button onClick={addHandler}>add</button> */}
      <ChallengeForm></ChallengeForm>
      <HobbyForm></HobbyForm>
    </div>
  );
};

export default ChallengeNew;
