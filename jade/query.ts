function parse(url: string): object {
  const results = url.match(/\?(?<query>.*)/);

  if (!results) {
    return {};
  }

  const { groups: { query } } = results;
  const pairs = query.match(/(?<param>\w+)=(?<value>\w+)/g);
  return pairs.reduce((acc, curr) => {
    const [key, value] = curr.split(("="));
    acc[key] = value;
    return acc;
  }, {});
}

export default parse;
