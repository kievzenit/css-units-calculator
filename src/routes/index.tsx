import { $, component$, useSignal, useStylesScoped$, } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';

import CustomInput from '~/components/custom-input/custom-input';
import BigText from '~/components/big-text/big-text';
import TextWithInput from '~/components/text-with-input/text-with-input';

import styles from "~/styles/routes/index.scss?inline";

export default component$(() => {
  useStylesScoped$(styles);

  const deviceWidth = useSignal("1920");
  const deviceHeight = useSignal("1080");

  const vh = useSignal("0");
  const vw = useSignal("0");
  const vhVwPx = useSignal("0");

  const baseFontSize = useSignal("40");
  const currentFontSize = useSignal("20");

  const rem = useSignal("1");
  const em = useSignal("2");
  const fontSizePx = useSignal("40");

  const setDeviceWidth = $((width: number): void => { deviceWidth.value = String(width) });
  const setDeviceHeight = $((height: number): void => { deviceHeight.value = String(height) });

  const setBaseFontSize = $((fontSize: number): void => { baseFontSize.value = String(fontSize) });
  const setCurrentFontSize = $((fontSize: number): void => { currentFontSize.value = String(fontSize) });

  const setVh = $((vhValue: number): void => { vh.value = String(vhValue) });
  const setVw = $((vwValue: number): void => { vw.value = String(vwValue) });
  const setVhVwPx = $((pxValue: number): void => { vhVwPx.value = String(pxValue) });

  const setRem = $((remValue: number): void => { rem.value = String(remValue) });
  const setEm = $((emValue: number): void => { em.value = String(emValue) });
  const setFontSizePx = $((pxValue: number): void => { fontSizePx.value = String(pxValue) });

  const fakeCalculate = $((input: number): number => input);

  const calculateVhBasedOnPx = $((px: number): number => {
    return Math.round((px / Number(deviceHeight.value) * 100) * 10) / 10;
  });

  const calculateVhBasedOnVw = $((vw: number): number => {
    return Math.round(((Number(deviceWidth.value) / 100 * vw) / Number(deviceHeight.value) * 100) * 10) / 10;
  });

  const calculateVwBasedOnPx = $((px: number): number => {
    return Math.round((px / Number(deviceWidth.value) * 100) * 10) / 10;
  });

  const calculateVwBasedOnVh = $((vh: number): number => {
    return Math.round(((Number(deviceHeight.value) / 100 * vh) / Number(deviceWidth.value) * 100) * 10) / 10;
  });

  const calculatePxBasedOnVh = $((vh: number): number => {
    return Math.round((Number(deviceHeight.value) / 100 * vh) * 10) / 10;
  });

  const calculatePxBasedOnVw = $((vw: number): number => {
    return Math.round((Number(deviceWidth.value) / 100 * vw) * 10) / 10;
  });

  const calculateRemBasedOnPx = $((px: number): number => {
    return Math.round((px / Number(baseFontSize.value)) * 100) / 100;
  });

  const calculateRemBasedOnEm = $((em: number): number => {
    return Math.round((em * Number(currentFontSize.value) / Number(baseFontSize.value)) * 100) / 100;
  });

  const calculateEmBasedOnPx = $((px: number): number => {
    return Math.round((px / Number(currentFontSize.value)) * 100) / 100;
  });

  const calculateEmBasedOnRem = $((rem: number): number => {
    return Math.round((rem * Number(baseFontSize.value) / Number(currentFontSize.value)) * 100) / 100;
  });

  const calculatePxBasedOnRem = $((rem: number): number => {
    return Math.round((rem * Number(baseFontSize.value)) * 100) / 100;
  });

  const calculatePxBasedOnEm = $((em: number): number => {
    return Math.round((em * Number(currentFontSize.value)) * 100) / 100;
  });

  return (
    <div class="background">
      <main class="main">
        <div class="wrapper">
          <div class="top-wrapper">
            <BigText text={`Current screen resolution ${deviceWidth.value}x${deviceHeight.value}`} />
            <div class="top-inputs-container">
              <CustomInput value={deviceWidth} placeholder="Width"
                calculateResults$={[fakeCalculate]}
                setResults$={[setDeviceWidth]} />
              <CustomInput value={deviceHeight} placeholder="Height"
                calculateResults$={[fakeCalculate]}
                setResults$={[setDeviceHeight]} />
            </div>
          </div>

          <div class="bottom-inputs-container">
            <TextWithInput cssUnitName="vh" value={vh}
              calculateResults$={[calculatePxBasedOnVh, calculateVwBasedOnVh]}
              setResults$={[setVhVwPx, setVw]} />
            <TextWithInput cssUnitName="vw" value={vw}
              calculateResults$={[calculatePxBasedOnVw, calculateVhBasedOnVw]}
              setResults$={[setVhVwPx, setVh]} />
            <TextWithInput cssUnitName="px" value={vhVwPx}
              calculateResults$={[calculateVhBasedOnPx, calculateVwBasedOnPx]}
              setResults$={[setVh, setVw]} />
          </div>
        </div>

        <div class="wrapper">
          <div class="top-wrapper">
            <BigText text={`Current font-size base: ${baseFontSize.value}px`} />
            <div class="top-inputs-container">
              <CustomInput value={baseFontSize} placeholder="base font-size"
                calculateResults$={[fakeCalculate]}
                setResults$={[setBaseFontSize]} />
              <CustomInput value={currentFontSize} placeholder="font-size"
                calculateResults$={[fakeCalculate]}
                setResults$={[setCurrentFontSize]} />
            </div>
          </div>

          <div class="bottom-inputs-container">
            <TextWithInput cssUnitName="rem" value={rem}
              calculateResults$={[calculateEmBasedOnRem, calculatePxBasedOnRem]}
              setResults$={[setEm, setFontSizePx]} />
            <TextWithInput cssUnitName="em" value={em}
              calculateResults$={[calculateRemBasedOnEm, calculatePxBasedOnEm]}
              setResults$={[setRem, setFontSizePx]} />
            <TextWithInput cssUnitName="px" value={fontSizePx}
              calculateResults$={[calculateRemBasedOnPx, calculateEmBasedOnPx]}
              setResults$={[setRem, setEm]} />
          </div>
        </div>
      </main>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'CSS Units Calc'
};
