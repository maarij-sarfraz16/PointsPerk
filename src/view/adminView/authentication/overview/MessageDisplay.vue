<template>
  <div>
    <Alerts>
      <sdAlerts
        v-if="type === 'success'"
        :outlined="false"
        :closable="true"
        :showIcon="true"
        message=""
        :description="message"
        type="success"
      />
      <sdAlerts
        v-if="type === 'error'"
        :outlined="false"
        :closable="true"
        :showIcon="true"
        message=""
        :description="message"
        type="error"
      />
    </Alerts>
  </div>
</template>

<script>
import { Alerts } from '../style';

export default {
  name: 'MessageDisplay',
  components: { Alerts },
  props: {
    type: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
};
</script>
