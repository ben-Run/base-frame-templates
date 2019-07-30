const NUM_REG = /^[0-9]+([.]{1}[0-9]+){0,1}$/ // 数值
const NUM_DOT2_REG = /^[0-9]+([.]{1}[0-9]{1,2}){0,1}$/ // 小数最多2位的数值
const NUM_DOT6_REG = /^[0-9]+([.]{1}[0-9]{1,6}){0,1}$/ // 小数最多2位的数值
const NUM_4DOT2_REG = /^[0-9]{1,4}([.]{1}[0-9]{1,2}){0,1}$/ // 整数最多4位小数最多2位的数值
const NUM_6DOT2_REG = /^[0-9]{1,6}([.]{1}[0-9]{1,2}){0,1}$/ // 整数最多6位小数最多2位的数值
const INT_REG = /^-?\\d+$/ // 整数
const POS_INT_REG = /^[0-9]*[1-9][0-9]*$/ // 正整数
const NON_NEG_INT_REG = /^\d+$/ // 非负整数（正整数 + 0）
const NEG_INT_REG = /^-[0-9]*[1-9][0-9]*$/ // 负整数
const NON_POS_INT_REG = /^((-\d+)|(0+))$/ // 非正整数（负整数 + 0）
const NON_INT_POINT_GER = /^((-[1-9][0-9]{0,2})|((-[0]\.\d{1,2}|-[1-9][0-9]{0,2}\.\d{1,2}))|(0))$/ // 小数点前不超过4位且小数点后不超过2位的数值
const NUM_PHONE = /^[1][\d]{10}$/  // 手机号
const STR_EMAIL = /^([A-Za-z0-9_\-.\u4e00-\u9fa5])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,8})$/   // 邮箱
const NUM_FIXED_PHONE = /\d{3}-\d{8}|\d{4}-\d{7}/   // 国内电话号码(如：0511-4405222、021-87888822)

export {
  NUM_REG,
  NUM_DOT2_REG,
  NUM_DOT6_REG,
  NUM_4DOT2_REG,
  NUM_6DOT2_REG,
  INT_REG,
  POS_INT_REG,
  NON_NEG_INT_REG,
  NEG_INT_REG,
  NON_POS_INT_REG,
  NON_INT_POINT_GER,
  NUM_PHONE,
  STR_EMAIL,
  NUM_FIXED_PHONE
}
