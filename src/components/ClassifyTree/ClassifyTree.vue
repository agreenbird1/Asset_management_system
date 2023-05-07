<template>
  <aside class="classify-tree">
    <n-tree
      block-line
      :data="treeData"
      :render-suffix="suffix"
      selectable
      label-field="name"
      key-field="id"
      :on-update:selected-keys="selectNode"
    />
    <div class="button-wrapper mt-30">
      <span class="add-button" @click="addVisible = true"> +{{ title }} </span>
    </div>

    <Dialog
      v-model="addVisible"
      :title="title"
      @confirm="confirmAdd"
      @cancel="cancelAdd"
      @close="closeAddDialog"
    >
      <n-form
        ref="addFormRef"
        inline
        label-placement="left"
        :label-width="80"
        :model="addForm"
        :rules="addRules"
      >
        <n-form-item label="分类名称" path="value" style="width: 100%">
          <n-input v-model:value="addForm.value" placeholder="输入分类名称" />
        </n-form-item>
      </n-form>
    </Dialog>

    <Dialog
      v-model="updateVisible"
      title="修改分类"
      @confirm="confirmUpdate"
      @cancel="cancelUpdate"
    >
      <n-form
        ref="updateFormRef"
        inline
        label-placement="left"
        :label-width="80"
        :model="updateForm"
        :rules="updateRules"
      >
        <n-form-item label="分类名称" path="value" style="width: 100%">
          <n-input
            v-model:value="updateForm.value"
            placeholder="输入分类名称"
          />
        </n-form-item>
      </n-form>
    </Dialog>

    <Dialog
      v-model="deleteVisible"
      title="删除分类"
      @confirm="confirmDelete"
      @cancel="deleteVisible = false"
    >
      删除分类后，会随之删除分类下所有的内容，确定删除吗？
    </Dialog>
  </aside>
</template>

<script setup lang="ts">
import { CategoryType, CategoryApi, ICategory } from '@/api/category'
import Dialog from '../Dialog/index.vue'
import { h, reactive, ref } from 'vue'
import { FormInst, NButton, TreeOption } from 'naive-ui'

interface IProps {
  type: CategoryType
  title: string
}

const props = defineProps<IProps>()
const emits = defineEmits(['selectNode'])

const treeData = ref<ICategory[]>([])

const useAddDialog = () => {
  const addVisible = ref(false)
  const addForm = reactive({
    value: '',
  })
  const addFormRef = ref<FormInst | null>(null)
  const addRules = {
    value: { required: true, message: '请输入分类名称', trigger: 'blur' },
  }
  let parentId: number | undefined

  const closeAddDialog = () => {
    addVisible.value = false
    addForm.value = ''
    parentId = undefined
  }
  const openAddDialog = (id: number) => {
    parentId = id
    addVisible.value = true
  }

  const confirmAdd = () => {
    addFormRef.value?.validate((errors) => {
      if (!errors) {
        CategoryApi.createCategory(addForm.value, props.type, parentId).then(
          (res) => {
            closeAddDialog()
            initData()
          }
        )
      }
    })
  }
  const cancelAdd = () => {
    closeAddDialog()
  }

  return {
    confirmAdd,
    cancelAdd,
    addVisible,
    addForm,
    addRules,
    addFormRef,
    openAddDialog,
    closeAddDialog,
  }
}

const {
  confirmAdd,
  cancelAdd,
  addVisible,
  addForm,
  addRules,
  addFormRef,
  openAddDialog,
  closeAddDialog,
} = useAddDialog()

const useUpdateDialog = () => {
  const updateVisible = ref(false)
  const updateForm = reactive({
    value: '',
  })
  const updateFormRef = ref<FormInst | null>(null)
  const updateRules = {
    value: { required: true, message: '请输入分类名称', trigger: 'blur' },
  }
  let updateId: number

  const openUpdateDialog = (val: string, id: number) => {
    updateForm.value = val
    updateId = id
    updateVisible.value = true
    console.log(updateId)
  }
  const confirmUpdate = () => {
    updateFormRef.value?.validate((errors) => {
      if (!errors) {
        CategoryApi.updateCategory(updateId, updateForm.value).then(() => {
          updateVisible.value = false
          initData()
        })
      }
    })
  }
  const cancelUpdate = () => {
    updateVisible.value = false
  }

  return {
    confirmUpdate,
    cancelUpdate,
    updateVisible,
    updateForm,
    updateRules,
    updateFormRef,
    openUpdateDialog,
  }
}

const {
  confirmUpdate,
  cancelUpdate,
  updateVisible,
  updateForm,
  updateRules,
  updateFormRef,
  openUpdateDialog,
} = useUpdateDialog()

const useDeleteDialog = () => {
  const deleteVisible = ref(false)
  let deleteId: number

  const openDeleteDialog = (id: number) => {
    deleteId = id
    deleteVisible.value = true
  }
  const confirmDelete = () => {
    CategoryApi.deleteCategory(deleteId).then(() => {
      deleteVisible.value = false
      initData()
    })
  }

  return {
    deleteVisible,
    confirmDelete,
    openDeleteDialog,
  }
}
const { deleteVisible, confirmDelete, openDeleteDialog } = useDeleteDialog()

const suffix = ({ option }: { option: ICategory }) => [
  h(
    NButton,
    {
      text: true,
      type: 'primary',
      color: '#6a83d0',
      onClick: (e) => {
        e.stopPropagation()
        openAddDialog(option.id)
      },
    },
    { default: () => '添加' }
  ),
  h(
    NButton,
    {
      text: true,
      type: 'warning',
      class: 'ml-10',
      onClick: (e) => {
        e.stopPropagation()
        openUpdateDialog(option.name, option.id)
      },
    },
    { default: () => '修改' }
  ),
  h(
    NButton,
    {
      text: true,
      type: 'error',
      class: 'ml-10',
      onClick: (e) => {
        e.stopPropagation()
        if (option.children?.length)
          return window.$message.error('请先删除子分类！')
        openDeleteDialog(option.id)
      },
    },
    { default: () => '删除' }
  ),
]

const selectNode = (ids: number[]) => {
  emits('selectNode', ids[0] || undefined)
}

const initData = () =>
  CategoryApi.getCategory(props.type).then((res) => {
    treeData.value = res.data
  })
initData()
</script>

<style scoped lang="less">
.classify-tree {
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  height: 100%;
  min-width: 250px;
  overflow: auto;

  .button-wrapper {
    text-align: center;
  }
  .add-button {
    padding: 5px 10px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
  }
}
</style>
