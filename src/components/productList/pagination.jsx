
export default function Pagination ({ itemsPerPage, totalItems, paginate }) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className='pagination-style'>
            {
                pageNumbers.map(number => (
                    <button  key={number} onClick={() => paginate(number)}>{number}</button>
                ))
            }
        </div>
    )
}