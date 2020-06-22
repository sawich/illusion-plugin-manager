import i18n from "vue-i18n";
import Vue from "vue";

Vue.use(i18n);

import en_US from "./langs/en";

export default new i18n({
    locale: "en-US",
    messages: { "en-US": en_US },
});
