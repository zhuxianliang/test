import {LCUtils} from '@q/lc-common';

import {Ref, ref, watch} from 'vue';
import * as d3 from 'd3-color';

export const useColor = <T extends {[key: string]: string}>(
  colors: T,
  isRisk?: boolean
) => {
  const {getColor} = LCUtils.useColor(colors);
  if (isRisk) {
    return [
      getColor('l1'),
      getColor('l2'),
      getColor('l3'),
      getColor('l4'),
      getColor('l5'),
    ];
  }

  return [
    getColor('m1'),
    getColor('m2'),
    getColor('m3'),
    getColor('m4'),
    getColor('m5'),
    getColor('m6'),
    getColor('m7'),
    getColor('m8'),
  ];
};

export const getColorFromIndex = (colorList: string[], index: number) => {
  return colorList[index % colorList.length || 0];
};

const svgCache = new Map<string, string>();

export const useSvg = (svgPath: Ref<string | undefined>) => {
  let topSvg = '';
  const loaded = ref(false);

  watch(svgPath, async () => {
    if (svgPath.value) {
      topSvg = await fetch(svgPath.value).then((res) => res.text());
      loaded.value = true;
    }
  });

  const getSvg = (fromColor: string, toColor: string) => {
    if (!svgPath.value) return '';

    if (svgCache.has(`${svgPath}-${fromColor}-${toColor}`)) {
      return svgCache.get(`${svgPath}-${fromColor}-${toColor}`);
    }

    const newSvg = topSvg.replace(new RegExp(fromColor, 'g'), toColor);
    const blob = new Blob([newSvg], {type: 'image/svg+xml'});
    const url = URL.createObjectURL(blob);
    svgCache.set(`${svgPath}-${fromColor}-${toColor}`, url);

    return url;
  };

  const clearSvg = () => {
    svgCache.forEach((url) => URL.revokeObjectURL(url));
    svgCache.clear();
  };

  return {getSvg, loaded, clearSvg};
};

export const replaceSvgColor = (
  svgPath: Ref<string | null | undefined>,
  fromColor: string,
  toColor?: string
) => {
  return new Promise<string>((resolve) => {
    watch(
      svgPath,
      async () => {
        if (svgPath.value) {
          if (toColor) {
            const svgText = await fetch(svgPath.value).then((res) =>
              res.text()
            );
            const newSvg = svgText.replace(new RegExp(fromColor, 'g'), toColor);
            const blob = new Blob([newSvg], {type: 'image/svg+xml'});
            const url = URL.createObjectURL(blob);

            resolve(url);
          } else {
            resolve(svgPath.value);
          }
        }
      },
      {immediate: true}
    );
  });
};

export const setOpacity = (color?: string, opacity?: number) => {
  if (!color) return '';
  if (typeof opacity !== 'number') return color;
  const c = d3.color(color);
  if (c) {
    c.opacity = opacity;
    return c.toString();
  }
  return color;
};
