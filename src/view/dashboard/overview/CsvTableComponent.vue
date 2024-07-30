<template>
  <div v-if="csvData.length">
    <table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in csvData" :key="index">
          <td v-for="(cell, key) in row" :key="key">{{ cell }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    No data available
  </div>
</template>

<script>
export default {
  name: 'CsvTableComponent',
  props: {
    csvData: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    headers() {
      return this.csvData.length ? Object.keys(this.csvData[0]) : [];
    },
  },
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
</style>
