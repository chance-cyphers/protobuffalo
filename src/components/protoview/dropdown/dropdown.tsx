import React from 'react';
import {connect} from "react-redux";
import {InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 120,
  }
}));

const Dropdown = (props: any) => {

  const classes = useStyles();

  return (
      <FormControl>
        <InputLabel id={`${props.label}-label`} variant="outlined">{props.label}</InputLabel>
        <Select
            className={classes.root}
            labelId={`${props.label}-label`}
            variant="outlined"
            value={props.value}
            onChange={props.onChange}
            label={props.label}
        >
          { props.itemValues ?
            props.itemValues.map((item: string) => {
              return (
                  <MenuItem value={item} key={item}>{item}</MenuItem>
              )
            })
              : null
          }
        </Select>
      </FormControl>
  );
};


export default connect(null, null)(Dropdown);