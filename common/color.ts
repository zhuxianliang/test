import {Ref, ref, watch} from 'vue';
import * as d3 from 'd3-color';
export const getColorFromIndex = (colorList: string[], index: number) => {
  return colorList[index % colorList.length || 0];
};
export const getColorKey = (
  i: number | string,
  length: number
) => {
  let key = length || 0;
  // let name = isTiskColor ? 'l' : 'm';
  const index = typeof i === 'string' ? parseInt(i) % key : i % key;
  // if (type == 1) {
  //   return (name += index + 1); // 'm1,m2'
  // }
  return index;
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
  svgPath: string,
  fromColor: string,
  toColor?: string
) => {
  return new Promise<string>( async(resolve) => {
    if (toColor) {
      const svgText = await fetch(svgPath).then((res) =>
        res.text()
      );
      const newSvg = svgText.replace(new RegExp(fromColor, 'g'), toColor);
      const blob = new Blob([newSvg], {type: 'image/svg+xml'});
      const url = URL.createObjectURL(blob);

      resolve(url);
    } else {
      resolve(svgPath);
    }
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
