<template>
  <div>
    <!-- <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        title="前缀编辑"
        hidden-breadcrumb
      ></PageHeader>
    </div> -->
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="tableFrom"
        :model="tableFrom"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        
        <Row type="flex">
          <Col v-bind="grid">
            <Button type="primary" icon="md-add" @click="add">添加</Button>
          </Col>
        </Row>
      </Form>
      <Table
        :columns="columns1"
        :data="tableList"
        ref="table"
        class="mt25"
        :loading="loading"
        highlight-row
        no-userFrom-text="暂无数据"
        no-filtered-userFrom-text="暂无筛选结果"
      >
      <!-- 时间 -->
      <template slot-scope="{ row, index }" slot="updated_at">
          <span> {{row.updated_at | formatDate}}</span>
      </template>
        <template slot-scope="{ row, index }" slot="action">
          <a @click="couponModelDetails(row, index)">编辑</a>
          <Divider type="vertical" />
          <a @click="couponPrefixDel(row, index)">删除</a>
        </template>
      </Table>
      <div class="acea-row row-right page">
        <Page
          :total="total"
          :current="tableFrom.page"
          show-elevator
          show-total
          @on-change="pageChange"
          :page-size="tableFrom.limit"
        />
      </div>
    </Card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  couponPrefixApi,
  delCouponPrefix
} from "@/api/marketing";
import editFrom from "@/components/from/from";
import { formatDate } from "@/utils/validate";
import Setting from "@/setting";
export default {
  name: "storeCoupon",
  filters: {
    formatDate(time) {
      if (time !== 0) {
        let date = new Date(time * 1000);
        return formatDate(date, "yyyy-MM-dd hh:mm");
      }
    },
  },
  components: { editFrom },
  data() {
    return {
      roterPre: Setting.roterPre,
      grid: {
        xl: 7,
        lg: 7,
        md: 12,
        sm: 24,
        xs: 24,
      },
      loading: false,
      columns1: [
        {
          title: "编号",
          key: "id",
          width: 80,
        },
        {
          title: "前缀名称",
          key: "name",
          minWidth: 150,
        },
        {
          title: "前缀字母",
          key: "prefix",
          minWidth: 150,
        },
        {
          title: "更新时间",
          slot: "updated_at",
          minWidth: 150,
        },
        

        {
          title: "操作",
          slot: "action",
          fixed: "right",
          minWidth: 170,
        },
      ],
      tableFrom: {
        name: "",
        page: 1,
        limit: 15,
        
      },
      tableList: [],
      total: 0,
      FromData: null,
    };
  },
  created() {
    this.getList();
  },
  computed: {
    ...mapState("admin/layout", ["isMobile"]),
    labelWidth() {
      return this.isMobile ? undefined : 90;
    },
    labelPosition() {
      return this.isMobile ? "top" : "left";
    },
  },
  methods: {
    couponPrefixDel(row, index) {
      this.$Modal.confirm({
        title: "提示",
        content: "确定删除吗？",
        onOk: () => {
          delCouponPrefix(row.id, "delete")
            .then((res) => {
              this.$Message.success(res.msg);
              this.getList();
            })
            .catch((res) => {
              this.$Message.error(res.msg);
            });
        },
      });
    },
    couponModelDetails(row, index) {
      //
      this.$router.push({
        path: this.roterPre + "/marketing/model_coupon_prefix/create",
        query: { 
          id: row.id,
          name: row.name,
          prefix: row.prefix, 
        },
      });
      
    },
    // 列表
    getList() {
      this.loading = true;
      couponPrefixApi(this.tableFrom)
        .then(async (res) => {
          let data = res.data;
          this.tableList = data.list;
          this.total = res.data.count;
          this.loading = false;
        })
        .catch((res) => {
          this.loading = false;
          this.$Message.error(res.msg);
        });
    },
    pageChange(index) {
      this.tableFrom.page = index;
      this.getList();
    },
    changeType(data) {
      this.type = data;
    },
    add() {
      console.log(this.roterPre,'sds');
      this.$router.push({ path: this.roterPre + "/marketing/model_coupon_prefix/create" });
    },
    // 表格搜索
    userSearchs() {
      this.tableFrom.page = 1;
      this.getList();
    },
  },
};
</script>

<style scoped>
.ivu-col:nth-of-type(1) .ivu-form-item .ivu-form-item-label {
  width: 80px !important;
}
.ivu-col:nth-of-type(1) .ivu-form-item .ivu-form-item-content {
  margin-left: 80px !important;
}
</style>
