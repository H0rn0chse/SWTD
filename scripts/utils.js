const { feather } = globalThis;

const dummy = document.createElement("div");
export function replaceSvgWithIcon (domRef, name, options = {}) {
    if (!domRef) {
        console.error("domRef was undefined!");
        return;
    }
    const svgContent = feather.icons[name].toSvg(options);
    dummy.innerHTML = svgContent;
    const svgNode = dummy.childNodes[0];
    dummy.innerHTML = "";
    domRef.replaceWith(svgNode);
    return svgNode;
}

export function getColor (sKey) {
    return window.getComputedStyle(document.documentElement).getPropertyValue(sKey);
}
