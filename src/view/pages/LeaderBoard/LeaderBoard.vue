<template>
  <div>
    <ChartStyle>
    <a-row  :gutter="25">
        <a-col  :lg="20" >
            <Banner5 title="Our Employee Of The Month For July Is John Dash" description="Completed his task earlier than other agents and earned 300 extra points" buttonText="View Profile"/>
        </a-col>
        <a-col :lg="12" :xs="24">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default> <BestSeller /> </template>
          </Suspense>
        </a-col>


        
        <a-col :lg="8">
         
              <Suspense>
              <template #fallback>
                <sdCards headless>
                  <a-skeleton active />
                </sdCards>
              </template>
              <template #default> <PerformanceOverview />
              </template>
            </Suspense>
          </a-col>
        
    </a-row>
  </ChartStyle>
</div>
</template>
  
  <script>
  
  import { defineAsyncComponent, defineComponent } from "vue";
import { Banner5 } from "../../../components/banners/Banners.vue";
import BestSeller from './overview/BestSeller.vue';
// import {PerformanceOverview} from './overview/PerformanceOverview.vue';
import {ChartStyle} from './overview/style'; 

const PerformanceOverview = defineAsyncComponent(()=>
import("./overview/PerformanceOverview.vue"));



  
    

  export default defineComponent({
    name: "LeaderBoard",
    components: {
      Banner5,
      BestSeller,
      PerformanceOverview,
      ChartStyle,
    },
    setup() {
      return {
       
      }
    }
  });
  </script>