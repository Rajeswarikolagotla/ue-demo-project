export default function decorate(block) {
  // Identify the block as a whole
  block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero');
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-label', 'Hero');

  // Identify the specific title field inside the block
  const title = block.querySelector('h1, h2');
  if (title) {
    title.setAttribute('data-aue-prop', 'text'); // Matches 'text' in your component-models.json
    title.setAttribute('data-aue-type', 'richtext');
    title.setAttribute('data-aue-label', 'Hero Text');
  }
}