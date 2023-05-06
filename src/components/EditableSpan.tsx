import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
  oldTitle: string
  callBack: (updatedTitle: string) => void
}

export const EditableSpan = (props: EditableSpanPropsType) => {
  const [edit, setEdit] = useState(false)
  const [updateTitle, setUpdateTitle] = useState(props.oldTitle)

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUpdateTitle(event.currentTarget.value)
  }

  const onDoubleClickHandler = () => {
    setEdit(!edit)

    if (edit) {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    props.callBack(updateTitle)
  }

  return (
    edit
      ? <input
        onChange={onChangeHandler}
        type="text" value={updateTitle}
        onBlur={onDoubleClickHandler}
        autoFocus={true}

      />
      : <span onDoubleClick={onDoubleClickHandler}>{props.oldTitle}</span>
  );
};
