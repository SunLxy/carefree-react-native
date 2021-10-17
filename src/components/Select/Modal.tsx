import React, { useState, useEffect } from 'react'
import { TouchableOpacity, Text, View, Modal, ScrollView } from 'react-native'
import CheckRadio, { CheckRadioProps } from '../CheckRadio'
import styles from './styles'
import { OptionsProps } from '.'

export interface ModalSelectProps {
  visible: boolean
  options: Array<OptionsProps>
  // onChange: (v: string | number | undefined, t: any) => void;
  /** 是否多选 */
  multiple: boolean
  /** 值 */
  value?: Array<string | number> | string | number | undefined
  handleOk: (v: Array<string | number> | string | number | undefined) => void
  handleCancel: () => void
  /** 弹框选择区域高度 */
  height?: number | string
  /** 选中图标显示位置 */
  checkAlign?: 'left' | 'right'
  /** 其他 选项配置 */
  checkOther?: Omit<CheckRadioProps, 'multiple'>
}

const ModalSelect: React.FC<ModalSelectProps> = props => {
  const {
    visible,
    options,
    value,
    multiple,
    handleOk,
    handleCancel,
    height = 400,
    checkOther = {},
    checkAlign,
  } = props
  const [actionValue, setActionValue] = useState(value)
  useEffect(() => {
    setActionValue(value)
  }, [value])

  const handleOnValue = (val: any) => {
    setActionValue(val)
  }

  const handleClose = () => {
    handleCancel()
    setActionValue(value)
  }

  const handleSubmit = () => {
    handleOk(actionValue)
  }

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={handleClose}>
      <View style={styles.modal}>
        <View
          style={{
            width: '95%',
            backgroundColor: '#fff',
            height: height,
            borderRadius: 10,
            padding: 10,
          }}>
          <View style={styles.title}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>请选择</Text>
          </View>
          <ScrollView style={{ flex: 1 }}>
            <CheckRadio
              {...checkOther}
              checkAlign={checkAlign}
              warpSatyle={{ flexWrap: 'nowrap' }}
              flexDirection="column"
              value={actionValue}
              options={options}
              onChange={handleOnValue}
              multiple={multiple}
            />
          </ScrollView>
          <View style={styles.btnWarp}>
            <TouchableOpacity onPress={handleClose} style={styles.btnColse}>
              <Text style={{ fontSize: 18, color: '#000' }}>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSubmit} style={styles.btnOk}>
              <Text style={{ fontSize: 18, color: '#fff' }}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

export default ModalSelect
