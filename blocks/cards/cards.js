import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // --- STEP 11: Instrument the Container Block ---
  // Matches the 'cards' ID in component-definition.json
  block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/cards');
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-label', 'Cards');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    
    // --- STEP 11: Instrument Each Individual Card Item ---
    // Matches the 'card' ID in component-models.json
    li.setAttribute('data-aue-type', 'component');
    li.setAttribute('data-aue-model', 'card');
    li.setAttribute('data-aue-label', 'Card Item');

    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
        
        // --- STEP 11: Instrument Image Field ---
        const img = div.querySelector('img');
        if (img) {
          img.setAttribute('data-aue-prop', 'image'); // Matches 'image' in component-models.json
          img.setAttribute('data-aue-type', 'reference');
          img.setAttribute('data-aue-label', 'Card Image');
        }
      } else {
        div.className = 'cards-card-body';
        
        // --- STEP 11: Instrument Text Field ---
        div.setAttribute('data-aue-prop', 'text'); // Matches 'text' in component-models.json
        div.setAttribute('data-aue-type', 'richtext');
        div.setAttribute('data-aue-label', 'Card Text');
      }
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