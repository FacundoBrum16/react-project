
import { useEffect, useState } from 'react';
import { TableProps } from './CustomTable.types'
import nextButton from '../../assets/icons/next-icon.svg';
import previousButton from '../../assets/icons/previous-icon.svg'


function CustomTable({ dataTable }: TableProps) {
    useEffect(() => {
        getPageData(1)
    }, [dataTable.source]);

    let [paginatedSource, setSource] = useState<any[]>([]);
    let [currentPage, setCurrentPage] = useState(1)

    function getArrayKeys() {
        return Object.keys(dataTable.source[0] || []);
    }

    function amountOfPages() {
        return Math.ceil(
            dataTable.source.length / dataTable.elementsPerPage
        );
    }

    function getPageData(nroPagina: number) {
        setSource([])
        setCurrentPage(nroPagina)
        let start =
            nroPagina * dataTable.elementsPerPage -
            dataTable.elementsPerPage;
        let end = nroPagina * dataTable.elementsPerPage;
        setSource(dataTable.source.slice(start, end))
    }

    function getPreviousPage() {
        if (currentPage > 1) {
            setCurrentPage(currentPage--);
        }
        getPageData(currentPage);
    }

    function getNextPage() {
        if (currentPage < amountOfPages()) {
            setCurrentPage(currentPage++);

        }
        getPageData(currentPage);
    }


    return (
        <div
            className="pb-16 relative px-6 pt-3 rounded-2xl bg-white shadow-table-shadow"
        >
            <div className="overflow-x-auto relative max-w-full">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-slate-500 font-semibold">
                        <tr>
                            {getArrayKeys().map((th, index) => (
                                <th key={index} className="py-3 px-6 border-b pb-6">
                                    <span>{th}</span>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedSource.map((tr: any, index: number) => (
                            <tr key={index} className="bg-white border-b text-slate-800 font-normal">
                                {getArrayKeys().map((td, index) => (
                                    <td key={index} className="py-4 px-6 truncate">
                                        {tr[td]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>


            <div className="h-16 absolute bottom-0 right-0 flex items-center px-6 w-full">
                <div
                    className="
          gap-x-8
          items-center
          bottom-0
          right-0
          w-full
          flex
          justify-end
          text-slate-500
          font-light
        "
                >
                    <span>Page {currentPage} of {amountOfPages()}</span>
                    <button className="flex items-center" onClick={getPreviousPage}>
                        <img className="w-3 h-3" src={previousButton} alt="" />
                    </button>
                    <button className="flex items-center" onClick={getNextPage}>
                        <img className="w-3 h-3" src={nextButton} alt="" />
                    </button>
                </div>
            </div>


        </div>
    );
}

export default CustomTable;