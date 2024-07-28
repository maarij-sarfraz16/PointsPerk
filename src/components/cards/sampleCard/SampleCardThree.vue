<template>
  <a-row>
    <a-col :lg="24" :md="24" :sm="24">
      <CardWrapper>
        <img :src="require(`../../../${img}`)" alt="" />
        <figcaption>
          <h2>{{ title }}</h2>
          <p>{{ content }}</p>
        </figcaption>
      </CardWrapper>
    </a-col>
  </a-row>
</template>

<script>
import { defineComponent, toRefs } from "vue";
import Styled from "vue3-styled-components";
const CardWrapper = Styled.figure`
  background: ${({ theme }) => theme[theme.mainContent]["white-background"]};
  padding: 25px;
  border-radius: 10px;
  text-align: center;
  margin: 0;
  display:flex;
  align-items:center;
  justify-item: center;
  
  img{
  width:25%;
  }

  figcaption {
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-item: center;
    h2 {
      margin: 24px 0 10px 0;;
      font-size: 45px;
			color: ${({ theme }) => theme[theme.mainContent]["dark-text"]};
    }
    p {
      line-height: 1.79;
      color: ${({ theme }) => theme[theme.mainContent]["gray-text"]};
      width:45%;
    }
  }
`;
import VueTypes from "vue-types";
export default defineComponent({
  name: "SampleCardThree",
  components: { CardWrapper },
  props: {
    item: VueTypes.object.def({
      id: 1,
      title: "User Friendly",
      content: "Lorem Ipsum is simply dummy text of the",
      img: "static/img/sampleCards/1.svg",
    }),
  },
  setup(props) {
    const { item } = toRefs(props);
    const { id, title, content, img } = item.value;
    return { id, title, content, img };
  },
});
</script>
