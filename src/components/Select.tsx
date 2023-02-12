import { Form } from "react-bootstrap"
import styled from "styled-components"

interface SelectOption {
  id: number
  name: string
}

interface Props {
  options: SelectOption[]
  onChange: (...event: any[]) => void
  selectPlaceholder: string
  value: string
}

const ResetOption = styled.option`
  color: #959595;
`

const PlaceholderOption = styled.option`
  display: none;
`

const Select = ({
  options,
  onChange,
  selectPlaceholder,
  value = "",
}: Props) => {
  return (
    <Form.Select as="select" onChange={onChange} value={value}>
      {value !== "" ? (
        <ResetOption value="">- Reset filter -</ResetOption>
      ) : null}

      <PlaceholderOption>{selectPlaceholder}</PlaceholderOption>
      {options.map((option) => (
        <option key={option.id}>{option.name}</option>
      ))}
    </Form.Select>
  )
}

export default Select
