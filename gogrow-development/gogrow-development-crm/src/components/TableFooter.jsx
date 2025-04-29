const TableFooter = ({
  total = 1,
  from = 1,
  to = 1,
  totalPages = 1,
  currentPage = 1,
  next,
  previous,
  loading,
}) => {
  return (
    <section className="flex items-center w-full bg-gray-50  ">
      <div className="w-full      ">
        <div className="relative overflow-hidden bg-white   ">
          <nav
            className="flex flex-col items-start justify-between px-4 py-1 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation">
            <span className="text-sm font-normal text-gray-500  ">
              Showing{" "}
              <span className="font-semibold text-gray-900  ">
                {from}-{to}
              </span>{" "}
              of <span className="font-semibold text-gray-900  ">{total}</span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <button
                  disabled={loading}
                  onClick={previous}
                  className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700    ">
                  <span className="sr-only">Previous</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </li>
              {/* total pages */}
              <li>
                <button
                  disabled={loading}
                  className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                  {currentPage}
                </button>
              </li>

              {/* current page */}
              <li>
                <div className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                  -
                </div>
              </li>
              <li>
                <div className="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                  {totalPages}
                </div>
              </li>
              <li>
                <button
                  disabled={loading}
                  onClick={next}
                  className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
                  <span className="sr-only">Next</span>
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default TableFooter;
