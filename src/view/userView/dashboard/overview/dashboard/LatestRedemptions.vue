<template>
  <div class="full-width-table">
    <sdCards title="Latest Redemptions">
      <TableDefaultStyle class="ninjadash-having-header-bg">
        <div class="latest-transections-table table-responsive">
          <a-table
            :columns="productColumns"
            :dataSource="productTableData"
            :pagination="false"
          />
        </div>
      </TableDefaultStyle>
    </sdCards>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { TableDefaultStyle } from "../../../../styled";

import transections from "@/demoData/transections.json";

const productColumns = [
  {
    dataIndex: "info",
    key: "info",
  },
  {
    dataIndex: "amount",
    key: "amount",
  },
];

export default defineComponent({
  components: { TableDefaultStyle },
  setup() {
    const productTab = ref("today");

    /* Tab Activation */
    const handleTabActivation = (value, event) => {
      event.preventDefault();
      productTab.value = value;
    };

    const productTableData = computed(() =>
      transections[productTab.value].map((value) => {
        const {
          key,
          paymentMethod,
          duration,
          amount,
          icon,
          style,
          paymentType,
        } = value;
        return {
          key,
          info: (
            <div class="transection-single__details">
              <span
                class={`transection-single__icon transection-single__icon--${style}`}
              >
                <unicon name={icon}></unicon>
              </span>
              <span class="transection-single__info">
                <strong>{paymentMethod}</strong>
                <span>{duration}</span>
              </span>
            </div>
          ),
          amount:
            paymentType === "credit" ? (
              <div class="transection-single__amount transection-single__amount--credited">
                <span>{amount} points</span>
              </div>
            ) : (
              <div class="transection-single__amount transection-single__amount--debited">
                <span>{amount} points</span>
              </div>
            ),
        };
      })
    );

    return {
      productColumns,
      handleTabActivation,
      productTableData,
      productTab,
    };
  },
});
</script>