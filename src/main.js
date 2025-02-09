/* eslint-disable no-useless-escape */
/* eslint-disable no-fallthrough */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
// @ts-ignore
// import Vue from "vue";

// # Import: CreateApp via Vue ESM Bundler
import {createApp} from 'vue';
import Vuetable from "./components/Vuetable.vue";
import VuetablePagination from "./components/VuetablePagination.vue";
import VuetablePaginationDropdown from "./components/VuetablePaginationDropdown.vue";
import VuetablePaginationInfo from "./components/VuetablePaginationInfo.vue";
import axios from "axios";

import VuetableFieldCheckbox from "./components/VuetableFieldCheckbox.vue";
import VuetableFieldHandle from "./components/VuetableFieldHandle.vue";
import VuetableFieldSequence from "./components/VuetableFieldSequence.vue";
import CustomCell from "./examples/CustomCell.vue";

const app = createApp({});

app.component("vuetable-field-checkbox", VuetableFieldCheckbox);
app.component("vuetable-field-handle", VuetableFieldHandle);
app.component("vuetable-field-sequence", VuetableFieldSequence);

const E_SERVER_ERROR = "Error communicating with the server";

app.component("custom-actions", {
  template: [
    "<div>",
    '<button class="ui red button" @click="onClick(\'view-item\', rowData)"><i class="zoom icon"></i></button>',
    '<button class="ui blue button" @click="onClick(\'edit-item\', rowData)"><i class="edit icon"></i></button>',
    '<button class="ui green button" @click="onClick(\'delete-item\', rowData)"><i class="delete icon"></i></button>',
    "</div>"
  ].join(""),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick(action, data) {
      console.log("actions: on-click", data.name);
      // sweetAlert(action, data.name);
    }
  }
});

app.component("my-detail-row", {
  template: [
    '<div @click="onClick">',
    '<div class="inline field">',
    "<label>Name: </label>",
    "<span>{{rowData.name}}</span>",
    "</div>",
    '<div class="inline field">',
    "<label>Email: </label>",
    "<span>{{rowData.email}}</span>",
    "</div>",
    '<div class="inline field">',
    "<label>Nickname: </label>",
    "<span>{{rowData.nickname}}</span>",
    "</div>",
    '<div class="inline field">',
    "<label>Birthdate: </label>",
    "<span>{{rowData.birthdate}}</span>",
    "</div>",
    '<div class="inline field">',
    "<label>Gender: </label>",
    "<span>{{rowData.gender}}</span>",
    "</div>",
    "</div>"
  ].join(""),
  props: {
    rowData: {
      type: Object,
      required: true
    }
  },
  methods: {
    onClick(event) {
      console.log("my-detail-row: on-click", event.target);
    }
  }
});

app.component("settings-modal", {
  template: `
    <div class="ui small modal" id="settingsModal">
      <div class="header">Settings</div>
      <div class="content ui form">
        <div class="field">
          <div class="ui checkbox">
            <input type="checkbox" v-model="$parent.multiSort">
            <label>Multisort (use Alt+Click)</label>
          </div>
        </div>
        <div class="inline fields">
          <div class="field">
            <div class="ui checkbox">
              <input type="checkbox" checked="$parent.tableHeight" @change="setTableHeight($event)">
              <label>Table Height</label>
            </div>
          </div>
          <div class="field">
            <input type="text" v-model="$parent.tableHeight">
          </div>
        </div>
        <div class="ui divider"></div>
        <div class="field">
          <label>Pagination:</label>
          <select class="ui simple dropdown" v-model="$parent.paginationComponent">
            <option value="vuetable-pagination">vuetable-pagination</option>
            <option value="vuetable-pagination-dropdown">vuetable-pagination-dropdown</option>
          </select>
        </div>
        <div class="field">
          <label>Per Page:</label>
          <select class="ui simple dropdown" v-model="$parent.perPage">
            <option :value="10">10</option>
            <option :value="15">15</option>
            <option :value="20">20</option>
            <option :value="25">25</option>
          </select>
        </div>
        <div class="ui fluid card">
          <div class="content">
            <div class="header">Visible fields</div>
          </div>
          <div v-if="vuetableFields" class="content">
            <div v-for="(field, idx) in vuetableFields" class="field">
              <div class="ui checkbox">
                <input type="checkbox" :checked="field.visible" @change="toggleField(idx, $event)">
                <label>{{ getFieldTitle(field) }}</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="actions">
        <div class="ui cancel button">Close</div>
      </div>
    </div>
  `,
  props: ["vuetableFields", "fieldPrefix"],
  data() {
    return {};
  },
  methods: {
    getFieldTitle(field) {
      if (typeof field.title === "function") return field.title(true);

      let title = field.title;
      if (title !== "") return this.stripHTML(title);

      title = "";
      if (field.name.slice(0, 2) === this.fieldPrefix) {
        title =
          field.name.indexOf(":") >= 0
            ? field.name.split(":")[1]
            : field.name.replace(this.fieldPrefix, "");
      }

      return title;
    },
    stripHTML(str) {
      return str ? str.replace(/(<([^>]+)>)/gi, "") : "";
    },
    toggleField(index, event) {
      console.log("toggleField: ", index, event.target.checked);
      this.$parent.$refs.vuetable.toggleField(index);
    },
    setTableHeight(event) {
      if (event.target.checked) {
        this.$parent.tableHeight = "600px";
        return;
      }

      this.$parent.tableHeight = null;
    }
  }
});

