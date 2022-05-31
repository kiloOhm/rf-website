import { groupBy } from 'lodash';
const numRegex = /(?<num>((\d)+\.)+) .*/;

export function parseList(lines: string[] | undefined, depth: number | undefined = 0) {
  if(lines?.length == 0) return undefined;
  if(depth >= 4) return undefined;
  const grouped = groupBy(lines, (l) => {
    return numPart(l)?.slice(0, depth + 1).join('.');
  });
  return Object.keys(grouped).map((k) => ({
    key: grouped[k][0].split(' ')?.[0],
    label: grouped[k][0].split(' ')?.[0],
    text: grouped[k][0],
    children: parseList(Object.values(grouped[k]).slice(1)?.filter((l) => l.startsWith(`${k}.`)), depth + 1)
  }));
}

function numPart(input: string) {
  return numRegex.exec(input)?.groups?.['num'].split('.').filter((n) => n);
}