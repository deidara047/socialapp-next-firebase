import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { RefObject, useEffect, useState } from 'react';
import { faFaceSmile as farFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { EmojiStyle, EmojiClickData } from 'emoji-picker-react';
import { usePopper } from 'react-popper';
import EmojiPicker from 'emoji-picker-react';
/* 
const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);
 */
export default function EmojiButton({input, string, setEmojiInString } : {input: RefObject<HTMLTextAreaElement>, string: string, setEmojiInString: Function}) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null)
  const [arrowElement, setArrowElement] = useState(null);
  const [prueba, setPrueba] = useState("");
  const popperInstance = usePopper(referenceElement, popperElement, {
    modifiers: [
      { 
        name: 'arrow', options: { element: arrowElement }
      },
      {
        name: "offset",
        options: {
          offset: [0,8]
        }
      }],
  });

  const { styles, attributes } = popperInstance;

  useEffect(() => {
    if(input.current) {
      input.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, input])

  const onEmojiClicked = (emojiData: EmojiClickData, event: MouseEvent) => {
    const thaInput = input.current;
    const start = string.substring(0, thaInput?.selectionStart);
    const end = string.substring(Number(thaInput?.selectionStart));
    const finalPost = start + emojiData.emoji + end;
    setEmojiInString(finalPost);
    setCursorPosition(start.length + emojiData.emoji.length)
    thaInput?.focus();
  }

  return (<>
    <button type='button' ref={setReferenceElement} onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className='btn btn-secondary'><FontAwesomeIcon icon={farFaceSmile} /></button>
    {prueba}
    {isEmojiPickerOpen && <div id="tooltip" ref={setPopperElement} style={styles.popper} {...attributes.popper}>
        <EmojiPicker onEmojiClick={onEmojiClicked} emojiStyle={ EmojiStyle.NATIVE }/>
      <div id="arrow" ref={setArrowElement} style={styles.arrow} />
    </div>}
  </>)
}