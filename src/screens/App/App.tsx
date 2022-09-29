import { useEffect, useState } from 'react';
import CustomTable from '../../components/custom-table/CustomTable';
import { DataTable } from '../../components/custom-table/CustomTable.types';
import './App.css';
import { useQuery, gql } from '@apollo/client';
import SearchInput from '../../components/search-input/SearchInput';
import Spinner from '../../components/spinner/Spinner';


const DEFAULT_USER_DATA = gql`
query {
  launchesPast( sort: "launch_date_utc", order: "desc") {
    mission_name,
    # description,
    launch_date_utc,
    launch_site {
      site_name_long
    }
    rocket{
      rocket_name
    }
    
  }
}
`

function App() {
  const [dataTable, setDataTable] = useState<DataTable>({
    elementsPerPage: 10,
    source: []
  })

  const [dataForSearch, setDataForSearch] = useState({
    filterFields: ['mission_name', 'launch_date_utc', 'rocket_name', 'launch_site'],
    source: [],
  })

  function fillSourceTable(data: any) {
    console.log('received event: ', data);
    
    setDataTable({
      ...dataTable,
      source: data || []
    });
  }

  const {data, error, loading} = useQuery(DEFAULT_USER_DATA)

  useEffect(() => {
    if(!data) return;

    let flattedArray = data.launchesPast.map((item: any) => {
      return { 
        mission_name: item.mission_name,
        launch_date_utc: item.launch_date_utc,
        rocket_name: item.rocket.rocket_name,
        launch_site: item.launch_site.site_name_long
      }
    })

    //FILL TABLE COMPONENT
    setDataTable({
      ...dataTable,
      source: flattedArray
    })

    //FILL SEARCH COMPONENT
    setDataForSearch({
      ...dataForSearch,
      source: flattedArray
    })    
  }, [data]);

  return (
    <div className="bg-slate-100 h-screen px-20 pt-10 2xl:pt-10 relative">
      {loading && <div className='absolute center-spinner'><Spinner/></div>}
      {
        data &&
        <div className="w-full flex flex-col gap-y-5">
          <SearchInput onChange={fillSourceTable} dataForSearch={dataForSearch} />
          <CustomTable dataTable={dataTable} />
        </div>
      }
    </div>
  );
}

export default App;
