<template>
  <div>
    <sdPageHeader title="Settings" class="ninjadash-page-header-main" :routes="pageRoutes">
    </sdPageHeader>
    <Main>
      <a-row :gutter="25">
        <a-col :xxl="6" :lg="8" :md="10" :xs="24">
          <ProfileAuthorBox>
            <author-box />
          </ProfileAuthorBox>
        </a-col>
        <a-col :xxl="18" :lg="16" :md="14" :xs="24">
          <SettingWrapper>
            <CoverSection />
            <Suspense>
              <template #default>
                <router-view></router-view>
              </template>
              <template #fallback>
                <div class="spin">
                  <a-spin />
                </div>
              </template>
            </Suspense>
          </SettingWrapper>
        </a-col>
      </a-row>
    </Main>
  </div>
</template>

<script>
import { Main } from "@/view/styled";
import { SettingWrapper } from "./overview/style";
import CoverSection from "./overview/CoverSection";
import AuthorBox from "./overview/ProfileAuthorBox";
import { ProfileAuthorBox } from "./overview/style";
import { defineComponent } from "vue";

export default defineComponent({
  name: "User Settings",
  components: {
    Main,
    SettingWrapper,
    AuthorBox,
    CoverSection,
    ProfileAuthorBox,
  },
  data() {
    
    const pageRoutes = [
      {
        path: "/user/dashboard",
        breadcrumbName: "Dashboard",
      },
      {
        path: "",
        breadcrumbName: "Settings",
      },
    ];

    return {
      pageRoutes
    };
  },
});
</script>
