import { marked } from 'marked';

export async function markdown(input: string) {
  return new Promise((resolve, reject) => {
    marked(input, {}, (err, result) => {
      if(err) return reject(err);
      resolve(result);
    })
  })
}