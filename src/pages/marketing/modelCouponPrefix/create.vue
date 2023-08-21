<template>
  <div class="form-submit">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" hidden-breadcrumb>
        <div slot="title">
          <router-link
            :to="{ path: `${roterPre}/marketing/model_coupon_prefix/index` }"
          >
            <div class="font-sm after-line">
              <span class="iconfont iconfanhui"></span>
              <span class="pl10">返回</span>
            </div>
          </router-link>
          <span
            v-text="$route.query.id ? '编辑前缀' : '添加前缀'"
            class="mr20 ml16"
          ></span>
        </div>
      </PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form :model="formData" :label-width="150">
        <FormItem label="前缀名称" required>
          <Input
            v-model="formData.name"
            v-width="320"
            placeholder="请输入前缀名称"
          ></Input>
        </FormItem>
        <FormItem label="前缀字母" required>
          <Input
            v-model="formData.prefix"
            v-width="320"
            placeholder="请输入前缀字母"
            type="text"
          ></Input>
        </FormItem>
        
       
      </Form>
    </Card>
    <Card
      :bordered="false"
      dis-hover
      class="fixed-card"
      :style="{ left: `${!menuCollapse ? '200px' : isMobile ? '0' : '80px'}` }"
    >
      <Form>
        <FormItem>
          <Button type="primary" @click="save" :disabled="disabled"
            ><span v-text="$route.query.id ? '编辑前缀' : '添加前缀'"></span></Button
          >
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import goodsList from "@/components/goodsList/index";
import { couponPrefixApi, couponPrefixCreateApi } from "@/api/marketing";
import Setting from "@/setting";
export default {
  name: "modelCouponCreate",
  components: {
    goodsList,
  },
  data() {
    return {
      roterPre: Setting.roterPre,
      formData: {
        name: "",
        prefix: '',
        id: 0,
      },
      disabled: false,
      modals: false,
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile", "menuCollapse"]),
  },
  created() {
    console.log(this.$route.query.id, "this.$route.query.id");
    if (this.$route.query.id) {
      this.formData.id = this.$route.query.id;
      this.formData.name=this.$route.query.name;
      this.formData.prefix=this.$route.query.prefix;
    }
  },
  methods: {
    
    // 创建
    save() {
      if (!this.formData.name) {
        return this.$Message.error("请输入前缀名称");
      }
      // 判断prefix 是否为空，并且为2位大写字母
      if (!this.formData.prefix) {
        return this.$Message.error("请输入前缀字母");
      }
      if (!/^[A-Z]{2}$/.test(this.formData.prefix)) {
        return this.$Message.error("前缀字母必须为2位大写字母");
      }

      
     
      this.disabled = false;
      console.log(this.formData, "this.formData");
      couponPrefixCreateApi(this.formData)
        .then((res) => {
          this.disabled = true;
          this.$Message.success(res.msg);
          setTimeout(() => {
            this.$router.push({
              path: this.roterPre + "/marketing/model_coupon_prefix/index",
            });
          }, 1000);
        })
        .catch((err) => {
          this.$Message.error(err.msg);
        });
    },

    //对象数组去重；
    unique(arr) {
      const res = new Map();
      return arr.filter(
        (arr) => !res.has(arr.product_id) && res.set(arr.product_id, 1)
      );
    },
  },
};
</script>

<style scoped lang="stylus">
.productType {
  width: 120px;
  height: 60px;
  background: #FFFFFF;
  border-radius: 3px;
  border: 1px solid #E7E7E7;
  float: left;
  text-align: center;
  padding-top: 8px;
  position: relative;
  cursor: pointer;
  line-height: 23px;
  margin-right: 12px;

  &.on {
    border-color: #1890FF;
  }

  .name {
    font-size: 14px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.85);

    &.on {
      color: #1890FF;
    }
  }

  .title {
    font-size: 12px;
    font-weight: 400;
    color: #999999;
  }

  .jiao {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 0;
    height: 0;
    border-bottom: 26px solid #1890FF;
    border-left: 26px solid transparent;
  }

  .iconfont {
    position: absolute;
    bottom: -3px;
    right: 1px;
    color: #FFFFFF;
    font-size: 12px;
  }
}

.info {
  color: #888;
  font-size: 12px;
}

.ivu-input-wrapper {
  width: 320px;
}

.ivu-input-number {
  width: 160px;
}

.ivu-date-picker {
  width: 320px;
}

.ivu-icon-ios-camera-outline {
  width: 58px;
  height: 58px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  background-color: rgba(0, 0, 0, 0.02);
  line-height: 58px;
  cursor: pointer;
  vertical-align: middle;
}

.upload-list {
  width: 58px;
  height: 58px;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin-right: 15px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  vertical-align: middle;
}

.upload-list img {
  display: block;
  width: 100%;
  height: 100%;
}

.ivu-icon-ios-close-circle {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
}

.form-submit {
  /deep/.ivu-card {
    border-radius: 0;
  }

  margin-bottom: 79px;

  .fixed-card {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 200px;
    z-index: 99;
    box-shadow: 0 -1px 2px rgb(240, 240, 240);

    /deep/ .ivu-card-body {
      padding: 15px 16px 14px;
    }

    .ivu-form-item {
      margin-bottom: 0;
    }

    /deep/ .ivu-form-item-content {
      margin-right: 124px;
      text-align: center;
    }

    .ivu-btn {
      height: 36px;
      padding: 0 20px;
    }
  }
}
</style>
