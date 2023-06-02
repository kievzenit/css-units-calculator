import { component$ } from "@builder.io/qwik";

import styles from "./big-text.module.scss";

interface BigTextProps {
    text: string;
}

export default component$<BigTextProps>((props) => {
    return (
        <p class={styles.text}>{props.text}</p>
    );
});
