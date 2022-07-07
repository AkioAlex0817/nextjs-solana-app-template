import bn_js__default from 'bn.js'

declare type BigNumberish = bn_js__default | string | number | bigint
declare function parseBigNumberish(value: BigNumberish): bn_js__default
declare function tenExponentiate(shift: BigNumberish): bn_js__default
declare function divCeil(a: bn_js__default, b: bn_js__default): bn_js__default

export { BigNumberish, divCeil, parseBigNumberish, tenExponentiate }
