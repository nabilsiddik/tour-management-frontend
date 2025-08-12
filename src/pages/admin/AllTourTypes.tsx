import { AddTourTypeModal } from "@/components/modules/TourType/AddTourTypeModal"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useGetTourTypesQuery } from "@/redux/features/tour/tour.api"
import { formatDate } from "@/utils/formatDate"
import { Edit, Edit2, Trash2 } from "lucide-react"

interface ITourType {
    _id: string,
    name: string,
    createdAt: string,
    updatedAt: string,

}

const AllTourTypes = () => {

    const {data} = useGetTourTypesQuery(undefined)

    return (
        <div>
            <div className="flex items-center justify-between">
                <h2 className="font-bold text-center text-2xl mb-10 mt-5">All Tour Types</h2>
                <AddTourTypeModal/>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Created At</TableHead>
                        <TableHead>Updated At</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data && data.map((tourType: ITourType) => {
                        return <TableRow key={tourType._id}>
                        <TableCell className="font-medium">{tourType?.name}</TableCell>
                        <TableCell>{formatDate(new Date(tourType.createdAt))}</TableCell>
                        <TableCell>{formatDate(new Date(tourType.updatedAt))}</TableCell>
                        <TableCell>
                            <div className="flex items-center gap-4">
                                <Trash2 className="cursor-pointer"/>
                                <Edit className="cursor-pointer"/>
                            </div>
                        </TableCell>
                    </TableRow>
                    })}
                </TableBody>
            </Table>
        </div>
    )
}

export default AllTourTypes
