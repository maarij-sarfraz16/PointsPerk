<template>
  <sdPageHeader
    title="Leader Board"
    class="ninjadash-page-header-main"
    :routes="pageRoutes"
  ></sdPageHeader>

  <Main>
    <ChartStyle>
      <a-row :gutter="44">
        <a-col :lg="24" >
            <Banner5 title="Our Employee Of The Month For July Is John Dash" description="Completed his task earlier than other agents and earned 300 extra points" buttonText="View Profile"/>
        </a-col>

        <a-col :lg="16" :xs="24">
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
          <sdCards title="For Your Motivation">
            <CarouselStyleWraper>
              <div>
                  <!-- <a-radio-group
                  v-model:value="dotPosition"
                  style="margin-bottom: 8px"
                >
                  <a-radio-button value="top">Top</a-radio-button>
                  <a-radio-button value="bottom">Bottom</a-radio-button>
                  <a-radio-button value="left">Left</a-radio-button>
                  <a-radio-button value="right">Right</a-radio-button>
                </a-radio-group>  -->
                <a-carousel dot-position="right">
                  <div><h3>1</h3></div>
                  <div><h3>2</h3></div>
                  <div><h3>3</h3></div>
                  <div><h3>4</h3></div>
                </a-carousel>
              </div>
            </CarouselStyleWraper>
          </sdCards>
        </a-col>

        <a-col :lg="16">
          <Suspense>
            <template #fallback>
              <sdCards headless>
                <a-skeleton active />
              </sdCards>
            </template>
            <template #default>
              <MonthlyEarning />
            </template>
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
  </Main>

</template>
  
<script>
  import { defineAsyncComponent, defineComponent } from "vue";
  import { Banner5 } from "../../../components/banners/Banners.vue";
  import BestSeller from './overview/BestSeller.vue';
  // import {PerformanceOverview} from './overview/PerformanceOverview.vue';
  import {ChartStyle} from './overview/style'; 
  import { Main } from "../../styled";
  import {CarouselStyleWraper} from './overview/ui-elements-styled';

  const PerformanceOverview = defineAsyncComponent(()=>
  import("./overview/PerformanceOverview.vue"));
  const MonthlyEarning = defineAsyncComponent(() =>
    import("./overview/MonthlyEarning.vue")
  );

  export default defineComponent({
    name: "LeaderBoard",
    components: {
      Banner5,
      BestSeller,
      PerformanceOverview,
      ChartStyle,
      MonthlyEarning,
      Main,
      CarouselStyleWraper,
    },
    setup() {

      const pageRoutes = [
        {
          path: "/",
          breadcrumbName: "Dashboard",
        },
        {
          path: "",
          breadcrumbName: "Leader Board",
        },
      ];

      return {
        pageRoutes
      }
    }
  });
</script>