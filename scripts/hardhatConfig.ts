import {
    COMPANION_NETWORK,
    OPTIMISM_WEB3_ENDPOINT,
} from "../constants"

export function getUrl(network: string) {
    const NetworkUrl = {
        optimism: OPTIMISM_WEB3_ENDPOINT,
    }

    return NetworkUrl[network] ? NetworkUrl[network] : ""
}


export function hardhatForkConfig() {
    return COMPANION_NETWORK
        ? {
              forking: {
                  enabled: true,
                  url: getUrl(COMPANION_NETWORK),
              },
              companionNetworks: {
                  fork: COMPANION_NETWORK,
              },
          }
        : {}
}
