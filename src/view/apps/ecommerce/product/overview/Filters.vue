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
            <li v-for="(category, index) in visibleCategories" :key="index">
              <a @click="() => onChangeCategory(category.name)" to="#">
                <span>{{ category.name }}</span>
                <span class="category-count">{{ category.count }}</span>
              </a>
            </li>
          </ul>
          <div class="sidebar-single__action">
            <sdButton @click="toggleShowMore">
              <a class="btn-seeMore" to="#"> 
                {{ showMore ? 'Show Less' : 'Show More' }}
              </a>
            </sdButton>
          </div>
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
      </SidebarSingle>
    </sdCards>
  </Sidebar>
</template>

<script>
import Slider from "../../../../../components/slider/Slider";
import { Sidebar, SidebarSingle } from "../../Style";
import { ref, defineComponent, computed } from "vue"; 
import { useStore } from "vuex";

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
    const showMore = ref(false);

    const categories = ref([
      { name: "All", count: 200 },
      { name: "Electronics", count: 30 },
      { name: "Mobile", count: 20 },
      { name: "Bags", count: 10 },
      { name: "Grocery", count: 25 },
      { name: "Shoes", count: 20 },
      { name: "Food", count: 15 },
      { name: "Cutlery", count: 18 },
      { name: "Automobile Accessories", count: 10 },
      { name: "Games", count: 15 },
      { name: "Furniture", count: 18 },
      { name: "E-books", count: 9 },
      { name: "Toys", count: 15 },
      { name: "Jewellery", count: 18 },
      { name: "Health", count: 20 },
      { name: "Comics", count: 10 }
    ]);

    const visibleCategories = computed(() => {
      return showMore.value ? categories.value : categories.value.slice(0, 8);
    });

    const toggleShowMore = () => {
      showMore.value = !showMore.value;
    };

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
      visibleCategories,
      toggleShowMore,
      showMore
    };
  },
});

export default Filters;
</script>
