import type { Chain } from 'viem'
import {
  type GetTransactionParameters as viem_GetTransactionParameters,
  type GetTransactionReturnType as viem_GetTransactionReturnType,
  getTransaction as viem_getTransaction,
} from 'viem/actions'

import { type Config } from '../createConfig.js'
import type { SelectChains } from '../types/chain.js'
import type { ChainIdParameter } from '../types/properties.js'
import { type Evaluate } from '../types/utils.js'

export type GetTransactionParameters<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
> = Evaluate<viem_GetTransactionParameters & ChainIdParameter<config, chainId>>

export type GetTransactionReturnType<
  config extends Config = Config,
  chainId extends config['chains'][number]['id'] = config['chains'][number]['id'],
  ///
  chains extends readonly Chain[] = SelectChains<config, chainId>,
> = Evaluate<
  {
    [key in keyof chains]: viem_GetTransactionReturnType<chains[key]>
  }[number]
>

export type GetTransactionError = Error

/** https://alpha.wagmi.sh/core/api/actions/getTransaction */
export function getTransaction<
  config extends Config,
  chainId extends config['chains'][number]['id'],
>(
  config: config,
  parameters: GetTransactionParameters<config, chainId>,
): Promise<GetTransactionReturnType<config, chainId>> {
  const { chainId } = parameters
  const client = config.getClient({ chainId })
  return viem_getTransaction(client, parameters) as unknown as Promise<
    GetTransactionReturnType<config, chainId>
  >
}