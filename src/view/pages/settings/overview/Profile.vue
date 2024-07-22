<template>
  <sdCards>
    <template v-slot:title>
      <div class="setting-card-title">
        <sdHeading as="h4">Edit Profile</sdHeading>
        <span>Set Up Your Personal Information</span>
      </div>
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
            <a-form-Item name="input-name">
              <a-input  v-model:value="formState.name" placeholder="Name">
              <template #prefix>
              <unicon name="user" width="18"></unicon>
              </template>
            </a-input>
            </a-form-Item>
            <a-form-item name="input-phone">
              <a-input v-model:value="formState.phone" placeholder="Phone Number">
              <template #prefix>
              <unicon name="phone" width="18"></unicon>
              </template>
            </a-input>
            </a-form-item>
            <a-form-item label="Country">
              <a-select v-model:value="formState.country" style="width: 100%">
                <a-select-option value="">Please Select</a-select-option>
                <a-select-option value="bangladesh">Bangladesh</a-select-option>
                <a-select-option value="india">India</a-select-option>
                <a-select-option value="pakistan">Pakistan</a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="City">
              <a-select v-model:value="formState.city" style="width: 100%">
                <a-select-option value="">Please Select</a-select-option>
                <a-select-option value="dhaka">Dhaka</a-select-option>
                <a-select-option value="mymensingh">Mymensingh</a-select-option>
                <a-select-option value="khulna">Khulna</a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item name="input-companyname">
              <a-input v-model:value="formState.company"  placeholder="Company Name">
                <template #prefix>
              <unicon name="building" width="18"></unicon>
              </template>
              </a-input>
            </a-form-item>
            <a-form-item name="input-website">
              <a-input v-model:value="formState.website" placeholder="Website">
                <template #prefix>
              <unicon name="globe" width="18"></unicon>
              </template>
              </a-input>
            </a-form-item>
            <a-form-item name="input-userbio">
              <a-textarea v-model:value="formState.userBio" :rows="3" placeholder="User Bio">
                <template #prefix>
              </template>
              </a-textarea>
            </a-form-item>
            <a-form-item name="skills" label="Skills">
              <TagInput>
                <div>
                  <template v-for="(tag, index) in tags">
                    <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
                      <a-tag
                        :key="tag"
                        :closable="index !== 0"
                        @close="() => handleClose(tag)"
                      >
                        {{ `${tag.slice(0, 20)}...` }}
                      </a-tag>
                    </a-tooltip>
                    <a-tag
                      v-else
                      :key="index + 1"
                      :closable="index !== 0"
                      @close="() => handleClose(tag)"
                    >
                      {{ tag }}
                    </a-tag>
                  </template>
                  <div>
                    <a-input
                      v-if="inputVisible"
                      ref="input"
                      type="text"
                      size="small"
                      :style="{ width: '78px' }"
                      :value="inputValue"
                      @change="handleInputChange"
                      @blur="handleInputConfirm"
                      @keyup.enter="handleInputConfirm"
                    />
                    <a-tag
                      v-else
                      style="background: #fff; borderstyle: dashed"
                      @click="showInput"
                    >
                      <unicon name="plus" width="14"></unicon> New Tag
                    </a-tag>
                  </div>
                </div>
              </TagInput>
            </a-form-item>

            <div class="setting-form-actions">
              <sdButton size="default" htmlType="submit" type="primary">
                Update Profile
              </sdButton>
              &nbsp; &nbsp;
              <sdButton size="default" @click="handleCancel" type="light">
                Cancel
              </sdButton>
            </div>
          </a-form>
        </BasicFormWrapper>
      </a-col>
    </a-row>
  </sdCards>
</template>
<script>
import { BasicFormWrapper, TagInput } from "../../../styled";
import { defineComponent,reactive } from "vue";

const Profile = defineComponent({
  name: "Profile",
  components: { BasicFormWrapper, TagInput },

  setup() {
     const formState = reactive({
       name: "",
       phone: "",
       country: "",
       city: "",
       company: "",
       website: "",
       userBio:"",
     });

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
