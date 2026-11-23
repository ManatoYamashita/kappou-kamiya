import { useSyncExternalStore } from 'react';

// 購読する変化は無い（ハイドレーションの前後で値が切り替わるだけ）ため、何もしない購読関数を渡す。
const subscribe = () => () => {};

/**
 * ハイドレーションが終わったかを返す。
 * サーバー描画とハイドレーションの時点では false、その後のクライアントでは true になる。
 * effect の中で setState して「マウント済み」を立てる書き方の代わりに使う。
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
}
