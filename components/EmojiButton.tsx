import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dynamic from 'next/dynamic';
import { RefObject, useEffect, useState } from 'react';
import { faFaceSmile as farFaceSmile } from "@fortawesome/free-regular-svg-icons";
import { EmojiStyle, EmojiClickData } from 'emoji-picker-react';

const EmojiPicker = dynamic(
  () => {
    return import('emoji-picker-react');
  },
  { ssr: false }
);

export default function EmojiButton({input, string, setEmojiInString } : {input: RefObject<HTMLTextAreaElement>, string: string, setEmojiInString: Function}) {
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    if(input.current) {
      input.current.selectionEnd = cursorPosition;
    }
  }, [cursorPosition, input])

  const onEmojiClicked = (emojiData: EmojiClickData, event: MouseEvent) => {
    const thaInput = input.current;
    thaInput?.focus();
    const start = string.substring(0, thaInput?.selectionStart);
    const end = string.substring(Number(thaInput?.selectionStart));
    const finalPost = start + emojiData.emoji + end;
    setEmojiInString(finalPost);
    setCursorPosition(start.length + emojiData.emoji.length)
  }

  return (<>
    <button onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)} className='btn btn-secondary'><FontAwesomeIcon icon={farFaceSmile} /></button>
    {isEmojiPickerOpen && <EmojiPicker onEmojiClick={onEmojiClicked} emojiStyle={ EmojiStyle.NATIVE }/>}
  </>)
}