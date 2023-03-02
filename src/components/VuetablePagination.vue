<template>
  <div
    v-show="tablePagination && lastPage > firstPage"
    :class="customCss.wrapperClass"
  >
    <nav class="flex items-center justify-between px-4 sm:px-0">
      <div class="-mt-px flex w-0 flex-1">
        <a @click="loadPage('prev')" :class="[
        'btn-nav',
        customCss.linkClass,
        isOnFirstPage ? customCss.disabledClass : ''
      ]">
          <svg class="mr-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z" clip-rule="evenodd"></path>
          </svg>
          Previous
        </a>
      </div>

      <div class="hidden md:-mt-px md:flex">
        <template v-if="notEnoughPages">
          <a
            v-for="(n, i) in totalPage" :key="i"
            @click="loadPage(i + firstPage)"
            :class="[!isCurrentPage(i + firstPage) ? customCss.pageClass : customCss.activeClass]"
            v-html="n"
          >
          </a>
        </template>
        <template v-else>
          <a
            v-for="(n, i) in windowSize" :key="i"
            @click="loadPage(windowStart + i + firstPage - 1)"
            :class="[!isCurrentPage(windowStart + i + firstPage - 1) ? customCss.pageClass : customCss.activeClass]"
            v-html="windowStart + n - 1"
          >
          </a>
        </template>
      </div>

      <div class="-mt-px flex w-0 flex-1 justify-end">
        <a @click="loadPage('next')" :class="[
        'btn-nav',
        customCss.linkClass,
        isOnLastPage ? customCss.disabledClass : ''
      ]">
          Next
          <svg class="ml-3 h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z" clip-rule="evenodd"></path>
          </svg>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import PaginationMixin from "./VuetablePaginationMixin.vue";

export default {
  mixins: [PaginationMixin]
};
</script>
