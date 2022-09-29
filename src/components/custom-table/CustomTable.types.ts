
export interface TableProps {
    dataTable: DataTable
}

export interface DataTable {
    elementsPerPage: number,
    source: any[],
}