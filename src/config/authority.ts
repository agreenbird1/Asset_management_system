import {
  HomeOutline,
  AlbumsOutline,
  FileTrayOutline,
  ColorFilterOutline,
  RecordingOutline,
  EllipsisVerticalCircleOutline,
  Settings
} from '@vicons/ionicons5'

export type AsideAuthorityItem = {
  index: number
  label: string
  icon:  any
  route: string
}
export const asideAuthority: AsideAuthorityItem[] = [
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
    label: '企业/部门成员',
    icon: ColorFilterOutline,
    route: '/enterprise-member',
  },
  {
    index: 3,
    label: '审批',
    icon: FileTrayOutline,
    route: '/approval',
  },
  {
    index: 3,
    label: '资产监控',
    icon: RecordingOutline,
    route: '/asset-monitoring',
  },
  {
    index: 3,
    label: '企业资产管理',
    icon: EllipsisVerticalCircleOutline,
    route: '/enterprise-assets',
  },
  {
    index: 2,
    label: '公告配置',
    icon: Settings,
    route: '/announcement-configuration',
  },
]
