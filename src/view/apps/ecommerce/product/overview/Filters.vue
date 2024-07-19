<template>
  <Sidebar>
    <sdCards>
      <template #title>
        <span>
          <unicon name="sliders-v" width="14"></unicon>
          Filters
        </span>
      </template>
      <SidebarSingle>
        <sdHeading as="h5">Price Range</sdHeading>
        <Slider
          @onChange="onChange"
          range
          :step="10"
          :min="0"
          :max="max"
          :defaultValues="[min, max]"
        />
        <p class="price-range-text">${{ min }} - ${{ max }}</p>
      </SidebarSingle>
      <SidebarSingle>
        <sdHeading as="h5">Category</sdHeading>

        <nav>
          <ul class="ninjadash-category-list">
            <li>
              <a @click="() => onChangeCategory('all')" to="#">
                <span>All</span>
                <span class="category-count">200</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('electronics')" to="#">
                <span>Electronics</span>
                <span class="category-count">30</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('mobile')" to="#">
                <span>Mobile</span>
                <span class="category-count">20</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('bags')" to="#">
                <span>Bags</span>
                <span class="category-count">10</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('grocery')" to="#">
                <span>Grocery</span>
                <span class="category-count">25</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('shoes')" to="#">
                <span>Shoes</span>
                <span class="category-count">20</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('food')" to="#">
                <span>Food</span>
                <span class="category-count">15</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('cutlery')" to="#">
                <span>Cutlery</span>
                <span class="category-count">18</span>
              </a>
            </li>

        <div class="sidebar-single__action">
          <sdButton> <a class="btn-seeMore" to="#"> See more </a></sdButton></div>


          <li>
              <a @click="() => onChangeCategory('automibile accesories')" to="#">
                <span>Automobile Accesories </span>
                <span class="category-count">10</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('games')" to="#">
                <span>Games</span>
                <span class="category-count">15</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('furniture')" to="#">
                <span>Furniture</span>
                <span class="category-count">18</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('e-books')" to="#">
                <span>E-books</span>
                <span class="category-count">9</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('toys')" to="#">
                <span>Toys</span>
                <span class="category-count">15</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('jewellery')" to="#">
                <span>Jewellery </span>
                <span class="category-count">18</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('health')" to="#">
                <span>Health</span>
                <span class="category-count">20</span>
              </a>
            </li>
            <li>
              <a @click="() => onChangeCategory('comics')" to="#">
                <span>Comics</span>
                <span class="category-count">10</span>
              </a>
            </li>
          </ul>
        </nav>
      </SidebarSingle>

      <SidebarSingle>
        <sdHeading as="h5">Brands</sdHeading>
        <a-checkbox-group
          @change="onChangeBrand"
          v-model:value="checkboxValue"
          name="checkboxgroup"
          :options="optionsBrand"
        />

        <!-- <div class="sidebar-single__action">
          <a class="btn-seeMore" to="#"> See more </a>
        </div> -->
      </SidebarSingle>

      <!-- <SidebarSingle>
        <sdHeading as="h5">Ratings</sdHeading>
        <a-checkbox-group
          @change="onChangeRating"
          v-model:value="checkboxValue"
          name="optionsRate"
          :options="options"
        />
      </SidebarSingle> -->
    </sdCards>
  </Sidebar>
</template>
<script>
import Slider from "../../../../../components/slider/Slider";
import { Sidebar, SidebarSingle } from "../../Style";
import { ref, defineComponent } from "vue";
import { useStore } from "vuex";
//import { Rate } from "ant-design-vue";


const optionsBrand = [
  {
    label: (
      <>
        Nike <span class="brand-count">20</span>
      </>
    ),
    value: "nike",
  },
  {
    label: (
      <>
        Addidas <span class="brand-count">25</span>
      </>
    ),
    value: "addidas",
  },
  {
    label: (
      <>
        Walmart <span class="brand-count">15</span>
      </>
    ),
    value: "walmart",
  },
  {
    label: (
      <>
        Seven Eleven<span class="brand-count">25</span>
      </>
    ),
    value: "seveneleven",
  },
  {
    label: (
      <>
        Key Ring <span class="brand-count">20</span>
      </>
    ),
    value: "keyring",
  },{
    label: (
      <>
        Webtalk <span class="brand-count">10</span>
      </>
    ),
    value: "webtalk",
  },{
    label: (
      <>
        Target <span class="brand-count">19</span>
      </>
    ),
    value: "target",
  },
];

const Filters = defineComponent({
  name: "Filters",
  components: { Slider, Sidebar, SidebarSingle },
  setup() {
    const { dispatch } = useStore();
    const min = ref(0);
    const max = ref(1500);
    const checkboxValue = ref([]);
    const onChange = (value) => {
      min.value = value[0];
      max.value = value[1];
      dispatch("filterByPriceRange", value);
    };

    const onChangeRating = (checkValue) => {
      dispatch("filterByRating", [checkValue]);
    };
    const onChangeBrand = (checkValue) => {
      dispatch("filterByBrand", [checkValue]);
    };

    const onChangeCategory = (value) => {
      dispatch("filterByCategory", value);
    };

    return {
      onChange,
      onChangeCategory,
      onChangeBrand,
      onChangeRating,
      checkboxValue,
      min,
      max,
      optionsBrand,
    };
  },
});

export default Filters;
</script>
