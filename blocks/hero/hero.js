export default function decorate(block) {
  // Universal Editor instrumentation [cite: 431]
  // Matches the ID in component-definition.json [cite: 390]
  block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero');
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-label', 'Hero');

  // Instrument the Title field [cite: 433]
  const title = block.querySelector('h1, h2');
  if (title) {
    title.setAttribute('data-aue-prop', 'title'); // Changed from 'text' to 'title' 
    title.setAttribute('data-aue-type', 'text');
    title.setAttribute('data-aue-label', 'Hero Title');
  }

  // Instrument the Description field 
  const description = block.querySelector('p');
  if (description) {
    description.setAttribute('data-aue-prop', 'description'); // Matches 'description' in models 
    description.setAttribute('data-aue-type', 'text');
    description.setAttribute('data-aue-label', 'Hero Description');
  }
}