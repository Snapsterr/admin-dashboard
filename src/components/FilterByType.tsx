import { Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch"
import { updateTypeFilter } from "../store/slices/transactionsSlice"
import { DefaultType } from "../types/typings"
import { filterByType } from "../utils/filters"
import Select from "./Select"

const FilterByType = () => {
  const dispatch = useAppDispatch()

  const { typeFilter } = useAppSelector((state) => state.transactionsSlice)

  const { handleSubmit, control } = useForm({
    defaultValues: { type: "" },
  })

  const onSubmitHandler = (data: DefaultType) => {
    const { type } = data
    dispatch(updateTypeFilter(type))
  }
  return (
    <Form
      className="d-flex justify-self-start gap-2"
      onChange={handleSubmit(onSubmitHandler)}
    >
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange } }) => (
          <Select
            options={filterByType}
            onChange={onChange}
            selectPlaceholder="Type"
            value={typeFilter}
          />
        )}
      />
    </Form>
  )
}

export default FilterByType
