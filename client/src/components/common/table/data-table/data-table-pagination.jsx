import { BiChevronLeft, BiChevronsLeft, BiChevronRight, BiChevronsRight } from 'react-icons/bi';


export function DataTablePagination({ table }) {
    const buttonClass = "p-1 border rounded-md shadow-sm border-gray-300 dark:border-gray-500 px-2 disabled:opacity-50 hover:bg-gray-200 dark:hover:bg-main-dark-bg disabled:pointer-events-none disabled:opacity-50";
    return (
        <div className="flex flex-col space-y-3 sm:flex-row justify-end items-center sm:space-x-6 pt-3">
            <select
                value={table.getState().pagination.pageSize}
                onChange={(e) => {
                    table.setPageSize(Number(e.target.value));
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block mt-3 p-1.5 pr-8 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                {[5, 10, 20, 30, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </select>
            <span className="flex items-center gap-1">
                <div>Page</div>
                <strong>
                    {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </strong>
            </span>
            <div className="flex items-center space-x-2">
                <button
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className={buttonClass}>
                    <BiChevronsLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => {
                        table.previousPage();
                    }}
                    disabled={!table.getCanPreviousPage()}
                    className={buttonClass}>
                    <BiChevronLeft className="w-5 h-5" />
                </button>
                <button
                    onClick={() => {
                        table.nextPage();
                    }}
                    disabled={!table.getCanNextPage()}
                    className={buttonClass}>
                    <BiChevronRight className="w-5 h-5" />
                </button>
                <button
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className={buttonClass}>
                    <BiChevronsRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}
