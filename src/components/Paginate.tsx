import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const Paginate = ({ page, setPage, totalPage }: any) => {

    let pagesArray = Array.from({ length: totalPage }).map((_, index) => index + 1)

    if (totalPage > 6) {
        pagesArray = pagesArray.slice(0, 6)
    }

    return (
        <div>
            {totalPage > 1 &&
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious onClick={() => setPage(page - 1)} className={page === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                        </PaginationItem>
                        {pagesArray?.map((pageItem) => {
                            return <PaginationItem key={pageItem} onClick={() => setPage(pageItem)} className={`${page === pageItem ? 'bg-foreground text-white dark:text-black rounded-md' : ''} cursor-pointer`}>
                                <PaginationLink>{pageItem}</PaginationLink>
                            </PaginationItem>
                        })}
                        {totalPage > 6 && <PaginationItem>
                            <PaginationEllipsis />
                        </PaginationItem>}
                        <PaginationItem>
                            <PaginationNext onClick={() => setPage(page + 1)} className={page === totalPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'} />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            }
        </div>
    )
}

export default Paginate
