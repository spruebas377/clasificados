import { memo, useState, useCallback } from 'react'

function SearchBar({ onSearch, className = '', placeholder = 'Buscar por título, descripción o categoría...' }) {
  const [term, setTerm] = useState('')

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    onSearch(term)
  }, [onSearch, term])

  return (
    <form className={`search-bar ${className}`} onSubmit={handleSubmit}>
      <button type="submit" className="search-bar__btn" aria-label="Buscar" title="Buscar">
        <i className="fas fa-search"></i>
      </button>
      <input
        type="text"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder={placeholder}
      />
    </form>
  )
}

export default memo(SearchBar)
