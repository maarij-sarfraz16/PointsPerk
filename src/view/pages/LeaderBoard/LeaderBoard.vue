<template>
 <div>
    <a-row>

        <a-col :lg="24" :md="24" :sm="24">
            <Banner5 title="Our Employee Of The Month For July Is John Dash" description="Completed his task earlier than other agents and earned 300 extra points" buttonText="View Profile"/>
        </a-col>
    </a-row>
 </div>
</template>
  
  <script>
  
  import { defineComponent } from "vue";
import { Banner5 } from "../../../components/banners/Banners.vue";



  
    

  export default defineComponent({
    name: "RedemptionHistory",
    components: {
      Banner5,
    },
    setup() {
      return {
       
      }
    }
  });
  </script>