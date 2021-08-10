import React, { useState } from "react";
import EditIcon from '@material-ui/icons/Edit';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import CircleButton from '../../utils/CircleButton';
import IList from './IList';
import EditListName from './EditListName';

const useStyles = makeStyles((theme) => ({
  name: {
    width: `calc(250px - ${theme.spacing(6)}px)`,
    minHeight: '36px',
    lineHeight: '36px',
    background: theme.palette.secondary.main,
    position: 'relative',
    paddingLeft: theme.spacing(1),
    marginBottom: theme.spacing(1),
    paddingRight: theme.spacing(5),
  },
}))

interface IProps {
  list: IList,
}

const ListName: React.FC<IProps> = ({
  list,
}) => {
  const classes = useStyles();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const hundleEdit = (): void => {
    setIsEdit(true);
  }

  return (
    <>
      {
        isEdit ? (
          <EditListName 
            list={list}
            setIsEdit={setIsEdit}
          />
        ) : (
          <Paper 
            className={classes.name}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            {list.name}
            {
              isHover && (
                <CircleButton
                  onClick={hundleEdit}
                  Child={EditIcon}
                />
              )
            }
          </Paper>
        )
      }
    </>
  )
}

export default ListName;
