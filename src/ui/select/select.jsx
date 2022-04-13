import Select from 'react-select';


const MultiSelect = ({label,multi,options,handleChangeSelect,name}) => {
return(
  <>
 
  <Select
    placeholder = {label}
    options={options}
    className="basic-multi-select"
    classNamePrefix="select"
    onChange ={(event) => handleChangeSelect(event,name)}
    isMulti = {multi}
   
/>
  </>
)


}

export default MultiSelect