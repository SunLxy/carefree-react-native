import { HOOK_MARK } from 'rc-field-form/lib/FieldContext'
import {
  InternalFormInstance,
  InternalNamePath,
  FormInstance,
  InternalHooks,
} from 'rc-field-form/lib/interface'

// 根据 Form.useForm() 返回值 [from] 进行获取子项中更新值的方法
export const getItemFun = (form: FormInstance) => {
  let childFun: any = {}
  if (form) {
    const { getInternalHooks } = form as InternalFormInstance
    childFun = getInternalHooks(HOOK_MARK)
  }
  const updateValue = (namePath: InternalNamePath, value: any) => {
    if (childFun.dispatch) {
      childFun.dispatch({
        type: 'updateValue',
        namePath,
        value,
      })
    }
  }
  return {
    ...childFun,
    updateValue,
  }
}

export type GetItemFunType = InternalHooks & {
  updateValue: (namePath: InternalNamePath, value: any) => void
}

export function toArray<T>(candidate?: T | T[] | false): T[] {
  if (candidate === undefined || candidate === false) {return []}

  return Array.isArray(candidate) ? candidate : [candidate]
}

export function getFieldId(
  namePath: InternalNamePath,
  formName?: string,
): string | undefined {
  if (!namePath.length) {return undefined}

  const mergedId = namePath.join('_')
  return formName ? `${formName}_${mergedId}` : mergedId
}
