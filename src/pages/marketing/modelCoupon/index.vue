<template>
  <div>
    <div class="i-layout-page-header">
      <PageHeader
        class="product_tabs"
        title="自提劵模板"
        hidden-breadcrumb
      ></PageHeader>
    </div>
    <Card :bordered="false" dis-hover class="ivu-mt">
      <Form
        ref="tableFrom"
        :model="tableFrom"
        :label-width="labelWidth"
        :label-position="labelPosition"
        @submit.native.prevent
      >
        <Row type="flex" :gutter="24">
          <Col v-bind="grid">
            <FormItem label="卡券名称：" label-for="title">
              <Input
                search
                enter-button
                v-model="tableFrom.name"
                placeholder="请输入卡券名称"
                @on-search="userSearchs"
              />
            </FormItem>
          </Col>
        </Row>
        <Row type="flex">
          <Col v-bind="grid">
            <Button type="primary" icon="md-add" @click="add">制券</Button>
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
        <template slot-scope="{ row, index }" slot="ralated_product_names">
          <!-- 悬浮显示详情tooltip，多个商品用分隔符分开-->
          <div v-for="(item, index) in row.ralated_product_names" :key="index">
            <Tooltip placement="top" :content="item" :max-width="300">
              <span>{{ item }}</span>
            </Tooltip>
            <!-- 最后一个item不显示分割线 -->
            <Divider type="vertical" v-if="index !== row.ralated_product_names.length - 1" />
          </div> 
        </template>
        
        
        <template slot-scope="{ row, index }" slot="action">
          <a @click="couponModelDetails(row, index)">详情</a>
          <Divider type="vertical" />
          <a @click="couponExportCrab(row, index)">导出</a>
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
  couponModelApi,
  couponExportCrabApi
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
          title: "模版编号",
          key: "id",
          width: 80,
        },
        {
          title: "卡券模版名称",
          key: "name",
          minWidth: 150,
        },
        {
          title: "数量",
          key: "number",
          minWidth: 80,
        },
        {
          title: "制劵时间",
          key: "updated_at",
          minWidth: 150,
        },
        {
          title: "提货商品名称",
          slot: "ralated_product_names",
          minWidth: 220,
        },
        {
          title: "销售价格",
          key: "price",
          minWidth: 120,
        },
        {
          title: "备注",
          key: "remark",
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
    //下载导出文件
    downloadFileFromUrl(url, filename) {
      // const link = document.createElement("a");
      // link.href = url;
      // link.download = filename || "file";
      // link.target = "_blank"; // 添加这一行，以在新标签页中打开链接
      // link.style.display = "none";
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      const iframe = document.createElement("iframe");
      iframe.src = url;
      iframe.style.display = "none";
      document.body.appendChild(iframe);
      setTimeout(() => {
        document.body.removeChild(iframe);
      }, 5000);
    },

    // 导出数据  
    async couponExportCrab(row) {
      console.log(row,'sds');
      try {
        let obj={
          name:row.name
        }
        const response = await couponExportCrabApi(obj);
        if (response.status === 200) {
          const fileUrl = response.data[0]; // 获取文件链接
          const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
          console.log(fileName, 'fileName');
          this.downloadFileFromUrl(fileUrl, fileName);
        } else {
          this.$Message.error(response.msg || "导出失败");
        }
      } catch (error) {
        console.error("API 调用出错:", error);
        this.$Message.error("导出失败,错误400," + error.msg);
      }
    },
    //跳转
    couponModelDetails(row, index) {
      this.$router.push({
        path: this.roterPre + "/marketing/model_coupon_issue/index",
        query: { name: row.name },
      });
      
    },
    // 列表
    getList() {
      this.loading = true;
      couponModelApi(this.tableFrom)
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
      this.$router.push({ path: this.roterPre + "/marketing/coupon_model/create" });
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
