import { Text } from "@tarojs/taro";
/**
 * 枚举定义工具
 * 示例：
 * const Status = createEnum({
 *     Success: { value: '1', label: '成功', color: 'green'},
 *     Fail: { value: '2', label: '失败', color: 'red' },
 * })
 * 获取枚举值：Status.Success-->value: 1
 * 获取枚举描述：Status.getLabel(Status.Success || 'Success')-->成功
 * 获取枚举Tag：Status.getTag(Status.Success || 'Success')-->Tag
 * 通过枚举值获取选择项：Status.getOption(true) true:带全部选项 -->options
 *
 */
/** 生成全部option */
const generateAllOption = ({ value = "value", label = "label" }) => {
  return {
    key: "",
    name: "全部",
    [value]: "",
    [label]: "全部",
    tag: <Text>全部</Text>,
  };
};
/** 生成option */
const generateOption = ({ option = {}, value = "value", label = "label" }) => {
  return {
    key: option.value,
    name: option.label,
    [value]: option.value,
    [label]: option.label,
    tag: <Text color={option.color}>{option.label}</Text>,
  };
};

export const createEnum = (optionParams = {}) => {
  // 参数的key值
  const paramsKeys = Object.keys(optionParams);

  // 所有的数据选项
  const paramsValues = Object.values(optionParams);

  const keysValues = {};

  paramsKeys.forEach((key) => {
    const option = optionParams[key];
    const { value = "" } = option || "";
    keysValues[key] = value;
  });

  return {
    ...keysValues,
    getTag(keyOrValue = "") {
      const tagKey = Number.isInteger(keyOrValue)
        ? keyOrValue.toString()
        : keyOrValue;
      // key的情况
      const option = optionParams[tagKey] || {};
      const { label = "", color = "" } = option;
      if (label) {
        return color ? (
          <Text color={color}>{label}</Text>
        ) : (
          <Text>{label}</Text>
        );
      }
      // value的情况
      const otherOption = paramsValues.find((item) => {
        return item.value === tagKey;
      });
      const { label: otherLabel = "", color: otherColor = "" } =
        otherOption || {};
      if (otherLabel) {
        return otherColor ? (
          <Text color={otherColor}>{otherLabel}</Text>
        ) : (
          <Text>{otherLabel}</Text>
        );
      }
      return <Text>{tagKey}</Text>;
    },
    getLabel(keyOrValue = "") {
      const labelKey = Number.isInteger(keyOrValue)
        ? keyOrValue.toString()
        : keyOrValue;
      // key的情况
      const option = optionParams[labelKey] || {};
      const { label = "", color = "" } = option;
      if (label) {
        return color ? <span style={{ color: color }}>{label}</span> : label;
      }
      // value的情况
      const otherOption = paramsValues.find((item) => {
        return item.value === labelKey;
      });
      const { label: otherLabel = "", color: otherColor = "" } =
        otherOption || {};
      if (otherLabel) {
        return otherColor ? (
          <span style={{ color: otherColor }}>{otherLabel}</span>
        ) : (
          otherLabel
        );
      }
      return labelKey;
    },
    getOption(params = {}) {
      const { all = false, value = "value", label = "label" } = params;
      const options = paramsKeys.map((key) => {
        const option = optionParams[key];
        return generateOption({ option, value, label });
      });
      if (all) {
        options.unshift(generateAllOption({ value, label }));
      }
      return options;
    },
  };
};
/**
 * 将枚举对象转换成options
 * value=key名称 label=value的名称
 */
export const objectToOptions = (
  enumObject = {},
  all = true,
  value = "value",
  label = "label"
) => {
  const keys = Object.keys(enumObject);

  const options = keys.map((key) => {
    return {
      key: key,
      name: enumObject[key],
      [value]: key,
      [label]: enumObject[key],
    };
  });
  if (all) {
    options.unshift(generateAllOption({ value, label }));
  }
  return options;
};
/**
 * 将枚举对象转换成options
 * value=key名称 label=value的名称
 */
export const arrayToOptions = (
  enumArray = [],
  all = true, // 是否需要空选项'全部'
  value = "value",
  label = "label"
) => {
  const options =
    enumArray.length > 0 &&
    enumArray?.map((item) => {
      return { key: item, name: item, [value]: item, [label]: item };
    });
  if (all) {
    options.unshift(generateAllOption({ value, label }));
  }
  return options;
};

/**
 * 安全获取枚对象举值
 */
export const safeObjectValue = (enumObject = {}, key = "") => {
  if (enumObject.hasOwnProperty(key)) {
    return enumObject[key];
  }
  return key;
};
/**
 * 安全获取数组枚举值
 */
export const safeOptionValue = (options = [], status = "") => {
  const itemArray = options.filter((item) => {
    return item.value === status;
  });

  if (itemArray && itemArray.length > 0) {
    const item = itemArray.shift();
    return item && item.label;
  }
  return status;
};

/**
 * 转换其他对象数组To {value,label}
 */
export const transformObjectToOptions = (
  objectArray = [], // 需要转换的对象数组
  oldValue = "",
  oldLabel = "",
  newValue = "value",
  newLabel = "text"
) => {
  const options = objectArray?.map((item) => {
    return {
      key: item[oldValue],
      name: item[oldLabel],
      [newValue]: item[oldValue],
      [newLabel]: item[oldLabel],
    };
  });
  return options;
};
/**
 * 给一个option增加全部选项
 */
export const pushAllToOptions = (
  options = [],
  value = "value",
  label = "label"
) => {
  const localOptions = [...options];
  localOptions.unshift(generateAllOption({ value, label }));

  return localOptions;
};

/**
 * 从网络返回的option中获取label
 * @param {*} options
 * @param {*} value
 */
export const getOptionLabel = (options = [], value = "") => {
  const option = options?.find((item) => item.value === value);
  const { label = "" } = option || {};
  return label ? label : value;
};

export const getLabel = (pickerData, eventName, defaultText = "请选择") => {
  const eleItem = pickerData[eventName];
  const item = eleItem?.options.find((m) => {
    return m.value == eleItem.value;
  });
  return item?.text || defaultText;
};

export const emptyObject = (obj) => {
  const object = Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== "") {
      acc[key] = value;
    }
    return acc;
  }, {});
  return object || {};
};

export const convertFirstSL = (str) => {
  return str.charAt(0).toLowerCase() + str.slice(1);
};

export const getKeySetOf = (list, keys = []) => {
  let object = {};
  keys.map((item) => {
    object[item] = list[item];
  });
  return object;
};

export const resetPickerObject = (pickerTypeList, keys = []) => {
  let pickerObject = getKeySetOf(pickerTypeList, keys);
  let paramsObject = {};
  for (let key in pickerObject) {
    paramsObject[convertFirstSL(key)] = {
      options: pickerObject[key],
      value: "",
      elementName: convertFirstSL(key),
    };
  }
  return paramsObject;
};

export const getTextArray = (pickerTypeList, keysValue = []) => {
  const list = keysValue;
  let strArray = [];
  list.length > 0 &&
    list.map((item) => {
      const find = pickerTypeList.find((m) => m.value == item);
      strArray.push(find?.text);
    });
  return strArray.join(",");
};

export const getEnumText = (pickerTypeLists, key, value) => {
  const list = getKeySetOf(pickerTypeLists, [key])[key];
  const { text } = list.find((m) => m.value == value);
  return text || "";
};
