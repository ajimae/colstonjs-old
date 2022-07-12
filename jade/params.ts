function parse(url: string): string {
  let i, j = 0;
  let str: string = "";
  for (i = 0; i < url.length; i++) {
    const c = url.charAt(i);
    if (c === ":") {
      // eat all characters
      let param = "";
      for (j = (i + 1); j < url.length; j++) {
        if (/\w/.test(url.charAt(j))) {
          param += url.charAt(j);
        } else {
          break;
        }
      }
      str += `(?<${param}>\\w+)`;
      i = j - 1;

    } else {
      str += c;
    }
  }

  /** 
   * TODO:
   * fix issue with route not matching exact value 
   * pops the "$" used to match end of pathname
  */
  if (str.indexOf("&") > -1)
    return str;
  return str + "$";
}

export default parse;
