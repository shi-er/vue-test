<template>

</template>
<script>
  export default {
    name: "editUserRole",
    props: {
      rowId: Number,
    },
    data() {
      return {
        form: {},
      };
    },
    methods: {
      handleSubmit(data) {
        // 提交数据
        this.$emit('closeDialog', JSON.parse(JSON.stringify(this.rowData)));
      },
      cancleDialog() {
        this.$emit('closeDialog', 'cancel');
      },
    },
    created() {
    },
  }
</script>

<style scoped>

</style>
