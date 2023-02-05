export default {
  table: {
    tableWrapper: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
    thead: "bg-gray-50",
    tbody: "divide-y divide-gray-200 bg-white",
    table: "min-w-full divide-y divide-gray-300",
    th: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
    loadingClass: "loading",
    ascendingIcon: "blue chevron up icon",
    descendingIcon: "blue chevron down icon",
    ascendingClass: "sorted-asc",
    descendingClass: "sorted-desc",
    sortableIcon: "grey sort icon",
    handleIcon: "grey sidebar icon"
  },

  pagination: {
    wrapperClass: "",
    activeClass: "inline-flex items-center hover:cursor-pointer border-0 border-t-2 border-primary-500 px-4 pt-4 text-sm font-medium text-primary-600",
    disabledClass: "disabled",
    pageClass: "inline-flex items-center hover:cursor-pointer border-0 border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
    linkClass: "inline-flex items-center hover:cursor-pointer border-0 border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700",
  },

  paginationInfo: {
    infoClass: "flex justify-between items-start"
  }
};
