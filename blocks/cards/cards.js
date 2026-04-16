import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // --- Universal Editor instrumentation ---
  block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/cards');
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-label', 'Cards');

  // Instrument individual fields
  const title = block.querySelector('h1, h2, h3, h4, h5, h6');
  if (title) {
    title.setAttribute('data-aue-prop', 'title');
    title.setAttribute('data-aue-type', 'text');
    title.setAttribute('data-aue-label', 'Card Title');
  }
  const desc = block.querySelector('p');
  if (desc) {
    desc.setAttribute('data-aue-prop', 'description');
    desc.setAttribute('data-aue-type', 'text');
    desc.setAttribute('data-aue-label', 'Card Text');
  }

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}