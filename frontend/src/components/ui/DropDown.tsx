import { useCallback, useState } from "react";
import styled from "styled-components";

export const DropdownContainer = styled.div`
  width: 400px;

  &:hover {
    cursor: pointer;
  }
`;

export const DropdownBody = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 9px 14px;
  border: 2px solid #d2d2d2;
`;

export const DropdownSelect = styled.p`
  font-weight: bold;
`;

export const DropdownMenu = styled.ul<{isActive:boolean}>`
  display: ${(props) => (props.isActive ? `block` : `none`)};
  width: 400px;
  background-color: white;
  position: absolute;
  border: 2px solid #f4acbb;
`;

export const DropdownItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 9px 14px;
  border-bottom: 2px solid #d2d2d2;
  border-top: none;

  &:last-child {
    border-bottom: none;
  }
`;

export const ItemName = styled.p`
  font-weight: bold;
`;
const Dropdown:React.FC<{dropdownItems: any[]}> = ({dropdownItems}) => {
  const [isActive, setIsActive] = useState(false);
  const [item, setItem] = useState(null);

  const onActiveToggle = useCallback(() => {
    setIsActive((prev) => !prev);
  }, []);

  const onSelectItem = useCallback((e : any) => {
    const targetId = e.target.id;

    if (targetId === "item_name") {
      setItem(e.target.parentElement.innertText);
    } else if (targetId === "item") {
      setItem(e.target.innertText);
    }

    setIsActive((prev) => !prev);
  }, []);

  return (
    <DropdownContainer>
      <DropdownBody onClick={onActiveToggle}>
        {item ? (
          <>
            <ItemName>{item}</ItemName>
          </>
        ) : (
          <>
            <DropdownSelect>선택해주세요.</DropdownSelect>
            {/* <AiOutlineDown /> */}
          </>
        )}
      </DropdownBody>
      <DropdownMenu isActive={isActive}>
        {dropdownItems!.map((item) => (
          <DropdownItemContainer id={item.id} key={item.id} onClick={onSelectItem}>
            <ItemName id="item_name">{item.name}</ItemName>
          </DropdownItemContainer>
        ))}
      </DropdownMenu>
    </DropdownContainer>
  );
};

export default Dropdown;