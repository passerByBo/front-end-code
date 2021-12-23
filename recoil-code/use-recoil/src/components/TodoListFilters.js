import {useRecoilState} from 'recoil';
import {todoListFilterState} from '../stores/todoListFilterState';

export default function TodoListFilters() {
    const [filter, setFilter] = useRecoilState(todoListFilterState);
  
    const updateFilter = ({target: {value}}) => {
        console.log(value)
      setFilter(value);
    };
  
    return (
      <>
        Filter:
        <select value={filter} onChange={updateFilter}>
          <option value="Show All">All</option>
          <option value="Show Completed">Completed</option>
          <option value="Show Uncompleted">Uncompleted</option>
        </select>
      </>
    );
  }

 