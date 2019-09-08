import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  {path: '/login', component: () => import('@/views/login/index'), hidden: true},
  {path: '/404', component: () => import('@/views/404'), hidden: true},
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: {title: '首页', icon: 'home'}
    }]
  },
  //用户管理
  {
    path: '/conduct',
    component: Layout,
    redirect: '/conduct/userlist',
    name: 'conduct',
    meta: {title: '用户管理', icon: 'product'},
    children: [{
        path: 'userlist',
        name: 'userlist',
        component: () => import('@/views/conduct/userlist/index'),
        meta: {title: '用户列表', icon: 'product-list'}
      },
      {
        path: 'userDetail',
        name: 'userDetail',
        component: () => import('@/views/conduct/userlist/userDetail'),
        meta: {title: '用户详情',type:'Array'},
        hidden: true
      }
    ]
  },
  //店铺管理
  {
    path: '/Shopconduct',
    component: Layout,
    redirect: '/Shopconduct/Shoplist',
    name: 'Shopconduct',
    meta: {title: '店铺管理', icon: 'product'},
    children: [{
        path: 'Shoplist',
        name: 'Shoplist',
        component: () => import('@/views/Shopconduct/Shoplist/index'),
        meta: {title: '店铺入驻申请', icon: 'product-list'}
      },
      {
        path: 'ShopDetail',//个人
        name: 'ShopDetail',
        component: () => import('@/views/Shopconduct/Shoplist/ShopDetail'),
        meta: {title: '店铺入驻详情', type:'Array'},
        hidden: true
      },
      {
        path: 'companyDetail',//企业
        name: 'companyDetail',
        component: () => import('@/views/Shopconduct/Shoplist/companyDetail'),
        meta: {title: '店铺入驻详情', type:'Array'},
        hidden: true
      },
      {
        path: 'beenShoplist',  //已经入驻店铺
        name: 'beenShoplist',
        component: () => import('@/views/Shopconduct/beenlist/index'),
        meta: {title: '店铺列表', icon: 'product-list'},
      },
      {
        path: 'beenShopDetail',//个人
        name: 'beenShopDetail',
        component: () => import('@/views/Shopconduct/beenlist/ShopDetail'),
        meta: {title: '已入驻店铺详情',type:'Array'},
        hidden: true
      },
      {
        path: 'beencompanyDetail',//企业
        name: 'beencompanyDetail',
        component: () => import('@/views/Shopconduct/beenlist/companyDetail'),
        meta: {title: '已入驻店铺详情',type:'Array'},
        hidden: true
      },
      {
        path: 'mediacompany',
        name: 'mediacompany',
        component: () => import('@/views/Shopconduct/media-company'),
        meta: {title: '隶属媒体公司', icon: 'product-list'},
      },
      {
        path: 'mediaQua',
        name: 'mediaQua',
        component: () => import('@/views/Shopconduct/mediaQua'),
        meta: {title: '店铺媒介资质', icon: 'product-list'},
      }
    ]
  },
  //内容管理
  {
    path: '/cms',
    component: Layout,
    redirect: '/cms/Shoplist',
    name: 'cms',
    meta: {title: '内容管理', icon: 'product'},
    children: [{
        path: 'serve',
        name: 'serve',
        component: () => import('@/views/cms/serve/index'),
        meta: {title: '服务品牌管理', icon: 'product-list'}
      },
      {
        path: 'specs',
        name: 'specs',
        component: () => import('@/views/cms/specs/index'),
        meta: {title: '规格属性管理', icon: 'product-list'},
      },
     
    ]
  },
  {
    path: '/pms',
    component: Layout,
    redirect: '/pms/product',
    name: 'pms',
    meta: {title: '商品', icon: 'product'},
    children: [{
      path: 'product',
      name: 'product',
      component: () => import('@/views/pms/product/index'),
      meta: {title: '商品列表', icon: 'product-list'}
    },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: () => import('@/views/pms/product/add'),
        meta: {title: '添加商品', icon: 'product-add'}
      },
      {
        path: 'updateProduct',
        name: 'updateProduct',
        component: () => import('@/views/pms/product/update'),
        meta: {title: '修改商品', icon: 'product-add'},
        hidden: true
      },
      {
        path: 'productRecycle',
        name: 'productRecycle',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品回收站', icon: 'product-recycle'},
        hidden: true
      },
      {
        path: 'productComment',
        name: 'productComment',
        component: () => import('@/views/pms/product/index'),
        meta: {title: '商品评价', icon: 'product-comment'},
        hidden: true
      },
      {
        path: 'productCate',
        name: 'productCate',
        component: () => import('@/views/pms/productCate/index'),
        meta: {title: '商品分类', icon: 'product-cate'}
      },
      {
        path: 'addProductCate',
        name: 'addProductCate',
        component: () => import('@/views/pms/productCate/add'),
        meta: {title: '添加商品分类'},
        hidden: true
      },
      {
        path: 'updateProductCate',
        name: 'updateProductCate',
        component: () => import('@/views/pms/productCate/update'),
        meta: {title: '修改商品分类'},
        hidden: true
      },
      {
        path: 'productAttr',
        name: 'productAttr',
        component: () => import('@/views/pms/productAttr/index'),
        meta: {title: '商品类型', icon: 'product-attr'}
      },
      {
        path: 'productAttrList',
        name: 'productAttrList',
        component: () => import('@/views/pms/productAttr/productAttrList'),
        meta: {title: '商品属性列表'},
        hidden: true
      },
      {
        path: 'addProductAttr',
        name: 'addProductAttr',
        component: () => import('@/views/pms/productAttr/addProductAttr'),
        meta: {title: '添加商品属性'},
        hidden: true
      },
      {
        path: 'updateProductAttr',
        name: 'updateProductAttr',
        component: () => import('@/views/pms/productAttr/updateProductAttr'),
        meta: {title: '修改商品属性'},
        hidden: true
      },
      {
        path: 'brand',
        name: 'brand',
        component: () => import('@/views/pms/brand/index'),
        meta: {title: '品牌管理', icon: 'product-brand'}
      },
      {
        path: 'addBrand',
        name: 'addBrand',
        component: () => import('@/views/pms/brand/add'),
        meta: {title: '添加品牌'},
        hidden: true
      },
      {
        path: 'updateBrand',
        name: 'updateBrand',
        component: () => import('@/views/pms/brand/update'),
        meta: {title: '编辑品牌'},
        hidden: true
      }
    ]
  },
  {
    path: '/oms',
    component: Layout,
    redirect: '/oms/order',
    name: 'oms',
    meta: {title: '订单', icon: 'order'},
    children: [
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/oms/order/index'),
        meta: {title: '订单列表', icon: 'product-list'}
      },
      {
        path: 'orderDetail',
        name: 'orderDetail',
        component: () => import('@/views/oms/order/orderDetail'),
        meta: {title: '订单详情'},
        hidden:true
      },
      {
        path: 'deliverOrderList',
        name: 'deliverOrderList',
        component: () => import('@/views/oms/order/deliverOrderList'),
        meta: {title: '发货列表'},
        hidden:true
      },
      {
        path: 'orderSetting',
        name: 'orderSetting',
        component: () => import('@/views/oms/order/setting'),
        meta: {title: '订单设置', icon: 'order-setting'}
      },
      {
        path: 'returnApply',
        name: 'returnApply',
        component: () => import('@/views/oms/apply/index'),
        meta: {title: '退货申请处理', icon: 'order-return'}
      },
      {
        path: 'returnReason',
        name: 'returnReason',
        component: () => import('@/views/oms/apply/reason'),
        meta: {title: '退货原因设置', icon: 'order-return-reason'}
      },
      {
        path: 'returnApplyDetail',
        name: 'returnApplyDetail',
        component: () => import('@/views/oms/apply/applyDetail'),
        meta: {title: '退货原因详情'},
        hidden:true
      }
    ]
  },
  {
    path:'/sms',
    component: Layout,
    redirect: '/sms/coupon',
    name: 'sms',
    meta: {title: '营销', icon: 'sms'},
    children: [
      {
        path: 'flash',
        name: 'flash',
        component: () => import('@/views/sms/flash/index'),
        meta: {title: '秒杀活动列表', icon: 'sms-flash'}
      },
      {
        path: 'flashSession',
        name: 'flashSession',
        component: () => import('@/views/sms/flash/sessionList'),
        meta: {title: '秒杀时间段列表'},
        hidden:true
      },
      {
        path: 'selectSession',
        name: 'selectSession',
        component: () => import('@/views/sms/flash/selectSessionList'),
        meta: {title: '秒杀时间段选择'},
        hidden:true
      },
      {
        path: 'flashProductRelation',
        name: 'flashProductRelation',
        component: () => import('@/views/sms/flash/productRelationList'),
        meta: {title: '秒杀商品列表'},
        hidden:true
      },
      {
        path: 'coupon',
        name: 'coupon',
        component: () => import('@/views/sms/coupon/index'),
        meta: {title: '优惠券列表', icon: 'sms-coupon'}
      },
      {
        path: 'addCoupon',
        name: 'addCoupon',
        component: () => import('@/views/sms/coupon/add'),
        meta: {title: '添加优惠券'},
        hidden:true
      },
      {
        path: 'updateCoupon',
        name: 'updateCoupon',
        component: () => import('@/views/sms/coupon/update'),
        meta: {title: '修改优惠券'},
        hidden:true
      },
      {
        path: 'couponHistory',
        name: 'couponHistory',
        component: () => import('@/views/sms/coupon/history'),
        meta: {title: '优惠券领取详情'},
        hidden:true
      },
      {
        path: 'brand',
        name: 'homeBrand',
        component: () => import('@/views/sms/brand/index'),
        meta: {title: '品牌推荐', icon: 'product-brand'}
      },
      {
        path: 'new',
        name: 'homeNew',
        component: () => import('@/views/sms/new/index'),
        meta: {title: '新品推荐', icon: 'sms-new'}
      },
      {
        path: 'hot',
        name: 'homeHot',
        component: () => import('@/views/sms/hot/index'),
        meta: {title: '人气推荐', icon: 'sms-hot'}
      },
      {
        path: 'subject',
        name: 'homeSubject',
        component: () => import('@/views/sms/subject/index'),
        meta: {title: '专题推荐', icon: 'sms-subject'}
      },
      {
        path: 'advertise',
        name: 'homeAdvertise',
        component: () => import('@/views/sms/advertise/index'),
        meta: {title: '广告列表', icon: 'sms-ad'}
      },
      {
        path: 'addAdvertise',
        name: 'addHomeAdvertise',
        component: () => import('@/views/sms/advertise/add'),
        meta: {title: '添加广告'},
        hidden:true
      },
      {
        path: 'updateAdvertise',
        name: 'updateHomeAdvertise',
        component: () => import('@/views/sms/advertise/update'),
        meta: {title: '编辑广告'},
        hidden:true
      }
    ]
  },
  //工具市场
  {
    path: '/tool',
    component: Layout,
    redirect: '/tool/market',
    name: 'tool',
    meta: {title: '工具市场', icon: 'order'},
    children: [
      {
        path: 'Market', //店铺会员升级
        name: 'Market',
        component: () => import('@/views/tool/market'),
        meta: {title: '店铺会员升级', icon: 'product-list', type:'Array'}
      },
      // {
      //   path: 'Category', //技能类目
      //   name: 'Category',
      //   component: () => import('@/views/tool/category'),
      //   meta: {title: '技能类目', icon: 'product-list'}
      // }
    ]
  },
  //系统设置
  {
    path: '/system',
    component: Layout,
    redirect: '/system/unitmanage',
    name: 'system',
    meta: {title: '系统设置', icon: 'order'},
    children: [ 
      {
        path: 'Temmanage', //模板管理
        name: 'Temmanage',
        component: () => import('@/views/system/temmanage'),
        meta: {title: '模板管理', icon: 'product-list'}
      },
      {
        path: 'typemanage',
        name: 'typemanage',
        component: () => import('@/views/system/typemanage'),
        meta: {title: '分类管理', icon: 'product-list'}
      },
      {
        path: 'Addservice', //增值服务管理
        name: 'Addservice',
        component: () => import('@/views/system/addservice'),
        meta: {title: '增值服务管理', icon: 'product-list'}
      },
      {
        path: 'unitmanage',
        name: 'unitmanage',
        component: () => import('@/views/system/management'),
        meta: {title: '单位管理', icon: 'product-list'}
      },
      {
        path: 'Servicefield',
        name: 'Servicefield',
        component: () => import('@/views/system/serfield'),
        meta: {title: '领域管理', icon: 'product-list'}
      },
      {
        path: 'Cluetype', //线索客户类型
        name: 'Cluetype',
        component: () => import('@/views/system/cluetype'),
        meta: {title: '线索客户类型', icon: 'product-list'}
      },
      {
        path: 'Shopgrade', //店铺基础等级管理
        name: 'Shopgrade',
        component: () => import('@/views/system/shopgrade'),
        meta: {title: '店铺基础等级', icon: 'product-list'}
      },
      {
        path: 'Shopmenber', //店铺会员等级管理
        name: 'Shopmenber',
        component: () => import('@/views/system/shopmenber'),
        meta: {title: '店铺会员等级', icon: 'product-list'}
      },
      //广告banner管理
      {
        path: 'Advertisement',
        name: 'Advertisement',
        component: () => import('@/views/system/advertisement'),
        meta: {title: '广告banner管理', icon: 'product-list'}
      },
      //广告位置管理
      {
        path: 'Adverloc',
        name: 'Adverloc',
        component: () => import('@/views/system/adverloc'),
        meta: {title: '广告位置管理', icon: 'product-list'}
      },
      
    ]
  },
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})

