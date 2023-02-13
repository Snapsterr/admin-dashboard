import { Form } from "react-bootstrap"
import { Controller, useForm } from "react-hook-form"
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch"
import { updateStatusFilter } from "../../store/slices/transactionsSlice"
import { filterByStatus } from "../../utils/filters"
import Select from "../Select"

const FilterByStatus = () => {
  const dispatch = useAppDispatch()

  const { statusFilter } = useAppSelector((state) => state.transactionsSlice)

  const { handleSubmit, control } = useForm({
    defaultValues: { status: "" },
  })

  const onSubmitHandler = (data: DefaultStatus) => {
    const { status } = data
    dispatch(updateStatusFilter(status))
  }
  return (
    <Form
      className="d-flex justify-self-start gap-2"
      onChange={handleSubmit(onSubmitHandler)}
    >
      <Controller
        control={control}
        name="status"
        render={({ field: { onChange } }) => (
          <Select
            options={filterByStatus}
            onChange={onChange}
            selectPlaceholder="Status"
            value={statusFilter}
          />
        )}
      />
    </Form>
  )
}

export default FilterByStatus
