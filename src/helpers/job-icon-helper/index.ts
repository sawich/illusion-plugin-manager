import { JobIcon } from "@/store/modules/tasks-module/types";

export const fullJobIconPath = (icon: JobIcon) => {
  return `/icons/jobs/${icon}.png`;
};
