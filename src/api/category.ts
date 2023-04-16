import request from './request'

/** 1：资产分类 2：部门分类 */
export type CategoryType = 1 | 2

export type ICategory = {
  id: number
  name: string
  type: CategoryType
  children: ICategory[]
}

export class CategoryApi {
  // 创建分类
  static createCategory(name: string, type: CategoryType, parentId?: number) {
    return request.post('/category', { name, type, parentId })
  }
  // 删除分类
  static deleteCategory(id: number) {
    return request.delete(`/category/${id}`)
  }
  // 更新分类
  static patchCategory(id: number, name: string) {
    return request.patch(`/category/${id}`, { name })
  }
  // 获取分类
  static getCategory(type: CategoryType) {
    return request.get<ICategory[]>(`/category/${type}`)
  }
}
