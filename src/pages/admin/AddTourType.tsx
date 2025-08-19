import { DeleteConfirmationModal } from "@/components/modals/DeleteConfirmationModal"
import { AddTourTypeModal } from "@/components/modules/TourType/AddTourTypeModal"
import Paginate from "@/components/Paginate"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useDeleteTourTypeMutation, useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { formatDate } from "@/utils/formatDate"
import { Edit, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface ITourType {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,
}

const AddTourType = () => {
    const [page, setPage] = useState<number>(1)
    const [limit, setLimit] = useState<number>(10)
    const { data } = useGetTourTypesQuery({page, limit})
    const [deleteTourType] = useDeleteTourTypeMutation()

    const totalPage = data?.meta?.totalPage || 1

    // Delete tour type
    const handleDeleteTourType = async (tourTypeId: string) => {
        const toastId = toast.loading('Deleting...')

        try {
            const res = await deleteTourType(tourTypeId).unwrap()
            if (res.success) {
                toast.success('Tour type deleted.', {id: toastId})
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
                <h2 className="font-bold text-center text-2xl mb-10 mt-5">All Tour Types</h2>
                <AddTourTypeModal />
            </div>
            <Table className="border">
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data?.data?.map((tourType: ITourType) => {
                        return <TableRow key={tourType._id}>
                            <TableCell className="font-medium">{tourType?.name}</TableCell>
                            <TableCell>{formatDate(new Date(tourType.createdAt))}</TableCell>
                            <TableCell>{formatDate(new Date(tourType.updatedAt))}</TableCell>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <DeleteConfirmationModal
                                    element='Tour Type'
                                    onConfirm = {() => handleDeleteTourType(tourType._id)}>
                                        <Trash2 className="cursor-pointer" />
                                    </DeleteConfirmationModal>
                                    <Edit className="cursor-pointer" />
                                </div>
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>

            <div className="mt-5 flex justify-end">
                <Paginate page = {page} setPage = {setPage} totalPage = {totalPage}/>
            </div>
        </div>
    )
}

export default AddTourType
