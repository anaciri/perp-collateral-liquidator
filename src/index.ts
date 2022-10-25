import { ethers, Wallet } from "ethers"
import { Liquidator } from "./liquidator"
import allMetadata from "./metadata"
require("dotenv").config({ path: `.env.runtime.${process.env.ENV}` })

async function main(): Promise<void> {
    // crash fast on uncaught errors
    const exitUncaughtError = async (err: any): Promise<void> => {
        console.error({
            event: "UncaughtException",
            params: {
                err,
            },
        })
        process.exit(1)
    }
    process.on("uncaughtException", err => exitUncaughtError(err))
    process.on("unhandledRejection", reason => exitUncaughtError(reason))

    const liquidator = new Liquidator()

    await liquidator.setup({
        subgraphEndPt: process.env.SUBGRAPH_ENDPT,
        wallet: new Wallet(process.env.LIQUIDATOR_PK).connect(
            new ethers.providers.JsonRpcProvider(process.env.WEB3_ENDPT, +process.env.NETWORK),
        ),
        liquidatorContractAddr: process.env.LIQUIDATOR_CONTRACT,
        maxSettlementTokenSpent: process.env.MAX_SETTLEMENT_TOKEN_SPENT,
        minSettlementTokenProfit: process.env.MIN_SETTLEMENT_TOKEN_PROFIT,
        pathMap: allMetadata[process.env.NETWORK],
    })
    await liquidator.start()
}

if (require.main === module) {
    main()
}
