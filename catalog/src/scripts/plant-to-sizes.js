import fs from 'node:fs';
import { catalog } from '../catalog/plants.js';

let count = 0;

// data needs to transformed to a js file that exports an array of objects (ts does not work)
const transformedContent = catalog
  .map((plant) =>
    plant.sizes.map((size) => {
      count++;
      return {
        ...size,
        catalogId: plant.id,
        id: count,
      };
    }),
  )
  .flat();

const transformedContentString = JSON.stringify(transformedContent, null, 2);

fs.writeFileSync(
  'src/catalog/plant-to-sizes-result.json',
  transformedContentString,
  'utf8',
);

console.log(
  'Transformed data has been saved to catalog/src/catalog/transformed-plant-to-sizes.js',
);
