import { useEffect } from "react";
import EditUserInfoForm from "../../components/accounts/EditUserInfoForm";

function UserUpdate() {
  useEffect(() => {
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div>
      <EditUserInfoForm />
    </div>
  );
}

export default UserUpdate;
