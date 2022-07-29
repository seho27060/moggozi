import { ReactElement } from "react";
import './Modal.module.scss'
const Modal:React.FC<{children:ReactElement}> =(props)=> {
  return(
    <div className="modal">
      {props.children}
    </div>
  )
}
export default Modal;