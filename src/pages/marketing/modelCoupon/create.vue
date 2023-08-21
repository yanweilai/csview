<template>
  <div class="form-submit">
    <div class="i-layout-page-header">
      <PageHeader class="product_tabs" hidden-breadcrumb>
        <div slot="title">
          <router-link
            :to="{ path: `${roterPre}/marketing/coupon_model/index` }"
          >
            <div class="font-sm after-line">
              <span class="iconfont iconfanhui"></span>
              <span class="pl10">返回</span>
            </div>
          </router-link>
          <span class="mr20 ml16">添加自提券</span>
        </div>
      </PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form :model="formData" :label-width="150">
        <FormItem label="自提券名称" required>
          <Input
            v-model="formData.name"
            v-width="320"
            placeholder="请输入自提券名称"
          ></Input>
        </FormItem>
        <FormItem label="卡号前缀" required>
          <!-- <Input v-model="prefixNumber" disabled>
            <template #prepend>
              <Select v-model="formData.prefix" style="width: 80px" @on-select="selectPrefix">
                  <Option v-for="(item,index) in prefixList" :value="item.prefix" :key="index">{{ item.prefix }}</Option>
              </Select>
            </template>
          </Input> -->
          <Select
            v-model="formData.prefix"
            style="width: 320px"
            @on-select="selectPrefix"
          >
            <Option
              v-for="(item, index) in prefixList"
              @click.native="getMoreParams(item)"
              :value="item.prefix"
              :key="index"
              >{{ item.prefix }}</Option
            >
          </Select>
        </FormItem>
        <FormItem label="数量" required>
          <InputNumber
            :min="1"
            v-model="formData.number"
            v-width="320"
            :precision="0"
            @on-change="numberChange"
            placeholder="请输入数量"
          ></InputNumber>
        </FormItem>
        <FormItem label="关联商品" required>
          <template>
            <div
              class="upload-list"
              v-for="item in productList"
              :key="item.related_product_ids"
            >
              <img :src="item.image" />
              <Icon
                type="ios-close-circle"
                size="16"
                @click="remove(item.related_product_ids)"
              />
            </div>
          </template>
          <Icon type="ios-camera-outline" size="26" @click="modals = true" />
          <div class="info">选择商品</div>
        </FormItem>
        <FormItem label="卡劵销售价" required>
          <InputNumber
            :min="1"
            :max="9999999"
            placeholder="请输入销售价"
            :precision="0"
            v-model="formData.price"
            v-width="320"
            @on-change="priceChange"
          ></InputNumber>
        </FormItem>
        <!-- 卡劵有效期，激活后X年内有效 -->
        <FormItem label="卡劵有效期/年" required>
          <InputNumber
            :min="1"
            :max="100"
            :precision="0"
            placeholder="请输入卡劵有效期，单位为年"
            v-model="formData.expired_year"
            v-width="320"
          ></InputNumber>
        </FormItem>
        <FormItem label="备注">
          <Input
            v-model="formData.remark"
            v-width="320"
            type="textarea"
            placeholder="请输入备注"
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
            >立即创建</Button
          >
        </FormItem>
      </Form>
    </Card>
    <Modal
      v-model="modals"
      title="商品列表"
      footerHide
      class="paymentFooter"
      scrollable
      width="900"
      @on-cancel="cancel"
    >
      <goods-list
        ref="goodslist"
        v-if="modals"
        :ischeckbox="true"
        @getProductId="getProductId"
      ></goods-list>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import goodsList from "@/components/goodsList/index";
import { couponPrefixApi, couponModelCreateApi } from "@/api/marketing";
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
        prefix_id: 0,
        number: 1,
        related_product_ids: "",
        price: 0,
        expired_year: 1,
        remark: "",
      },
      prefixNumber: "",
      prefixList: [], //前缀列表
      productList: [], //商品列表
      disabled: false,
      modals: false,
    };
  },
  computed: {
    ...mapState("admin/layout", ["isMobile", "menuCollapse"]),
  },
  created() {
    this.getPrefixList();
  },
  methods: {
    priceChange() {
    },
    // 选择前缀
    selectPrefix(item) {
    },
    // 改变卡号
    numberChange(val) {
      if (this.formData.number > 10000) {
        this.formData.number = 1;
        this.$Message.error("最多10000张");
      }
    },
    //前缀列表
    getPrefixList() {
      couponPrefixApi().then((res) => {
        this.prefixList = res.data.list;
      });
    },
    getMoreParams(item) {
      this.formData.prefix_id = item.id;
      console.log(this.formData.prefix_id, " this.formData.prefix_id");
    },
    // 创建
    save() {
      if (!this.formData.name) {
        return this.$Message.error("请输入卡券名称");
      }
      if (!this.formData.prefix) {
        return this.$Message.error("请选择卡号前缀");
      }
      if (!this.formData.number) {
        return this.$Message.error("请输入数量");
      }
      //请输入关联商品
      if (!this.formData.related_product_ids) {
        return this.$Message.error("请选择关联商品");
      }
      if (!this.formData.price || this.formData.price == 0) {
        return this.$Message.error("请输入卡劵销售价");
      }
      if (!this.formData.expired_year) {
        return this.$Message.error("请输入卡劵有效期");
      }
      this.disabled = false;
      console.log(this.formData, "this.formData");
      couponModelCreateApi(this.formData)
        .then((res) => {
          this.disabled = true;
          this.$Message.success(res.msg);
          setTimeout(() => {
            this.$router.push({
              path: this.roterPre + "/marketing/coupon_model/index",
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
    // 选择的商品
    getProductId(productList) {
      this.modals = false;
      this.productList = this.unique(this.productList.concat(productList));
      this.formData.related_product_ids = "";
      this.productList.forEach((value) => {
        if (this.formData.related_product_ids) {
          this.formData.related_product_ids += `,${value.product_id}`;
        } else {
          this.formData.related_product_ids += `${value.product_id}`;
        }
      });
      console.log(
        this.formData.related_product_ids,
        "this.formData.related_product_ids"
      );
    },
    cancel() {
      this.modals = false;
    },
    // 删除商品
    remove(productId) {
      for (let index = 0; index < this.productList.length; index++) {
        if (this.productList[index].related_product_ids == productId) {
          this.productList.splice(index, 1);
        }
      }
      this.formData.related_product_ids = "";
      this.productList.forEach((value) => {
        if (this.formData.related_product_ids) {
          this.formData.related_product_ids += `,${value.product_id}`;
        } else {
          this.formData.related_product_ids += `${value.product_id}`;
        }
      });
      console.log(
        this.formData.related_product_ids,
        "this.formData.related_product_ids"
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
