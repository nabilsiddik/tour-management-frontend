import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal"
import { AddDivisionModal } from "@/components/modules/Division/AddDivisionModal"
import { AddTourTypeModal } from "@/components/modules/TourType/AddTourTypeModal"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useAllDivisionsQuery, useDeleteDivisionMutation } from "@/redux/features/division/division.api"
import { formatDate } from "@/utils/formatDate"
import { Edit, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface ITourType {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,

}

const AddDivision = () => {

    const { data } = useAllDivisionsQuery(undefined)
    const [deleteDivision] = useDeleteDivisionMutation()

    // Delete division
    const handleDeleteDivision = async (divisionId: string) => {
        const toastId = toast.loading('Deleting...')

        try {
            const res = await deleteDivision(divisionId).unwrap()
            if (res.success) {
                toast.success('Division deleted.', { id: toastId })
            }
        } catch (error: any) {
            console.error(error)
            if (error?.data?.success) {
                toast.success(error?.message)
            }
        }
    }

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-center text-2xl mb-10 mt-5">All Divisions</h2>
                <AddDivisionModal />
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Division</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.data.map((division: any) => {
                        return <TableRow key={division._id}>
                            <TableCell className="font-medium">
                                <div className="flex flex-col gap-3 items-center">
                                    <span>
                                        <img className="w-[100px]" src={division?.thumbnail} alt="" />
                                    </span>
                                    <span className="font-bold text-center">{division?.name}</span>
                                </div>
                            </TableCell>
                            <TableCell>{formatDate(new Date(division.createdAt))}</TableCell>
                            <TableCell>{formatDate(new Date(division.updatedAt))}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <DeleteConfirmationModal
                                    element='Division'
                                    onConfirm={() => handleDeleteDivision(division._id)}>
                                        <Trash2 className="cursor-pointer" />
                                    </DeleteConfirmationModal>
                                    <Edit className="cursor-pointer" />
                                </div>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default AddDivision
