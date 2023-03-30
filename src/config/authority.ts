import {
  HomeOutline,
  AlbumsOutline,
  BarcodeOutline,
  ColorFilterOutline,
  RecordingOutline,
  EllipsisVerticalCircleOutline,
  AppsOutline,
} from '@vicons/ionicons5'

export const asideAuthority = [
  {
    index: 1,
    label: '我的主页',
    icon: HomeOutline,
    route: '/my-home',
  },
  {
    index: 1,
    label: '我的资产',
    icon: AlbumsOutline,
    route: '/my-assets',
  },
  {
    index: 2,
    label: '资产分类',
    icon: BarcodeOutline,
    route: '/my-home',
  },
  {
    index: 2,
    label: '企业成员',
    icon: ColorFilterOutline,
    route: '/my-home',
  },
  {
    index: 2,
    label: '资产监控',
    icon: RecordingOutline,
    route: '/my-home',
  },
  {
    index: 2,
    label: '企业资产管理',
    icon: EllipsisVerticalCircleOutline,
    route: '/my-home',
  },
  {
    index: 3,
    label: '企业管理',
    icon: AppsOutline,
    route: '/my-home',
  },
]

export type AsideAuthorityItem = typeof asideAuthority[0]
