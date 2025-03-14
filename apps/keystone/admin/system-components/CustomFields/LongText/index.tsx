import { text, TextFieldConfig } from "@keystone-6/core/fields";
import { BaseListTypeInfo } from "@keystone-6/core/types";

export function LongText<T extends BaseListTypeInfo>(config: TextFieldConfig<T>) {
    const ui = {
        ...config.ui,
        views: "./admin/system-components/CustomFields/LongText/views"
    };
    return text({
        ...config,
        ui
    });
}
