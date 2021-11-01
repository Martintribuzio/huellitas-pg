import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPostByQuery } from '../../redux/actions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(getPostByQuery(search));
  }, [dispatch, search]);

  function handleChange(e: any) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit() {
    setSearch('');
  }

  return (
    <>
      <div>
        <input
          type='text'
          placeholder='Buscar post'
          value={search}
          onChange={handleChange}
        />
        <button onSubmit={handleSubmit} type='submit'>
          Search
        </button>
      </div>
    </>
  );
}
