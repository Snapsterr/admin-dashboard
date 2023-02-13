import { Button } from "react-bootstrap"

interface Props {
  row: Transaction
  showDeleteModal: (id: number) => void
  showEditModal: (id: number) => void
  id: number
}

const TableRowContent = ({
  row,
  showEditModal,
  showDeleteModal,
  id,
}: Props) => {
  return (
    <tr className="text-center text-nowrap">
      {Object.values(row).map((val, id) => {
        return (
          <td key={id} style={{ verticalAlign: "middle" }}>
            {val}
          </td>
        )
      })}
      <td className="d-flex justify-content-around gap-2">
        <Button
          type="button"
          className="mr-2"
          variant="primary"
          size="sm"
          onClick={() => showEditModal(id)}
        >
          Edit
        </Button>
        <Button
          type="button"
          variant="danger"
          size="sm"
          onClick={() => showDeleteModal(id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  )
}

export default TableRowContent
