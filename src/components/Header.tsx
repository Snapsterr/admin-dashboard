import styled from "styled-components"
import NavMenu from "./NavMenu"

const HeaderTag = styled.header`
  display: flex;
  flex-direction: row;
  justifycontent: space-between;
  align-items: center;
`

const Header = () => {
  return (
    <HeaderTag>
      <NavMenu />
    </HeaderTag>
  )
}

export default Header
