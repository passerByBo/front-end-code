import { useCallback, useEffect, useState } from "react";

interface Disconnect {
    disconnect: () => void
}
export class Stateful<T>{
    //设置监听器
    private listeners = new Set<(vale: T) => void>();

    constructor(protected value: T) {

    }

    snapshot(): T {
        return this.value;
    }

    private emit() {
        for (const listener of Array.from(this.listeners)) {
            listener(this.snapshot());
        }
    }

    protected update(value: T) {
        if (this.value !== value) {
            this.value = value;
            this.emit();
        }
    }

    subscribe(callback: (value: T) => void): Disconnect {
        this.listeners.add(callback);
        return {
            disconnect: () => {
                this.listeners.delete(callback);
            }
        }
    }
}
class Atom<T> extends Stateful<T> {
    public setState(value: T) {
        super.update(value)
    }
}
export function atom<V>(value: { key: string; default: V }) {
    return new Atom(value.default)
}

type SelectorGenerator<T> = (context: { get: <V>(dep: Stateful<T>) => V }) => T

export class Selector<T> extends Stateful<T> {
    constructor(private readonly generate: SelectorGenerator<T>) {
        super(undefined as any);
        this.value = generate({ get: (dep:any) => this.addSub(dep) });
    }

    private registeredDeps = new Set<Stateful<any>>()

    private addSub<T>(dep:any) {
        if (!this.registeredDeps.has(dep)) {
            dep.subscribe(() => this.updateSelector())
            this.registeredDeps.add(dep)
        }
        return dep.snapshot();
    }

    //真实的selector依赖
    private updateSelector() {
        this.update(this.generate({ get: (dep:any) => this.addSub(dep) }))
    }
}

export function selector<V>(value: { key: string, get: SelectorGenerator<V> }): Selector<V> {
    return new Selector(value.get);
}


//得到Atom或者Selector的值
export function useRecoilValue<T>(value: Stateful<T>) {
    const [, updateState] = useState({});
    useEffect(() => {
        const { disconnect } = value.subscribe(() => updateState({}));
        return () => disconnect();
    }, [value])
    return value.snapshot();
}

//设置Atom的值
export function useRecoilState<T>(atom: Atom<T>): [T, (value: T) => void] {
    const value = useRecoilValue(atom);
    return [
        value,
        useCallback((value) => atom.setState(value), [atom])
    ]
}
