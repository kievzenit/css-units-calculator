import { component$, QRL, Signal, } from "@builder.io/qwik";

import styles from "./custom-input.module.scss";

interface InputProps {
    value: Signal<string>;
    placeholder?: string;
    calculateResults$?: Array<QRL<(value: number) => number>>;
    setResults$?: Array<QRL<(result: number) => void>>;
}

export default component$<InputProps>((props) => {
    return <input class={styles.input} type="text" bind:value={props.value} placeholder={props.placeholder}
        onInput$={async (e) => {
            if (!props.calculateResults$ || !props.setResults$) {
                return;
            }

            props.calculateResults$.forEach(async (calculateResult, index) => {
                // @ts-ignore
                const result = await calculateResult(e.target!.value);

                const setResult = props.setResults$![index];

                await setResult(result);
            });
        }} />;
});
