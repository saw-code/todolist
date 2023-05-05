import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import styles from "./Todolist.module.css";
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";


type AddItemFormPropsType = {
  callBack: (newTitle: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType) => {
  const [error, setError] = useState<string | null>("")
  const [newTitle, setNewTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setError("")
    setNewTitle(e.currentTarget.value)
  }

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      addTaskHandler()
    }
  }

  const addTaskHandler = () => {
    if (newTitle.trim() !== "") {
      props.callBack(newTitle.trim())
      setNewTitle("")
    } else {
      setError("Title is required")
    }
  }

  const buttonStyle =
    {
      maxWidth: '39px',
      maxHeight: '39px',
      minWidth: '39px',
      minHeight: '39px',
      backgroundColor: "green"
    }

  return (
    <div>
      <TextField id="outlined-basic"
                 label={error ? "Title is required" : "Text here"}
                 variant="outlined"
                 onKeyDown={onKeyDownHandler}
                 onChange={onChangeHandler}
                 value={newTitle}
                 size="small"
                 error={!!error}
      />
      <Button style={buttonStyle} onClick={addTaskHandler} size="small" variant="contained">+</Button>
    </div>
  );
};
