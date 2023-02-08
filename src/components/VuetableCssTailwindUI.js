export default {
  table: {
    tableWrapper: "overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg",
    thead: "bg-gray-50",
    tbody: "divide-y divide-gray-200 bg-white",
    table: "min-w-full divide-y divide-gray-300",
    th: "px-3 py-3.5 text-left text-sm font-semibold text-gray-900",
    ascendingIcon: '<svg fill="#2185d0" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n' +
      '  <path clip-rule="evenodd" fill-rule="evenodd" d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"></path>\n' +
      '</svg>',
    descendingIcon: '<svg fill="#2185d0" viewBox="0 0 24 24" width="14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n' +
      '  <path clip-rule="evenodd" fill-rule="evenodd" d="M11.47 7.72a.75.75 0 011.06 0l7.5 7.5a.75.75 0 11-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 01-1.06-1.06l7.5-7.5z"></path>\n' +
      '</svg>',
    ascendingClass: "sorted-asc",
    descendingClass: "sorted-desc",
    sortableIcon: "grey sort icon",
    handleIcon: "grey sidebar icon",
    renderIcon: (classes, options, field) => {
      console.log(classes, options, field)
      if (classes.length > 1 && classes[1].includes('svg')) {
        return classes[1]
      }

      return '<svg fill="currentColor" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">\n' +
        '  <path clip-rule="evenodd" fill-rule="evenodd" d="M11.47 4.72a.75.75 0 011.06 0l3.75 3.75a.75.75 0 01-1.06 1.06L12 ' +
        '6.31 8.78 9.53a.75.75 0 01-1.06-1.06l3.75-3.75zm-3.75 9.75a.75.75 0 011.06 0L12 17.69l3.22-3.22a.75.75 0 111.06 1.06l-3.75' +
        ' 3.75a.75.75 0 01-1.06 0l-3.75-3.75a.75.75 0 010-1.06z"></path>\n' +
        '</svg>'
    }
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
