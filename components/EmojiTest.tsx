import { useState } from 'react';
import { usePopper } from 'react-popper';

export default function EmojiTest() {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  return (
    <div style={{marginTop: "1000px", padding: "100px 0"}}>
      <button type="button" ref={setReferenceElement}>
        Reference element
      </button>

      <div id="tooltip" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        Popper element
        <div id="arrow" ref={setArrowElement} style={styles.arrow} />
      </div>
    </div>
  );
}