function SearchInput(props: any) {
    let optionsFiltered: [];

    function onKeySearch(event: any) {
        if (event.target.value) {
            const keys = props.dataForSearch.filterFields;

            optionsFiltered = props.dataForSearch.source.filter((item: any) => isInsideObject(keys, item, event.target.value))

        } else {
            optionsFiltered = props.dataForSearch.source;     
        }
        
        //Emit Event
        props.onChange(optionsFiltered)
    }


    function searchWordsInText(text: any, word: any) {
      if(text && word){
        if (text.toString().toLowerCase().trim().search(word.toString().toLowerCase().trim()) < 0) return false
        return true
      }
    }
    
    //ITERATE KEYS ARRAY CHECKING IF INPUT TEXT IS INSIDE THE CURRENT OBJECT
    function isInsideObject(keys: any, obj: any, value: any) {
        let txtMatch: any = false
        let i = 0

        while(i < keys.length) {
          txtMatch = txtMatch || searchWordsInText(obj[keys[i]], value)
          if(txtMatch) {
            i = keys.length
          } else {
            i++
          }
        }

        return txtMatch
    }

    return (
        <input
            onChange={onKeySearch}
            className="
            text-slate-800 text-sm
            resize-none
            p-2
            w-full
            rounded-lg
            border-2 border-slate-400
            bg-white
            focus:outline-blue-500
            "
            placeholder="Search..."
        />
    );
}

export default SearchInput;