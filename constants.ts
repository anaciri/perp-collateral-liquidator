require("dotenv").config({ path: `.env.build` })

import _ from "lodash"

export const OPTIMISM_WEB3_ENDPOINT = _.defaultTo(process.env["OPTIMISM_WEB3_ENDPOINT"], "")
export const COMPANION_NETWORK = _.defaultTo(process.env["COMPANION_NETWORK"], "")


if (_.isEmpty(OPTIMISM_WEB3_ENDPOINT)) {
    console.warn("OPTIMISM_WEB3_ENDPOINT is empty")
}
if (_.isEmpty(COMPANION_NETWORK)) {
    console.warn("COMPANION_NETWORK is empty")
}
