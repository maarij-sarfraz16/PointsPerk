<template>
  <Main>
    <doMain>
      <a-row justify="center" :gutter="25">
        <a-col :lg="12" :md="24" :sm="24">
          <sdCards>
            <Alerts message="kjdshfkjdshf"></Alerts>
          </sdCards>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
          <sdCards>
            <Alerts message="kjdshfkjdshf"></Alerts>
          </sdCards>
        </a-col>
      </a-row>
      <a-row justify="center" :gutter="25">
        <a-col :lg="12" :md="24" :sm="24">
          <sdCards>
            <Alerts message="kjdshfkjdshf"></Alerts>
          </sdCards>
        </a-col>
        <a-col :lg="12" :md="24" :sm="24">
          <sdCards>
            <Alerts message="kjdshfkjdshf"></Alerts>
          </sdCards>
        </a-col>
      </a-row>
    </doMain>
  </Main>
</template>

<script>
import { defineComponent } from "vue";
import Alerts from "@/components/cards/alerts/Alerts.vue";
import { doMain } from "./style";
import { Main } from "../../styled";
export default defineComponent({
  name: "hassan",
  components: {
    Alerts,
    doMain,
    Main,
  },
});
</script>
