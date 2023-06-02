import { Signal, component$ } from "@builder.io/qwik";
import type { QRL } from "@builder.io/qwik";

import CustomInput from "../custom-input/custom-input";

import styles from "./text-with-input.module.scss";

interface TextWithInputProps {
    cssUnitName: string;
    value: Signal<string>;
    calculateResults$?: Array<QRL<(value: number) => number>>;
    setResults$?: Array<QRL<(result: number) => void>>;
}

export default component$<TextWithInputProps>((props) => {
    return (
        <div class={styles.container}>
            <p class={styles.text}>{props.cssUnitName}:</p>
            <CustomInput value={props.value} placeholder={props.cssUnitName}
                calculateResults$={props.calculateResults$} setResults$={props.setResults$} />
        </div>
    );
})
