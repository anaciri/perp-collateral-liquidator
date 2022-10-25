import "@nomiclabs/hardhat-ethers"
import "@nomiclabs/hardhat-vyper"
import "@nomiclabs/hardhat-waffle"
import "@typechain/hardhat"
import "hardhat-contract-sizer"
import "hardhat-deploy"
import "hardhat-deploy-ethers"
import "hardhat-gas-reporter"
import { HardhatUserConfig } from "hardhat/config"
import "solidity-coverage"
import "./mocha-test"
import { getUrl, hardhatForkConfig } from "./scripts/hardhatConfig"

enum ChainId {
    OPTIMISM_CHAIN_ID = 10,
    OPTIMISM_KOVAN_CHAIN_ID = 69,
}

enum CompanionNetwork {
    optimism = "optimism",
    optimismKovan = "optimismKovan",
}

const config: HardhatUserConfig = {
    solidity: {
        version: "0.7.6",
        settings: {
            optimizer: { enabled: true, runs: 100 },
            evmVersion: "berlin",
            // for smock to mock contracts
            outputSelection: {
                "*": {
                    "*": ["storageLayout"],
                },
            },
        },
    },
    vyper: {
        compilers: [{ version: "0.2.16" }, { version: "0.3.1" }, { version: "0.2.7" }],
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true,
            saveDeployments: true,
            ...hardhatForkConfig(),
            // forking: {
            //     enabled: true,
            //     url: "",
            //     blockNumber: 7479397,
            // },
        },
        optimismKovan: {
            url: getUrl(CompanionNetwork.optimismKovan),
            chainId: ChainId.OPTIMISM_KOVAN_CHAIN_ID,
        },
        optimism: {
            url: getUrl(CompanionNetwork.optimism),
            chainId: ChainId.OPTIMISM_CHAIN_ID,
        },
    },
    namedAccounts: {
        deployer: 0, // 0 means ethers.getSigners[0]
        cleanAccount: 1,

        uniswapV3Router: {
            // TODO WIP
            [ChainId.OPTIMISM_CHAIN_ID]: "",
            [ChainId.OPTIMISM_KOVAN_CHAIN_ID]: "",
        },
    },
    // so we can load the contract artifacts in tests
    external: {
        contracts: [
            {
                artifacts: "node_modules/@openzeppelin/contracts/build",
            },
            {
                artifacts: "node_modules/@uniswap/v3-core/artifacts/contracts",
            },
            {
                artifacts: "node_modules/@uniswap/v3-periphery/artifacts/contracts",
            },
            {
                artifacts: "node_modules/@perp/perp-oracle-contract/artifacts/contracts",
            },
            {
                artifacts: "node_modules/@perp/curie-deployments/optimism-kovan/core/artifacts/contracts",
            },
            {
                artifacts: "test/artifacts",
            },
        ],
    },
    contractSizer: {
        alphaSort: true,
        runOnCompile: true,
        disambiguatePaths: false,
    },
    gasReporter: {
        excludeContracts: ["test"],
    },
    mocha: {
        require: ["ts-node/register/files"],
        jobs: 4,
        timeout: 120000,
        color: true,
    },
}

export default config
