import { createEnum } from "@/utils";

/**
 * 页面枚举
 */
export const ActionEnum = createEnum({
  Add: { value: "add", label: "添加", color: "green" },
  Delete: { value: "delete", label: "删除", color: "red" },
  Modify: { value: "modify", label: "修改", color: "orange" },
  View: { value: "view", label: "查看" },
});
