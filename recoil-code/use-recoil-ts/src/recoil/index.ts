import { useCallback, useEffect, useState } from "react";

interface Disconnect {
  disconnect: () => void;
}

export class Stateful<T> {
  private listeners = new Set<(value: T) => void>();
  constructor(protected value: T) {}

  snapshot(): T {
    return this.value;
  }

  protected emit() {
    for (let listener of Array.from(this.listeners)) {
      listener(this.snapshot());
    }
  }

  protected update(value: T) {
    if (this.value !== value) {
      this.value = value;
      this.emit();
    }
  }

  public subscribe(callback: (value: T) => void): Disconnect {
    this.listeners.add(callback);
    return {
      disconnect: () => {
        this.listeners.delete(callback);
      },
    };
  }
}
export class Atom<T> extends Stateful<T> {
  public setState(value: T) {
    super.update(value);
  }
}

export function atom<V>(value: {
  key: string; //唯一标识
  default: V; //默认值
}) {
  return new Atom(value.default);
}

export function useRecoilValue<T>(value: Stateful<T>) {
  const [, updateState] = useState({});
  useEffect(() => {
    const { disconnect } = value.subscribe(() => updateState({}));
    return () => disconnect();
  }, [value]);
  return value.snapshot();
}

function tuplify<T extends any[]>(...elements: T) {
  return elements;
}

interface IGeneric {
  get(dep: Stateful<any>): any;
}

export class Selector<V> extends Stateful<V> {
  constructor(private readonly generate: SelectorGenerator<V>) {
    super(undefined as any);
    this.value = generate({ get: (dep: any) => this.addSub(dep) });
  }

  private registeredDeps = new Set<Stateful<any>>();

  private addSub<T>(dep: any) {
    if (!this.registeredDeps.has(dep)) {
      dep.subscribe(() => this.updateSelector());
      this.registeredDeps.add(dep);
    }
    return dep.snapshot();
  }

  //真实的selector依赖
  private updateSelector() {
    this.update(this.generate({ get: (dep: any) => this.addSub(dep) }));
  }
}

type SelectorGenerator<T> = (content: { get: <V>(dep: Stateful<T>) => V }) => T;
export function selector<V>(value: { key: string; get: SelectorGenerator<V> }) {
  return new Selector(value.get);
}

export function useRecoilState<T>(atom: Atom<T>) {
  const value = useRecoilValue(atom);
  //   return [
  //       value,
  //        () => atom.setState(value)
  //   ] as const;
  return tuplify(
    value,
    useCallback((value: T) => atom.setState(value), [atom])
  );
}
