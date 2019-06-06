import React from 'react';
import ReactPaginate from 'react-paginate';
import "./style.css";

const Pagination = ({setting, handleClick}) => {
  return (
    <ReactPaginate
      previousLabel={"Previous"}
      nextLabel={"Next"}
      breakLabel={'...'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      pageCount={setting.totalPage}
      forcePage={setting.selected}
      marginPagesDisplayed={setting.marginPages || 3}
      pageRangeDisplayed={setting.pageRange || 3}
      onPageChange={handleClick}
      containerClassName={'pagination pagination-md'}
      subContainerClassName={'page-item'}
      activeClassName={'active'}
      pageLinkClassName={'page-link'}
      pageClassName={'page-item'}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      disabledClassName={'disabled'}
    />
  );
}

export default Pagination;