const langDefault = {
  nickname: "Nickname",
  birthdate: "Birthdate"
};

const dataFields = ["__checkbox","name", "email", "phone"];

const mainTemplate = `
<div class="ui vertical segment">
<div class="ui container">

  <div id="app" class="ui vertical stripe segment">

        <div id="content" class="ui basic segment">

            <h3 class="ui header">List of Users</h3>

            <div class="ui grid">
                <vuetable
                  api-url="https://my-json-server.typicode.com/mannyyang/vuetable-3/users"
                  pagination-path=""
                  data-path=""
                  :fields="fields"
                >
                </vuetable>
            </div><!-- ui grid -->


            <settings-modal ref="settingsModal"
              :vuetable-fields="vuetableFields"
              :field-prefix="fieldPrefix"
            ></settings-modal>

          </div><!-- content -->

      </div><!-- app -->
  </div><!-- ui container -->

</div>
`;

/* eslint-disable no-new */
const vm = createApp({
  components: {
    Vuetable,
    VuetablePagination,
    VuetablePaginationDropdown,
    VuetablePaginationInfo
  },
  template: mainTemplate,
  setup() {
    const loading = "";
    const searchFor = "";
    const moreParams = {};
    const fields = dataFields;
    const tableHeight = "600px";
    const vuetableFields = false;
    const fieldPrefix = "vuetable";
    const sortOrder = [
      {
        field: "name",
        direction: "asc"
      }
    ];
    const multiSort = true;
    const paginationComponent = "vuetable-pagination";
    const perPage = 10;
    const paginationInfoTemplate =
      "Showing record: {from} to {to} from {total} item(s)";
    const lang = langDefault;
    return {
      loading,
      searchFor,
      moreParams,
      fields,
      tableHeight,
      vuetableFields,
      fieldPrefix,
      sortOrder,
      multiSort,
      paginationComponent,
      perPage,
      paginationInfoTemplate,
      lang,
    }
  },
  watch: {
    perPage(val, oldVal) {
      this.$nextTick(function() {
        this.$refs.vuetable.refresh();
      });
    },
    paginationComponent(val, oldVal) {
      this.$nextTick(function() {
        this.$refs.pagination.setPaginationData(
          this.$refs.vuetable.tablePagination
        );
      });
    }
  },
  methods: {
    transform(data) {
      const transformed = {};
      transformed.pagination = {
        total: data.total,
        per_page: data.per_page,
        current_page: data.current_page,
        last_page: data.last_page,
        next_page_url: data.next_page_url,
        prev_page_url: data.prev_page_url,
        from: data.from,
        to: data.to
      };

      transformed.data = [];
      data = data.data;
      for (let i = 0; i < data.length; i++) {
        transformed["data"].push({
          id: data[i].id,
          name: data[i].name,
          nickname: data[i].nickname,
          email: data[i].email,
          age: data[i].age,
          birthdate: data[i].birthdate,
          gender: data[i].gender,
          address:
            data[i].address.line1 +
            " " +
            data[i].address.line2 +
            " " +
            data[i].address.zipcode
        });
      }

      return transformed;
    },
    showSettingsModal() {
      const self = this;
      $("#settingsModal")
        .modal({
          detachable: true,
          onVisible() {
            $(".ui.checkbox").checkbox();
          }
        })
        .modal("show");
    },
    showLoader() {
      this.loading = "loading";
    },
    hideLoader() {
      this.loading = "";
    },
    setFilter() {
      this.moreParams.filter = this.searchFor;
      this.$nextTick(function() {
        this.$refs.vuetable.refresh();
      });
    },
    resetFilter() {
      this.searchFor = "";
      this.setFilter();
    },
    preg_quote(str) {
      // http://kevin.vanzonneveld.net
      // +   original by: booeyOH
      // +   improved by: Ates Goral (http://magnetiq.com)
      // +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
      // +   bugfixed by: Onno Marsman
      // *     example 1: preg_quote("$40");
      // *     returns 1: '\$40'
      // *     example 2: preg_quote("*RRRING* Hello?");
      // *     returns 2: '\*RRRING\* Hello\?'
      // *     example 3: preg_quote("\\.+*?[^]$(){}=!<>|:");
      // *     returns 3: '\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:'

      return (str + "").replace(
        /([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!\<\>\|\:])/g,
        "\\$1"
      );
    },
    highlight(needle, haystack) {
      return haystack.replace(
        new RegExp("(" + this.preg_quote(needle) + ")", "ig"),
        '<span class="highlight">$1</span>'
      );
    },
    rowClassCB(data, index) {
      return index % 2 === 0 ? "odd" : "even";
    },
    /*
     * Example of defining queryParams as a function
     */
    // queryParams (sortOrder, currentPage, perPage) {
    //   return {
    //     'sort': sortOrder[0].field + '|' + sortOrder[0].direction,
    //     'order': sortOrder[0].direction,
    //     'page': currentPage,
    //     'per_page': perPage
    //   }
    // },
    onCellClicked(data, field, event) {
      console.log("cellClicked", field.name);
      if (field.name !== this.fieldPrefix + "actions") {
        this.$refs.vuetable.toggleDetailRow(data.id);
      }
    },
    onCellDoubleClicked(data, field, event) {
      console.log("cellDoubleClicked:", field.name);
    },
    onCellRightClicked(data, field, event) {
      console.log("cellRightClicked:", field.name);
    },
    onLoadSuccess(response) {
      // set pagination data to pagination-info component
      this.$refs.paginationInfo.setPaginationData(response.data);

      const data = response.data.data;
      if (this.searchFor !== "") {
        for (const n in data) {
          data[n].name = this.highlight(this.searchFor, data[n].name);
          data[n].email = this.highlight(this.searchFor, data[n].email);
        }
      }
    },
    onLoadError(response) {
      if (response.status == 400) {
        sweetAlert("Something's Wrong!", response.data.message, "error");
      } else {
        sweetAlert("Oops", E_SERVER_ERROR, "error");
      }
    },
    onPaginationData(tablePagination) {
      this.$refs.paginationInfo.setPaginationData(tablePagination);
      this.$refs.pagination.setPaginationData(tablePagination);
    },
    onChangePage(page) {
      this.$refs.vuetable.changePage(page);
    },
    onInitialized(fields) {
      console.log("onInitialized", fields);
      this.vuetableFields = fields;
    },
    onDataReset() {
      console.log("onDataReset");
      this.$refs.paginationInfo.resetData();
      this.$refs.pagination.resetData();
    },
    onActionClicked(action, data) {
      console.log("slot actions: on-click", data.name);
      sweetAlert(action, data.name);
    },
    onFieldEvent(type, payload, vuetable) {
      if (type === "checkbox-toggled") {
        vuetable.onCheckboxToggled(
          payload.isChecked,
          payload.field,
          payload.dataItem
        );
      } else if (type === "checkbox-toggled-all") {
        vuetable.onCheckboxToggledAll(payload.isChecked, payload.field);
      }
    },
    onHeaderEvent(type, payload) {
      console.log("onHeaderEvent:", type, payload);
      const vuetable = this.$refs.vuetable;
      switch (type) {
        case "order-by":
          vuetable.orderBy(payload.field, payload.event);
          break;
        case "refresh":
          vuetable.refresh();
          break;
        case "add-sort-column":
          vuetable.addSortColumn(payload.field, payload.direction);
          break;
        case "remove-sort-column":
          vuetable.removeSortColumn(payload.index);
          break;
        case "set-sort-column":
          vuetable.setSortColumnDirection(payload.index, payload.direction);
          break;
        case "clear-sort-column":
          vuetable.clearSortOrder();
          break;
        case "toggle-row":
          vuetable.onCheckboxToggled(
            payload.isChecked,
            payload.field,
            payload.dataItem
          );
          break;
        case "toggle-all-rows":
          vuetable.onCheckboxToggledAll(payload.isChecked, payload.field);
          break;
        case "filter":
          vuetable.break;
        default:
          console.log("Unhandled event: ", type, payload);
      }
    }
  }
});
vm.mount("#app");
