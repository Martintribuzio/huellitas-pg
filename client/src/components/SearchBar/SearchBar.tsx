import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getPosts } from '../../redux/actions';
import { typeState } from '../../redux/reducers';
import { getPostByQuery } from '../../redux/actions';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    dispatch(getPostByQuery(search));
  }, [search]);

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
          className='barrita'
          placeholder='Search game'
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
