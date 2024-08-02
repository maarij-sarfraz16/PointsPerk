<template>
  <sdCards>
    <template v-slot:title>
      <div class="setting-card-title">
        <sdHeading as="h4">Edit Profile</sdHeading>
        <span>Edit Your Personal Information</span>
      </div>

      <sdAlerts
        :outlined="false"
        :closable="false"
        :showIcon="true"
        message="Reminder"
        description="Please contact Admin if you wish to change your Email Address."
        type="warning"
      />
    </template>

    <a-row type="flex" justify="center">
      <a-col :xxl="12" :lg="24" :xs="24">
        <BasicFormWrapper>
          <a-form
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            layout="vertical"
          >
            <a-form-item label="Email Address">
              <a-input
                v-model:value="formState.email"
                placeholder="name@example.com"
              >
                <template #prefix>
                  <unicon name="envelope" width="18"></unicon>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item label="Country">
              <a-select v-model:value="formState.country" style="width: 100%">
                <a-select-option value="">Please Select</a-select-option>
                <a-select-option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country.name"
                >
                  <div
                    class="ok"
                    :style="{
                      display: 'flex',
                      'align-items': 'center',
                      gap: '10px',
                    }"
                  >
                    <div
                      class="img"
                      :style="{
                        display: 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        width: '40px',
                        height: '45px',
                      }"
                    >
                      <img
                        :src="country.image"
                        alt=""
                        :style="{
                          width: '100%',
                          height: '100%',
                        }"
                      />
                    </div>
                    {{ country.name }}
                  </div>
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="Contact Number">
              <a-input v-model:value="formState.phone" placeholder="123 7789">
                <template #prefix>
                  <unicon name="phone" width="18"></unicon>
                </template>
              </a-input>
            </a-form-item>

            <a-form-item name="input-userbio">
              <a-textarea
                v-model:value="formState.userBio"
                :rows="3"
                placeholder="User Bio"
              >
                <template #prefix>
                  <unicon name="user" width="18"></unicon>
                </template>
              </a-textarea>
            </a-form-item>

            <div class="setting-form-actions">
              <sdButton size="default" htmlType="submit" type="primary">
                Update Profile
              </sdButton>
            </div>
          </a-form>
        </BasicFormWrapper>
      </a-col>
    </a-row>
  </sdCards>
</template>

<script>
import { BasicFormWrapper } from "../../../styled";
import fetchCountriesAction from "./fetchCountriesAction";
import fetchCountriesFlagsAction from "./fetchCountriesFlagsAction";

import { defineComponent, onMounted, reactive, watch } from "vue";

const Profile = defineComponent({
  name: "Profile",
  components: { BasicFormWrapper },

  setup() {
    const formState = reactive({
      name: "",
      phone: "",
      country: "",
      city: "",
      company: "",
      website: "",
      userBio: "",
    });

    const countries = reactive([]);

    onMounted(async () => {
      try {
        const codesAndNamesData = await fetchCountriesAction();
        const flagsData = await fetchCountriesFlagsAction();
        const flagsMap = new Map(
          flagsData.map((flag) => [flag.code, flag.image])
        );

        console.log(flagsMap);
        codesAndNamesData.forEach((country) => {
          const flagImage = flagsMap.get(country.code);
          countries.push({
            ...country,
            image: flagImage,
          });
        });
      } catch (error) {
        console.error("Failed to fetch JSON data:", error);
      }
    });
    watch(
      () => formState.country,
      (newCountry) => {
        const selectedCountry = countries.find(
          (country) => country.name === newCountry
        );
        if (selectedCountry) {
          formState.phone = selectedCountry.dial_code;
        }
      }
    );

    const handleFinish = (values) => {
      this.values = { ...values, tags: this.tags };
      console.log(values, formState);
    };

    const handleFinishFailed = (errors) => {
      console.log(errors);
    };

    return {
      formState,
      handleFinish,
      handleFinishFailed,
      countries,
    };
  },

  data() {
    return {
      tags: ["UI/UX", "Branding", "Product Design", "Web Design"],
      values: null,
      inputVisible: false,
      inputValue: "",
    };
  },

  methods: {
    handleCancel(e) {
      e.preventDefault();
      //form.resetFields();
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag);
      console.log(tags);
      this.tags = tags;
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(function () {
        this.$refs.input.focus();
      });
    },

    handleInputChange(e) {
      this.inputValue = e.target.value;
    },

    handleInputConfirm() {
      const inputValue = this.inputValue;
      let tags = this.tags;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue];
      }
      console.log(tags);
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: "",
      });
    },
  },
});

export default Profile;
</script>
