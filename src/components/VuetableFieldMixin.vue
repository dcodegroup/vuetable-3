<script>
export default {
  props: {
    rowData: {
      type: Object,
      default: null
    },
    rowIndex: {
      type: Number
    },
    rowField: {
      type: Object
    },
    isHeader: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
  },
  computed: {
    vuetable() {
      //cover for both header and row
      return this.$parent.vuetable || this.$parent.$parent.vuetable;
    }
  }
};
</script>
