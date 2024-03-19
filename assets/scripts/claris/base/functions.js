const deb = function () { /* This function is empty and will be stripped by ESBuild */  }
// NOTE: Uncomment this to enable debug output const deb = console.log;
export { deb };

export function isObj(obj) {
  return !!(obj && typeof obj === "object" && obj !== null);
}

export function createEl(element) {
  return document.createElement(element);
}

export function elem(selector, parent) {
  parent = parent || document;
  let elem = parent.querySelector(selector);
  return elem != false ? elem : false;
}

export function elems(selector, parent) {
  parent = parent || document;
  let elems = parent.querySelectorAll(selector);
  return elems.length ? elems : false;
}

export function pushClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) || elClass.add(targetClass);
  }
}

export function hasClasses(el) {
  if (isObj(el)) {
    const classes = el.classList;
    return classes.length;
  }
}

export function deleteClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass) && elClass.remove(targetClass);
  }
}

export function modifyClass(el, targetClass) {
  if (isObj(el) && targetClass) {
    let elClass = el.classList;
    elClass.contains(targetClass)
      ? elClass.remove(targetClass)
      : elClass.add(targetClass);
  }
}

export function containsClass(el, targetClass) {
  if (isObj(el) && targetClass && el !== document) {
    return el.classList.contains(targetClass);
  }
}

export function elemAttribute(elem, attr, value) {
  value = value || null;
  if (value) {
    elem.setAttribute(attr, value);
  } else {
    value = elem.getAttribute(attr);
    return value || false;
  }
}

export function wrapEl(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  wrapper.appendChild(el);
}

export function deleteChars(str, subs) {
  let newStr = str;
  if (Array.isArray(subs)) {
    for (const element of subs) {
      newStr = newStr.replace(element, "");
    }
  } else {
    newStr = newStr.replace(subs, "");
  }
  return newStr;
}

export function copyToClipboard(str) {
  let copy, selection, selected;
  copy = createEl("textarea");
  copy.value = str;
  copy.setAttribute("readonly", "");
  copy.style.position = "absolute";
  copy.style.left = "-9999px";
  selection = document.getSelection();
  document.documentElement.appendChild(copy);
  // check if there is any selected content
  selected = selection.rangeCount > 0 ? selection.getRangeAt(0) : false;
  copy.select();
  document.execCommand("copy");
  document.documentElement.removeChild(copy);
  if (selected) {
    // if a selection existed before copying
    selection.removeAllRanges(); // unselect existing selection
    selection.addRange(selected); // restore the original selection
  }
}

export function parseBoolean(string) {
  let bool;
  string = string.trim().toLowerCase();
  switch (string) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      return undefined;
  }
}
