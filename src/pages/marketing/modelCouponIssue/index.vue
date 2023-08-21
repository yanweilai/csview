<template>
  <div>
    <Card :bordered="false" dis-hover class="ivu-mt" :padding="0">
      <div class="new_card_pd">
        <Form
          ref="tableFrom"
          :model="tableFrom"
          :label-width="labelWidth"
          :label-position="labelPosition"
          @submit.native.prevent
        >
          <Row type="flex" :gutter="24">
            <Col>
              <FormItem label="卡券名称：" label-for="title">
                <!-- enter-button search-->
                <Input
                  class="input-add"
                  v-model="tableFrom.name"
                  placeholder="请输入卡券名称"
                  @on-search="userSearchs"
                />
              </FormItem>
            </Col>
            <!-- 添加按时间段筛选 -->
            <Col> 
              <FormItem label="使用时间：">
                <DatePicker
                  :editable="false"
                  :clearable="true"
                  @on-change="onchangeTime"
                  :value="timeVal"
                  format="yyyy/MM/dd HH:mm:ss"
                  type="datetimerange"
                  placement="bottom-start"
                  placeholder="选择使用时间"
                  class="input-add "
                  :options="options"
                ></DatePicker>
              </FormItem>
            </Col>
            <!-- 添加按渠道商筛选 -->
            <Col >
              <FormItem label="渠道商：" label-for="channel_provider_name">
                <Input v-model="tableFrom.channel_provider_name" class="input-add" placeholder="请输入渠道商" />
              </FormItem>
            </Col>
          </Row>
          <Row :gutter="24">
            <!-- 添加按卡号筛选 -->
            <Col >
              <FormItem label="卡号：" label-for="card_no">
                <Input
                class="input-add"
                  v-model="tableFrom.card_no"
                  placeholder="请输入卡号"
                />
              </FormItem>
            </Col>
            <!-- 添加搜索按钮 -->
            <Col>
              <Button type="primary" @click="userSearchs">搜索</Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Card>
    <Card :bordered="false" dis-hover class="ivu-mt">
       <!-- tab切换栏 -->
      <div class="new_tab">
        <!-- 切换订单状态查询，状态： -1 已作废，0待分配，1待激活，2待使用，3使用中，4已使用 ，如果需要查询全部，传递 all  -->
        <Tabs  @on-click="onClickTab">
          <TabPane label="全部" name="all"></TabPane>
          <TabPane label="待分配" name="0"></TabPane>
          <TabPane label="待激活" name="1"></TabPane>
          <TabPane label="待使用" name="2"></TabPane>
          <TabPane label="使用中" name="3"></TabPane>
          <TabPane label="已使用" name="4"></TabPane>
          <TabPane label="已作废" name="-1"></TabPane>
        </Tabs>
      </div>
      <div class="acea-row row-between">
        <!-- 相关操作 -->
        <div class="tool-but">
          <Tooltip
            content="本页至少选中一项"
            :disabled="!!checkUidList.length"
          >
            <Button
              class="mr10"
              type="primary"
              v-if=" this.tableFrom.status == '0'"
              :disabled="!checkUidList.length"
              @click="couponDispatch"
            >
              分配券
            </Button>
            <Button
              class="mr10"
              type="primary"
              v-if=" this.tableFrom.status == '1'"
              :disabled="!checkUidList.length"
              @click="couponCancelDispatch"
            >
              取消分配券
            </Button>
            <Button
              class="mr10"
              type="primary"
              v-if=" this.tableFrom.status == '1'"
              :disabled="!checkUidList.length"
              @click="activateCoupon"
            >
              激活券
            </Button>
            <Button
              class="mr10"
              type="primary"
              v-if=" this.tableFrom.status == '2'"
              :disabled="!checkUidList.length"
              @click="deactivateCoupon"
            >
              取消激活券
            </Button>
            <Button
              class="mr10"
              type="primary"
              v-if=" this.tableFrom.status == '0'"
              :disabled="!checkUidList.length"
              @click="couponInvalid"
            >
              作废券
            </Button>
            <Button
              class="mr10"
              type="primary"
              v-if="this.tableFrom.status == 'all'"
              :disabled="!checkUidList.length"
              @click="couponUpdateRemark"
            >
              更新券的备注
            </Button>
            
          </Tooltip>
          <Button
              class="mr10"
              type="default"
              @click="couponExportCrab"
            >
              导出列表
            </Button>
        </div>
      </div>
      <vxe-table
        ref="cTable"
        class="mt25"
        :loading="loading"
        row-id="id"
        :expand-config="{accordion: true}"
        :checkbox-config="{reserve: true}"
        @checkbox-all="checkboxAll"
        @checkbox-change="checkboxItem"
        :data="tableList">
        
        <vxe-column type="checkbox" width="120">
          <template #header>
            <div>
              <Dropdown transfer @on-click="allPages">
                <a href="javascript:void(0)" class="acea-row row-middle">
                  <span>全选({{isAll==1?(total-checkUidList.length):checkUidList.length}})</span>
                  <Icon type="ios-arrow-down"></Icon>
                </a>
                <template #list>
                  <DropdownMenu>
                    <DropdownItem name="0">当前页</DropdownItem>
                    <!-- <DropdownItem name="1">所有页</DropdownItem> -->
                  </DropdownMenu>
                </template>
              </Dropdown>
            </div>
          </template>
        </vxe-column>
        <vxe-table-column field="id" title="ID" width="80"></vxe-table-column>
        <vxe-table-column field="model_id" title="劵模版编号" width="100"></vxe-table-column>
        <vxe-table-column field="name" title="卡券名称" width="120"></vxe-table-column>
        <vxe-table-column field="card_no" title="卡号" width="120"></vxe-table-column>
        <!-- 卡密 -->
        <vxe-table-column field="password" title="卡密" width="120"></vxe-table-column>
        <vxe-table-column field="status" title="卡券状态" width="120">
          <template slot-scope="{ row }">
            <span v-if="row.status == 0">待分配</span>
            <span v-if="row.status == 1">待激活</span>
            <span v-if="row.status == 2">待使用</span>
            <span v-if="row.status == 3">使用中</span>
            <span v-if="row.status == 4">已使用</span>
            <span v-if="row.status == -1">已作废</span>
          </template>
        </vxe-table-column>
        <vxe-table-column field="channel_provider_name" title="渠道商" width="120"></vxe-table-column>
        <vxe-table-column field="verify_type" title="核销场景" width="180">
          <template slot-scope="{ row }">
            <div v-if="row.verify_type == 1">
              <p>线上订单</p>
              <p v-if="row.verify_order_no">订单号：{{row.verify_order_no}}</p>
            </div>
            <div v-if="row.verify_type == 2">
              <p>门店核销</p>
              <p v-if="row.verify_store_name">核销门店：{{row.verify_store_name}}</p>
              <p v-if="row.verify_store_user">核销人：{{row.verify_store_user}}</p>
            </div>
          </template>
        </vxe-table-column>
        <vxe-table-column field="user_mobile" title="使用人手机号" width="120"></vxe-table-column>
        <vxe-table-column field="expired_time" title="过期时间" width="150"></vxe-table-column>
        <vxe-table-column field="dispatch_time" title="分配时间" width="150"></vxe-table-column>
        <vxe-table-column field="activation_time" title="激活时间" width="150"></vxe-table-column>
        <vxe-table-column field="usage_time" title="使用时间" width="150"></vxe-table-column>
        <vxe-table-column field="invalid_time" title="作废时间" width="150"></vxe-table-column>
        <vxe-table-column field="updated_at" title="最近更新时间" width="150"></vxe-table-column>
        <vxe-table-column field="remark" title="备注" width="150"></vxe-table-column>
        <!-- 操作悬浮在表格上面 -->
        <!-- <vxe-table-column fixed="right" title="操作" width="150">
          <template slot-scope="{ row }">
            <a @click="couponModelDetails(row)">详情</a>
            <Divider type="vertical" />
            <a @click="couponCrabExport(row)">导出</a>
          </template>
        </vxe-table-column> -->
        
      </vxe-table>
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
    <!-- 门店弹窗 -->
    <Modal
      v-model="showSelectStoreModal"
      title="选择门店"
      @on-ok="confirmSelectStore"
    >
      <Select v-model="selectedStoreId" placeholder="请选择门店">
        <Option
          v-for="store in storeList"
          :key="store.id"
          :value="store.id"
          :label="store.name"
        ></Option>
      </Select>
    </Modal>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  couponCrabListApi,
  couponDispatchApi,
  couponCancelDispatchApi,
  couponInvalidApi,
  couponUpdateRemarkApi,
  couponExportCrabApi,
  couponActivationApi,
  couponCancelActivationApi
} from "@/api/marketing";
import { storeListApi } from "@/api/store";
import editFrom from "@/components/from/from";
import { formatDate } from "@/utils/validate";
import timeOptions from '@/utils/timeOptions'
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
      
      tableFrom: {
        page: 1,
        limit: 20,
        ids: "",
        status: "all",
      },
      tableList: [],
      total: 0,
      FromData: null,
      selectEquipsIds: [], // 选中的id
      selectEquips: [], // 选中的数据

      showSelectStoreModal: false,
      storeList: [],
      selectedStoreId: null,
      selectedStoreName: "",

      timeVal:[], // 时间
      options: timeOptions, // 时间选择器
      checkUidList: [], // 选中的id
      isAll: false, // 是否全选
      isCheckBox: false,
    };
  },
  created() {
    // 获取别的页面过来的参数
    if (this.$route.query.name) {
      this.tableFrom.name = this.$route.query.name;
    }
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
      const link = document.createElement("a");
      link.href = url;
      link.download = filename || "file";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    // 导出数据  
    async couponExportCrab() {
      // 如果 ids 为空，则根据其他查询条件导出数据
      if (this.checkUidList.length === 0) {
        this.tableFrom.ids = "";
      } else {
        // 如果 ids 不为空，则仅导出这些 ids 对应的数据
        this.tableFrom.ids = this.checkUidList.join(",");
      }
      try {
        const response = await couponExportCrabApi(this.tableFrom);
        if (response.status === 200) {
          const fileUrl = response.data[0]; // 获取文件链接
          const fileName = fileUrl.substring(fileUrl.lastIndexOf("/") + 1);
          this.downloadFileFromUrl(fileUrl, fileName);
          // this.$Message.success("导出成功");
        } else {
          this.$Message.error(response.msg || "导出失败");
        }
      } catch (error) {
        console.error("API 调用出错:", error);
        this.$Message.error("导出失败,错误400," + error.msg);
      }
    },
    //切换订单状态 onClickTab
    onClickTab(e){
      this.tableFrom.status = e;
      this.isAll = 0;
      this.isCheckBox = false;
      this.$refs.cTable.setAllCheckboxRow(false);
      this.checkUidList = [];
      this.getList();
    },
    //获取选中
    checkboxItem(e){
      let id = parseInt(e.rowid);
      let index = this.checkUidList.indexOf(id);
      if(index !== -1 && this.isAll==0){
        this.checkUidList = this.checkUidList.filter((item)=> item !== id);
      }else{
        this.checkUidList.push(id);
      }
    },
    checkboxAll(){
      // 获取选中当前值
      let obj2 = this.$refs.cTable.getCheckboxRecords(true);
      // 获取之前选中值
      let obj = this.$refs.cTable.getCheckboxReserveRecords(true);
      obj = obj.concat(obj2);
      let ids = [];
      obj.forEach((item)=>{
        ids.push(parseInt(item.id))
      })
      this.checkUidList = ids;
      console.log(this.checkUidList ,'sdsds')
      if(!obj2.length){
        this.isCheckBox = false;
      }
    },
    allPages(e){
      this.isAll = e;
      if(e==0){
        this.$refs.cTable.toggleAllCheckboxRow();
        this.checkboxAll();
      }else{
        if(!this.isCheckBox){
          this.$refs.cTable.setAllCheckboxRow(true);
          this.isCheckBox = true;
          this.isAll = 1;
        }else{
          this.$refs.cTable.setAllCheckboxRow(false);
          this.isCheckBox = false;
          this.isAll = 0;
        }
        this.checkUidList = []
      }
    },
    // 具体日期
    onchangeTime(e) {
      if (e[1].slice(-8) === '00:00:00') {
        e[1] = e[1].slice(0, -8) + '23:59:59'
        this.timeVal = e
      } else {
        this.timeVal = e
      }
      // this.tableFrom.usage_time = this.timeVal[0] ? this.timeVal.join('-') : []
      if (this.timeVal.length > 0) {
        let startTime = this.timeVal[0].replace(/\//g, '-');
        let endTime = this.timeVal[1].replace(/\//g, '-');
        this.tableFrom.usage_time = [startTime, endTime];
      } else {
        this.tableFrom.usage_time = [];
      }
      this.getList()
    },

    // 激活卡券
    async activateCoupon() {
      // 确认激活操作
      this.$Modal.confirm({
        title: "激活卡券",
        content: `您一共选择了 ${this.checkUidList.length} 卡券进行激活，确认激活吗？`,
        onOk: async () => {
          try {
            const response = await couponActivationApi({
              ids: this.checkUidList.join(","),
            });
            if (response.status === 200) {
              this.$Message.success("激活成功");
              this.getList();
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              this.$Message.error(response.msg || "激活失败");
            }
          } catch (error) {
            console.error("API 调用出错:", error);
            this.$Message.error("激活失败,错误400," + error.msg);
          }
        },
      });
    },
    // 取消激活卡券
    async deactivateCoupon() {
      // 确认取消激活操作
      this.$Modal.confirm({
        title: "取消激活",
        content: `确定取消激活 ${this.checkUidList.length} 张卡券吗？取消激活操作会作废相应的应付账单，确认该操作吗？`,
        onOk: async () => {
          try {
            const response = await couponCancelActivationApi({
              ids: this.checkUidList.join(","),
            });
            if (response.status === 200) {
              this.$Message.success("取消激活成功");
              this.getList();
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              this.$Message.error(response.msg || "取消激活失败");
            }
          } catch (error) {
            console.error("API 调用出错:", error);
            this.$Message.error("取消激活失败,错误400," + error.msg);
          }
        },
      });
    },
    // 分配卡券按钮获取门店列表
    async couponDispatch() {
      // 获取门店列表
      const storeResponse = await storeListApi();
      if (storeResponse.status !== 200) {
        this.$Message.error("获取门店列表失败");
        return;
      }

      this.storeList = storeResponse.data.list;
      // 显示门店选择模态框
      this.showSelectStoreModal = true;
    },
    // 门店选择模态框确认按钮 选择门店
    async confirmSelectStore() {
      const selectedStore = this.storeList.find(
        (store) => store.id === this.selectedStoreId
      );
      if (!selectedStore) {
        this.$Message.error("请选择一个门店");
        return;
      }
      this.selectedStoreName = selectedStore.name;
      this.showSelectStoreModal = false;
      // 确认分配操作
      this.$Modal.confirm({
        title: "分配卡券",
        content: `确定分配 ${this.checkUidList.length} 张卡券给 ${
          this.selectedStoreName
        } 吗？`,
        onOk: async () => {
          try {
            const response = await couponDispatchApi({
              ids: this.checkUidList.join(","),
              store_id: this.selectedStoreId,
              store_name: this.selectedStoreName,
            });
            console.log(response, "response");
            if (response.status === 200) {
              this.$Message.success("分配卡券成功");
              this.getList();
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              this.$Message.error(response.msg);
            }
          } catch (error) {
            console.error("API 调用出错:", error);
            this.$Message.error("分配卡券失败,错误400," + error.msg);
          }
        },
      });
    },

    // 取消分配券
    async couponCancelDispatch() {
      // 确认取消分配操作
      this.$Modal.confirm({
        title: "取消分配",
        content: `确定取消分配 ${this.checkUidList.length} 张卡券吗？`,
        onOk: async () => {
          try {
            const response = await couponCancelDispatchApi({
              ids: this.checkUidList.join(","),
            });
            if (response.status === 200) {
              this.$Message.success("取消分配成功");
              this.getList();
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              console.log(response, "sdsd");
              this.$Message.error(response.msg || "取消分配失败");
            }
          } catch (error) {
            console.error("API 调用出错:", error);
            this.$Message.error("取消分配失败,错误400," + error.msg);
          }
        },
      });
    },

    async couponInvalid() {
      // 确认作废操作
      this.$Modal.confirm({
        title: "作废卡券",
        content: `确定作废 ${this.checkUidList.length} 张卡券吗？`,
        onOk: async () => {
          try {
            const response = await couponInvalidApi({
              ids: this.checkUidList.join(","),
            });

            if (response.status === 200) {
              this.$Message.success("作废卡券成功");
              this.getList()
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              this.$Message.error(response.msg || "作废卡券失败");
            }
          } catch (error) {
            console.error("API 调用出错:", error);
            this.$Message.error("作废卡券失败,错误400," + error.msg);
          }
        },
      });
    },

    // 更新券的备注
    async couponUpdateRemark() {
      this.$Modal.confirm({
        title: "更新备注",
        render: (h) => {
          return h("Input", {
            props: {
              value: this.remark,
              placeholder: "请输入新的备注",
            },
            on: {
              input: (val) => {
                this.remark = val;
              },
            },
          });
        },
        onOk: async () => {
          try {
            const remark = this.remark;
            const response = await couponUpdateRemarkApi({
              ids: this.checkUidList.join(","),
              remark: remark,
            });

            if (response.status === 200) {
              this.$Message.success("更新券备注成功");
              this.getList();
              this.checkUidList = [];
              this.$refs.cTable.clearCheckboxRow();
            } else {
              this.$Message.error(response.msg || "更新券备注失败");
            }
          } catch (error) {
            this.$Message.error("更新券备注失败");
          }
        },
      });
    },

  
    // 详情
    couponModelDetails(row, index) {
      this.$router.push({
        path: this.roterPre + "/marketing/model_coupon_issue/index",
        query: { id: row.id },
      });
    },
    // 列表
    getList() {
      this.loading = true;
      couponCrabListApi(this.tableFrom)
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
    // 分页
    pageChange(index) {
      
      this.tableFrom.page = index;
      this.getList();
    },
    // 每页显示条数
    changeType(data) {
      this.type = data;
    },
    add() {
      console.log(this.roterPre, "sds");
      this.$router.push({
        path: this.roterPre + "/marketing/coupon_model/create",
      });
    },
    // 表格搜索
    userSearchs() {
      this.tableFrom.page = 1;
      this.getList();
    },
    // 选择使用时间方法
    selectUsageTime(e) {
      console.log(e, "e");
      this.tableFrom.usage_time = e;
      this.userSearchs();
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
.tool-but{
  display: flex;
 
  width: 100%;
}
</style>
